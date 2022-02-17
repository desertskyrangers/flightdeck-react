import "../css/metrics.css"
import Notice from "../part/Notice";
import React, {useEffect, useRef, useState} from "react";
import LookupService from "../api/LookupService";
import {useNavigate, useParams} from "react-router-dom";
import AircraftService from "../api/AircraftService";
import Icons from "../util/Icons";
import EntryField from "../part/EntryField";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import EntrySelect from "../part/EntrySelect";

export default function Aircraft(props) {
	const navigate = useNavigate();

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || 'fixedwing')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [status, setStatus] = useState(props.status || 'airworthy')

	const [advanced, setAdvanced] = useState(props.advanced || false)

	const [wingspan, setWingspan] = useState(props.wingspan || '')
	const [length, setLength] = useState(props.length || '')
	const [wingarea, setWingarea] = useState(props.wingarea || '')
	const [weight, setWeight] = useState(props.weight || '')

	// Derived
	const [wingAspect, setWingAspect] = useState(props.wingAspect || '')
	const [wingMac, setWingMac] = useState(props.wingMac || '');
	const [wingLoading, setWingLoading] = useState(props.wingLoading || '');

	// Messages
	const [messages, setMessages] = useState([])

	// Options
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')

	function update() {
		AircraftService.updateAircraft({
			id: idRef.current,
			name: name,
			type: type,
			make: make,
			model: model,
			status: status,

			wingspan: wingspan,
			length: length,
			wingarea: wingarea,
			weight: weight
		}, (success) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
	}

	function toggleAdvanced() {
		setAdvanced(!advanced)
	}

	function loadAircraft() {
		if (isNewRef.current) return
		AircraftService.getAircraft(idRef.current, (result) => {
			setId(result.aircraft.id)
			setName(result.aircraft.name)
			setType(result.aircraft.type)
			setMake(result.aircraft.make || '')
			setModel(result.aircraft.model || '')
			setStatus(result.aircraft.status)
			setWingspan(result.aircraft.wingspan)
			setLength(result.aircraft.length)
			setWingarea(result.aircraft.wingarea)
			setWeight(result.aircraft.weight)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftStatusOptions() {
		LookupService.getAircraftStatuses((success) => {
			setStatusOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftTypeOptions() {
		LookupService.getAircraftTypes((success) => {
			setTypeOptions(success)
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
		AircraftService.deleteAircraft(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => setWingAspect(calcAspectRatio(wingspan, wingarea)), [wingspan, wingarea])
	useEffect(() => setWingMac(calcMeanAirfoilChord(wingspan, wingarea)), [wingspan, wingarea])
	useEffect(() => setWingLoading(calcWingLoading(weight, wingarea)), [weight, wingarea])

	useEffect(() => loadAircraftStatusOptions(), [])
	useEffect(() => loadAircraftTypeOptions(), [])
	useEffect(() => loadAircraft(), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='page-label-row'><span>{name}</span><span className='icon right' onClick={close}>{Icons.CLOSE}</span></div>

					{/* Aircraft information */}
					<div className='vbox'>
						<table className='metrics'>
							<tr>
								<td>Wing Span:</td>
								<td>{wingspan}</td>
								<td>mm</td>
							</tr>
							<tr>
								<td>Length:</td>
								<td>{length}</td>
								<td>mm</td>
							</tr>
							<tr>
								<td>Wing Area:</td>
								<td>{wingarea}</td>
								<td>cm²</td>
							</tr>
							<tr>
								<td>Weight:</td>
								<td>{weight}</td>
								<td>g</td>
							</tr>
							<tr>
								<td>Aspect Ratio:</td>
								<td>{parseFloat(wingAspect).toFixed(1)}</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>Wing Mac:</td>
								<td>{parseFloat(wingMac).toFixed(1)}</td>
								<td>mm</td>
							</tr>
							<tr>
								<td>Wing Loading:</td>
								<td>{parseFloat(wingLoading).toFixed(4)}</td>
								<td>g/cm²</td>
							</tr>
						</table>
					</div>

					<EntryField id='name' text='Name' type='text' value={name} required={true} autoFocus='autofocus' onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown}/>

					<EntrySelect id='type' name='type' text='Type' value={type} required={true} onChange={(event) => setType(event.target.value)}>
						{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntrySelect id='status' name='status' text='Status' value={status} required={true} onChange={(event) => setStatus(event.target.value)}>
						{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntryField id='make' text='Manufacturer or Designer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>

					<button className='icon centered' onClick={toggleAdvanced}>{advanced ? Icons.COLLAPSE : Icons.ADVANCED_V}</button>

					{
						advanced ? <div className='vbox'>
							<EntryField id='wingspan' text='Wing Span (mm)' type='text' value={wingspan} onChange={(event) => setWingspan(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='length' text='Length (mm)' type='text' value={length} onChange={(event) => setLength(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='wingarea' text='Wing Area (cm²)' type='text' value={wingarea} onChange={(event) => setWingarea(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='weight' text='Weight (g)' type='text' value={weight} onChange={(event) => setWeight(event.target.value)} onKeyDown={onKeyDown}/>
							{/* Advanced properties
							* motor radius (mm)
							* motor length (cm)
							* motor kv
							* motor max watts
							*/}
						</div> : null
					}

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNewRef.current ? null : <button className='icon' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='name of the aircraft' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

				</div>
			</div>
		</div>
	)

}

export function calcAspectRatio(wingspan, wingarea) {
	return (wingspan * wingspan) / (wingarea * 100)
}

export function calcMeanAirfoilChord(wingspan, wingarea) {
	return (wingarea * 100) / wingspan;
}

export function calcWingLoading(weight, wingarea) {
	return weight / wingarea
}

