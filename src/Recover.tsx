import React from "react";
import EntryField from "./part/EntryField";
import {useState} from "react";
import Notice from "./part/Notice";
import {useNavigate} from "react-router";
import Icons from "./util/Icons";
import AuthService from "./api/AuthService";

export default function Recover(props) {

	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [messages, setMessages] = useState([])

	function close() {
		navigate(-1)
	}

	function clearMessages() {
		setMessages([])
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') submit();
	}

	function submit() {
		console.log("Submit recover request")
		AuthService.recover(username, (response) => {
			let messages = response.messages
			if (!!!messages) messages = [response.message]
			setMessages(messages)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntryField id='username'
											text='Username or email address'
											type='text'
											value={username}
											onChange={(event) => setUsername(event.target.value)}
											onKeyDown={onKeyDown}
											labelActionIcon={Icons.CLOSE}
											onLabelAction={close}/>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={messages.length > 0} className='page-submit' onClick={submit}>Send Recovery Email</button>
				</div>
			</div>
		</div>
	)

}
