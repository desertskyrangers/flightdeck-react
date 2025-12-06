import React, {useLayoutEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import AppConfig from "../AppConfig";
import EntryField from "../part/EntryField";
import Icons from "../util/Icons";
import Notice from "../part/Notice";
import TokenService from "../api/TokenService";
import UserService from "../api/UserService";
import {isEqual} from "lodash";

export default function Password(props) {
	const navigate = useNavigate();

	const [id] = useState(TokenService.getUserId() || '')
	const [currentPassword, setCurrentPassword] = useState(props.currentPassword || '')
	const [password, setPassword] = useState(props.password || '');
	const [verifyPassword, setVerifyPassword] = useState(props.verifyPassword || '');
	const [messages, setMessages] = useState([])

	// Actions
	const [canSubmit, setCanSubmit] = useState(false)

	// References
	const previousMessages = useRef(messages)

	function update() {
		UserService.updatePassword(id, currentPassword, password, (success) => {
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

	useLayoutEffect(() => {
		const validPassword = !!password || password === ''
		const passwordTooShort = !!password && password.length < AppConfig.PASSWORD_LENGTH_MIN;
		const passwordTooLong = !!password && password.length >= AppConfig.PASSWORD_LENGTH_MAX;
		const passwordsMatch = password === verifyPassword

		let messages = [];
		if (!validPassword) messages.push('Invalid password')
		if (passwordTooShort) messages.push('Password too short')
		if (passwordTooLong) messages.push('Password too long')
		if (!passwordsMatch) messages.push('Passwords do not match')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages

		const canSubmit = !!password && password !== '' && !passwordTooShort && !passwordTooLong && passwordsMatch

		setCanSubmit(canSubmit)
	}, [password, verifyPassword])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<div className='hbox'><button className='icon' onClick={close}>{Icons.BACK}</button><span className='page-header'>Change Password</span></div>

					<EntryField id='current-password'
											text='Current Password'
											type='password'
											value={currentPassword}
											onChange={(event) => setCurrentPassword(event.target.value)}
											onKeyDown={onKeyDown}
											labelActionIcon={Icons.CLOSE}
											onLabelAction={close}/>
					<EntryField id='password' text='New Password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='verify-password' text='Verify Password' type='password' value={verifyPassword} onChange={(event) => setVerifyPassword(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={!canSubmit} className='page-submit' onClick={update}>Update</button>
				</div>
			</div>
		</div>
	)

}
