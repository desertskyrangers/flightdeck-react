import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Notice from "../part/Notice";
import Config from "../AppConfig";
import {isEqual} from "lodash";
import UserService from "../api/UserService";
import LookupService from "../api/LookupService";
import EntryField from "../part/EntryField";
import Icons from "../util/Icons";
import {useNavigate} from "react-router";

export default function Profile(props) {

	const navigate = useNavigate()

	const [id, setId] = useState(props.id || '')
	const [username, setUsername] = useState(props.username || '')
	const [firstName, setFirstName] = useState(props.firstName || '')
	const [lastName, setLastName] = useState(props.lastName || '')
	const [preferredName, setPreferredName] = useState(props.preferredName || '')
	const [callSign, setCallSign] = useState(props.callSign || '')
	const [email, setEmail] = useState(props.email || '')
	const [emailVerified, setEmailVerified] = useState(props.emailVerified || '')
	const [smsNumber, setSmsNumber] = useState(props.smsNumber || '')
	const [smsCarrier, setSmsCarrier] = useState(props.smsCarrier || '')
	const [smsVerified, setSmsVerified] = useState(props.smsVerified || '')
	const [messages, setMessages] = useState(props.messages || '')
	const [smsCarriers, setSmsCarriers] = useState([])

	const oldFirstName = useRef()
	const oldLastName = useRef()
	const previousMessages = useRef(messages)

	function close() {
		navigate(-1)
	}

	function update() {
		UserService.update({
			id,
			username,
			firstName,
			lastName,
			preferredName,
			callSign,
			email,
			emailVerified,
			smsNumber,
			smsCarrier,
			smsVerified
		}, () => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function updateFirstName(event) {
		setFirstName(event.target.value)
		updatePreferredName(oldFirstName.current, oldLastName.current, event.target.value, lastName)
		oldFirstName.current = event.target.value
	}

	function updateLastName(event) {
		setLastName(event.target.value)
		updatePreferredName(oldFirstName.current, oldLastName.current, firstName, event.target.value)
		oldLastName.current = event.target.value
	}

	function updatePreferredName(oldFirstName, oldLastName, newFirstName, newLastName) {
		const oldPreferredName = oldFirstName + " " + oldLastName
		const newPreferredName = newFirstName + " " + newLastName
		if (preferredName === oldPreferredName) setPreferredName(newPreferredName)
	}

	function clearMessages() {
		setMessages([])
	}

	function loadProfileData() {
		LookupService.getSmsCarriers((result) => {
			setSmsCarriers(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})

		UserService.profile((result) => {
			setId(result.account.id)
			setUsername(result.account.username || '')
			setFirstName(result.account.firstName || '')
			setLastName(result.account.lastName || '')
			setPreferredName(result.account.preferredName || '')
			setCallSign(result.account.callSign || '')
			setEmail(result.account.email || '')
			setEmailVerified(result.account.emailVerified || false)
			setSmsNumber(result.account.smsNumber || '')
			setSmsCarrier(result.account.smsCarrier || '')
			setSmsVerified(result.account.smsVerified || '')
			setMessages(result.account.messages || [])

			oldFirstName.current = result.account.firstName
			oldLastName.current = result.account.lastName
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	useEffect(() => loadProfileData(), [])

	useLayoutEffect(() => {
		const usernameMissing = !username || username === ''
		const usernameTooLong = !!username && username.length >= 64
		const firstNameTooLong = !!firstName && firstName.length >= 64
		const lastNameTooLong = !!lastName && lastName.length >= 64
		const validEmail = !email || email.match(Config.EMAIL_PATTERN)
		const validSmsNumber = !smsNumber || smsNumber.match(Config.PHONE_PATTERN)

		let messages = [];
		if (usernameMissing) messages.push('Username required')
		if (usernameTooLong) messages.push('Username too long')
		if (firstNameTooLong) messages.push('First name too long')
		if (lastNameTooLong) messages.push('Last name too long')
		if (!validEmail) messages.push('Invalid email address')
		if (!validSmsNumber) messages.push('Invalid SMS number')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages
	}, [username, firstName, lastName, email, smsNumber])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<div className='hbox'><button className='icon' onClick={close}>{Icons.BACK}</button><span className='page-header'>User Profile</span></div>

					<EntryField id='username'
											text='Username'
											type='text'
											value={username}
											autoFocus='autofocus'
											onChange={(event) => setUsername(event.target.value)}
											onKeyDown={onKeyDown}
											labelActionIcon={Icons.CLOSE}
											onLabelAction={close}/>
					<EntryField id='firstName' text='First Name' type='text' value={firstName} onChange={updateFirstName} onKeyDown={onKeyDown}/>
					<EntryField id='lastName' text='Last Name' type='text' value={lastName} onChange={updateLastName} onKeyDown={onKeyDown}/>
					<EntryField id='preferredName' text='Preferred Name' type='text' value={preferredName} onChange={(event) => setPreferredName(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='callSign' text='Call Sign' type='text' value={callSign} onChange={(event) => setCallSign(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='email' text='Email' type='text' value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='smsNumber' text='SMS Number' type='text' value={smsNumber} onChange={(event) => setSmsNumber(event.target.value)} onKeyDown={onKeyDown}/>
					<div>
						<label htmlFor='smsCarrier' className='page-label'>SMS Carrier</label>
						<select id='smsCarrier' name='smsCarrier' value={smsCarrier} className='page-field' onChange={(event) => setSmsCarrier(event.target.value)}>
							{smsCarriers.map((carrier) => <option key={carrier.id} value={carrier.id}>{carrier.name}</option>)}
						</select>
					</div>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={messages.length > 0} className='page-submit' onClick={update}>Update</button>
				</div>
			</div>
		</div>
	)

}
