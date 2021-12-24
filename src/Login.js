import './css/login.css';
import Notice from "./Notice";

import React from 'react';
import AuthService from "./api/AuthService";

export default class Login extends React.Component {

	state = {
		username: '',
		password: '',
		messages: []
	}

	doLogin = () => {
		console.log("doLogin")
		AuthService.login(this.state.username, this.state.password, (success) => {
			//window.location.replace('/');
		}, (failure) => {
			console.log("failure message=" + failure.message)
			this.setState({messages: [failure.message]})
		});
	}

	updateUsername = (event) => {
		this.setState({username: event.target.value})
	}

	updatePassword = (event) => {
		this.setState({password: event.target.value})
	}

	clearMessages = () => {
		this.setState({messages: [] })
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='logo192.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<form action='/login' method='post' className='login-form'>
						<Username onChange={this.updateUsername}/>
						<Password onChange={this.updatePassword}/>
						<input id='login' type='button' value='Sign In' className='login-submit' onClick={this.doLogin}/>
						<Notice messages={this.state.messages} priority='error' clearMessages={this.clearMessages}/>
					</form>
				</div>
				<div className='login-body'>
					<p>Need an account? <a href='/signup' className='button'>Sign up</a></p>
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
				<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='login-field' onChange={this.props.onChange}/>
			</div>
		);
	}

}

class Password extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='password' className='login-label'>Password</label>
				<input id='password' name='password' type='password' autoComplete='current-password' className='login-field' onChange={this.props.onChange}/>
			</div>
		);
	}

}