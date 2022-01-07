import Notice from "../part/Notice";
import React, {useEffect, useState} from "react";
import LookupService from "../api/LookupService";

export default function Aircraft(props) {

	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || '')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [status, setStatus] = useState(props.status || '')
	const [messages, setMessages] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])

	function update() {
		console.log("Update aircraft")
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
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

	useEffect(() => {
		if (statusOptions.length === 0) loadAircraftStatusOptions()
		if (typeOptions.length === 0) loadAircraftTypeOptions()
	})

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<ProfileField id='name' text='Name' type='text' autoFocus='autofocus' value={name} onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown}/>

					<div>
						<label htmlFor='status' className='page-label'>Status</label>
						<select id='status' name='status' value={status} className='page-field' onChange={(event) => setStatus(event.target.value)}>
							{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
						</select>
					</div>

					<div>
						<label htmlFor='type' className='page-label'>Type</label>
						<select id='type' name='type' value={type} className='page-field' onChange={(event) => setType(event.target.value)}>
							{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
						</select>
					</div>

					<ProfileField id='make' text='Manufacturer or Designer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
					<ProfileField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={messages.length > 0} className='page-submit' onClick={update}>Update</button>
				</div>
			</div>
		</div>
	)

}

function ProfileField(props) {

	return (
		<div>
			<label htmlFor={props.id} className='page-label'>{props.text}</label>
			<input id={props.id} name={props.id} type={props.type} placeholder={props.text} autoCapitalize='none' autoCorrect='off' className='page-field' autoFocus={props.autoFocus} value={props.value} onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	);

}
