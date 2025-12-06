import React, {useLayoutEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import EntryField from "./part/EntryField";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {isEqual} from "lodash";
import AppConfig from "./AppConfig";
import AuthService from "./api/AuthService";
import AppPath from "./AppPath";

export default function Reset(props) {

	const navigate = useNavigate()
	const query = useQuery();

	const [password, setPassword] = useState('')
	const [verifyPassword, setVerifyPassword] = useState('')
	const [messages, setMessages] = useState([])
	const [canSubmit, setcanSubmit] = useState(false)

	const previousMessages = useRef(messages)

	function close() {
		navigate(-1)
	}

	function clearMessages() {
		setMessages([])
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') submit();
	}

	function useQuery() {
		const {search} = useLocation();
		return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	function submit() {
		console.log("Submit reset request")
		AuthService.reset(query.get('id'), password, (response) => {
			navigate(AppPath.HOME)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	useLayoutEffect(() => {
		const validPassword = !!password || password === ''
		const passwordTooShort = !!password && password.length < AppConfig.PASSWORD_LENGTH_MIN;
		const passwordTooLong = !!password && password.length >= AppConfig.PASSWORD_LENGTH_MAX;
		const passwordsMatch = password === verifyPassword

		let messages = [];
		if (!validPassword) messages.push('Password required')
		if (passwordTooShort) messages.push('Password too short')
		if (passwordTooLong) messages.push('Password too long')
		if (!passwordsMatch) messages.push('Passwords do not match')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages

		const canSubmitPassword = !!password && password !== '' && !passwordTooShort && !passwordTooLong && passwordsMatch
		setcanSubmit(canSubmitPassword)
	}, [password, verifyPassword])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntryField id='password'
											text='Password'
											type='password'
											value={password}
											onChange={(event) => setPassword(event.target.value)}
											onKeyDown={onKeyDown}
											labelActionIcon={Icons.CLOSE}
											onLabelAction={close}/>
					<EntryField id='verify-password' text='Verify Password' type='password' value={verifyPassword} onChange={(event) => setVerifyPassword(event.target.value)} onKeyDown={onKeyDown}/>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={!canSubmit || messages.length > 0} className='page-submit' onClick={submit}>Reset Password</button>
				</div>
			</div>
		</div>
	)

}
