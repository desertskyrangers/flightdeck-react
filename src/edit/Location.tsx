import {useNavigate, useParams} from "react-router";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Icons from "../util/Icons";
import EntryField from "../part/EntryField";
import Notice from "../part/Notice";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import LocationService from "../api/LocationService";

export default function Location(props) {
	const navigate = useNavigate();

	//const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [latitude, setLatitude] = useState(props.latitude || 0.0)
	const [longitude, setLongitude] = useState(props.longitude || 0.0)
	const [altitude, setAltitude] = useState(props.altitude || 0.0)
	const [size, setSize] = useState(props.size || 100)
	const [status, setStatus] = useState(props.status || 'active')

	// Messages
	const [messages, setMessages] = useState([])

	// Actions
	const [requestDelete, setRequestDelete] = useState(false)

	// References
	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
	}

	const requestPositionUpdate = useCallback(() => {
		navigator.geolocation.getCurrentPosition(doUpdatePosition, doUpdatePositionError)
	},[])

	function doUpdatePosition(position) {
		setLatitude(position.coords.latitude)
		setLongitude(position.coords.longitude)
		setAltitude(position.coords.altitude)
	}

	function doUpdatePositionError(error) {
		setMessages([error.message])
	}

	const loadLocation = useCallback(() => {
		if (isNewRef.current) {
			requestPositionUpdate()
			return
		}
		LocationService.getLocation(idRef.current, (location) => {
			//setId(location.id)
			setName(location.name)
			setLatitude(location.latitude)
			setLongitude(location.longitude)
			setAltitude(location.altitude)
			setSize(location.size)
			setStatus(location.status)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}, [requestPositionUpdate])

	function update() {
		LocationService.updateLocation({
			id: idRef.current,
			name: name,
			latitude: latitude,
			longitude: longitude,
			altitude: altitude,
			size: size,
			status: status
		}, (location) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function doDelete() {
		LocationService.updateLocation({
			id: idRef.current,
			name: name,
			latitude: latitude,
			longitude: longitude,
			altitude: altitude,
			size: size,
			status: 'removed'
		}, (location) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadLocation(), [loadLocation])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='hbox'>
						<button className='icon' onClick={close}>{Icons.BACK}</button>
						<span className='page-header'>{name}</span>
					</div>

					<EntryField id='name' text='Name' type='text' value={name} required={true} autoFocus='autofocus' onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='latitude' text='Latitude' type='text' value={latitude} onChange={(event) => setLatitude(event.target.value)} onKeyDown={onKeyDown} fieldActionIcon={Icons.LOCATION}
											onFieldAction={requestPositionUpdate}/>
					<EntryField id='longitude' text='Latitude' type='text' value={longitude} onChange={(event) => setLongitude(event.target.value)} onKeyDown={onKeyDown}
											fieldActionIcon={Icons.LOCATION} onFieldAction={requestPositionUpdate}/>
					<EntryField id='altitude' text='Altitude' type='text' value={altitude} onChange={(event) => setAltitude(event.target.value)} onKeyDown={onKeyDown}
											fieldActionIcon={Icons.LOCATION} onFieldAction={requestPositionUpdate}/>
					<EntryField id='size' text='Size (m)' type='number' value={size} required={true} onChange={(event) => setSize(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNewRef.current ? null : <button className='icon' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='name of the location' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

				</div>
			</div>
		</div>
	)

}
