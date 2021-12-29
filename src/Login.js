import './css/login.css';
import Notice from "./Notice";

import React from 'react';
import AuthService from "./api/AuthService";
import {useNavigate} from 'react-router-dom';

export default function Login() {

	const navigate = useNavigate();

	const home = () => {
		navigate( '/' )
	}

	const register = () => {
		navigate( '/register' )
	}

	return (
		<LoginComponent navHome={home} navRegister={register}/>
	)
}

class LoginComponent extends React.Component {

	state = {
		username: '',
		password: '',
		messages: []
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') this.login();
	}

	login = () => {
		this.setState({messages: []})
		AuthService.login(this.state.username, this.state.password, (success) => {
			this.props.navHome();
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		});
	}

	updateUsername = (event) => {
		this.setState({username: event.target.value})
	}

	updatePassword = (event) => {
		this.setState({password: event.target.value})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<div className='login-form'>
						<Username onChange={this.updateUsername}/>
						<Password onChange={this.updatePassword}/>
						<input id='login' type='button' value='Sign In' className='login-submit' onClick={this.login}/>
						<Notice messages={this.state.messages} priority='error' clearMessages={this.clearMessages}/>
					</div>
				</div>
				<div className='login-body'>
					<p>Need an account? <button onClick={this.props.navRegister}>Sign Up</button> </p>
				</div>
			</div>
		);
	}

}

class Username extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='username' className='login-label'>Username or email address</label>
				<input id='username' name='username' type='text' placeholder='Username' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='login-field' onChange={this.props.onChange} onKeyDown={this.onKeyDown}/>
			</div>
		);
	}

}

class Password extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='password' className='login-label'>Password</label>
				<input id='password' name='password' type='password' placeholder='Password' autoComplete='current-password' className='login-field' onChange={this.props.onChange} onKeyDown={this.onKeyDown}/>
			</div>
		);
	}

}
