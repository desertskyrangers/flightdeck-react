import React, {useEffect, useRef, useState} from "react";
import Notice from "./part/Notice";
import AuthService from "./api/AuthService";
import {useNavigate, useParams} from "react-router";
import AppPath from "./AppPath";

export default function Verify(props) {
	const navigate = useNavigate();

	const [id] = useState(useParams().id)
	const [code, setCode] = useState(useParams().code)
	const [messages, setMessages] = useState(props.messages || [])
	const [resendMessages, setResendMessages] = useState([])

	const autoVerify = useRef(!!useParams().code)

	const verifyRef = useRef(verify)

	function updateCode(event) {
		setCode(event.target.value)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') verify();
	}

	function verify() {
		AuthService.verify(id, code, (response) => {
			navigate(AppPath.HOME)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	function resend() {
		AuthService.resend(id, (response) => {
			let messages = response.messages
			if (!!!messages) messages = [response.message]
			setResendMessages(messages)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setResendMessages(messages)
		})
	}

	function clearMessages() {
		setMessages([])
	}

	function clearResendMessages() {
		setResendMessages([])
	}

	useEffect(() => {
		if (autoVerify.current) setTimeout(verifyRef.current, 3000)
	}, [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div>Please click on the link in the email you received or enter the verification code:</div>
			</div>
			<div className='page-body'>
				<div className='page-form'>
					<label htmlFor='code' className='page-label'>Verification Code</label>
					<input id='code' name='code' type='text' value={code} placeholder='Verification Code' autoComplete='one-time-code' className='page-field' onChange={updateCode} onKeyDown={onKeyDown}/>
					<button className='page-submit' onClick={verify}>Verify</button>
					<Notice messages={messages} priority='error' clearMessages={clearMessages}/>
				</div>
			</div>
			<div className='page-body'>
				<div className='hbox'>Didn't receive the email? <button onClick={resend}>Resend</button></div>
				<Notice messages={resendMessages} clearMessages={clearResendMessages}/>
			</div>
		</div>
	)
}
