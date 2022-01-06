import './css/login.css';

import AuthService from "./api/AuthService";
import Config from "./AppConfig";
import Notice from "./Notice";

import React from "react";
import {isEqual} from "lodash";
import {useNavigate} from "react-router-dom";

export default function Register(props) {
	const navigate = useNavigate();
	return (<RegisterComponent messages={props.messages} navigate={navigate}/>)
}

class RegisterComponent extends React.Component {

	state = {
		username: '', password: '', verifyPassword: '', email: '', messages: this.props.messages || [],
	}

	notice = <Notice priority='error'/>

	onKeyDown = (event) => {
		if (event.key === 'Enter') this.register();
	}

	register = (event) => {
		AuthService.register(this.state.username, this.state.password, this.state.email, (verification) => {
			this.props.navigate("/verify/" + verification.id);
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		});
		event.preventDefault();
	}

	updateUsername = (event) => {
		this.setState({username: event.target.value})
	}

	updatePassword = (event) => {
		this.setState({password: event.target.value})
	}

	updateVerifyPassword = (event) => {
		this.setState({verifyPassword: event.target.value})
	}

	updateEmail = (event) => {
		this.setState({email: event.target.value})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	componentDidUpdate(prevProps, prevState) {
		const validUsername = !!this.state.username
		const validPassword = !!this.state.password
		const passwordTooShort = !!this.state.password && this.state.password.length < 8;
		const passwordTooLong = !!this.state.password && this.state.password.length >= 128;
		const passwordsMatch = this.state.password === this.state.verifyPassword
		const validEmail = !this.state.email || this.state.email.match(Config.EMAIL_PATTERN)

		let messages = [];
		if (!validUsername) messages.push('Invalid username')
		if (!validPassword) messages.push('Invalid password')
		if (passwordTooShort) messages.push('Password too short')
		if (passwordTooLong) messages.push('Password too long')
		if (!passwordsMatch) messages.push('Passwords do not match')
		if (!validEmail) messages.push('Invalid email address')
		if (!isEqual(messages, prevState.messages)) this.setState({messages: messages})
	}

	render() {
		return (<div className='login-container'>
			<div className='login-body'>
				<div className='login-form'>
					<SignupField id='username' text='Username' type='text' autoFocus='autofocus' value={this.state.username} onChange={this.updateUsername} onKeyDown={this.onKeyDown}/>
					<SignupField id='password' text='Password' type='password' value={this.state.password} onChange={this.updatePassword} onKeyDown={this.onKeyDown}/>
					<SignupField id='verify-password' text='Verify Password' type='password' value={this.state.verifyPassword} onChange={this.updateVerifyPassword} onKeyDown={this.onKeyDown}/>
					<SignupField id='email' text='Email Address' type='text' value={this.state.email} onChange={this.updateEmail} onKeyDown={this.onKeyDown}/>
					<button disabled={this.state.messages.length > 0} className='login-submit' onClick={this.register}>Sign Up</button>
					<Notice priority='error' messages={this.state.messages} clearMessages={this.clearMessages}/>
				</div>
			</div>
		</div>);
	}

}

function SignupField(props) {
	return (<div>
		<label htmlFor={props.id} className='login-label'>{props.text}</label>
		<input id={props.id}
					 name={props.id}
					 type={props.type}
					 placeholder={props.text}
					 autoCapitalize='none'
					 autoCorrect='off'
					 className='login-field'
					 autoFocus={props.autoFocus}
					 value={props.value}
					 onChange={props.onChange}
					 onKeyDown={props.onKeyDown}/>
	</div>)
}
