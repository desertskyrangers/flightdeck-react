import './css/page.css';
import Notice from "./part/Notice";

import React, {useState} from 'react';
import AuthService from "./api/AuthService";
import {Link, useNavigate} from 'react-router';
import ApiPath from "./AppPath";
import AppPath from "./AppPath";
import Header from "./Header";

export default function Login(props) {

	const navigate = useNavigate();

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [messages, setMessages] = useState(props.messages || [])

	function onKeyDown(event) {
		if (event.key === 'Enter') login();
	}

	function login() {
		setMessages([])
		AuthService.login(username, password, (success) => {
			navigate(ApiPath.HOME)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		});
	}

	function updateUsername(event) {
		setUsername(event.target.value)
	}

	function updatePassword(event) {
		setPassword(event.target.value)
	}

	function clearMessages() {
		setMessages([])
	}

	return (
		<div className='page-container'>
			<Header/>
			<div className='page-body'>
				<div className='page-form'>
					<Username onChange={updateUsername} onKeyDown={onKeyDown}/>
					<Password onChange={updatePassword} onKeyDown={onKeyDown}/>
					<Link className='page-link' to={AppPath.RECOVER}>Forgot password?</Link>
					<button className='page-submit' onClick={login}>Sign In</button>
					<Notice messages={messages} priority='error' clearMessages={clearMessages}/>
					<Link className='page-link' to={AppPath.REGISTER}>Need an account?</Link>
				</div>
			</div>
			<div className='page-label'><Link to={AppPath.ABOUT}>FlightDeck v{props.version}</Link></div>
		</div>
	)
}

function Username(props) {
	return (
		<div>
			<label htmlFor='username' className='page-label'>Username or email address</label>
			<input id='username'
						 name='username'
						 type='text'
						 placeholder='Username'
						 autoCapitalize='none'
						 autoCorrect='off'
						 autoComplete='username'
						 autoFocus={true}
						 className='page-field'
						 onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	)
}

function Password(props) {
	return (
		<div>
			<label htmlFor='password' className='page-label'>Password</label>
			<input id='password'
						 name='password'
						 type='password'
						 placeholder='Password'
						 autoCapitalize='none'
						 autoCorrect='off'
						 autoComplete='current-password'
						 className='page-field'
						 onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	)
}
