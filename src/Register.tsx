import './css/page.css';

import AuthService from "./api/AuthService";
import Notice from "./part/Notice";

import React, {useLayoutEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router";
import ApiPath from "./AppPath";
import AppPath from "./AppPath";
import AppConfig from "./AppConfig";
import {isEqual} from "lodash";
import Icons from "./util/Icons";
import EntryField from "./part/EntryField";

export default function Register(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState(props.username || '');
  const [password, setPassword] = useState(props.password || '');
  const [verifyPassword, setVerifyPassword] = useState(props.verifyPassword || '');
  const [email, setEmail] = useState(props.email || '');
  const [messages, setMessages] = useState([])
  const [canRegister, setCanRegister] = useState(false)

  const previousMessages = useRef(messages)

  function close() {
    navigate(-1)
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') register();
  }

  function register() {
    AuthService.register(username, password, email, (verification) => {
      navigate(ApiPath.VERIFY + "/" + verification.id);
    }, (failure) => {
      let messages = failure.messages
      if (!!!messages) messages = [failure.message]
      setMessages(messages)
    });
  }

  useLayoutEffect(() => {
    const validUsername = !!username || username === ''
    const validPassword = !!password || password === ''
    const passwordTooShort = !!password && password.length < AppConfig.PASSWORD_LENGTH_MIN;
    const passwordTooLong = !!password && password.length >= AppConfig.PASSWORD_LENGTH_MAX;
    const passwordsMatch = password === verifyPassword
    const validEmail = !email || email.match(AppConfig.EMAIL_PATTERN) != null

    let messages = [];
    if (!validUsername) messages.push('Invalid username')
    if (!validPassword) messages.push('Invalid password')
    if (passwordTooShort) messages.push('Password too short')
    if (passwordTooLong) messages.push('Password too long')
    if (!passwordsMatch) messages.push('Passwords do not match')
    if (!validEmail) messages.push('Invalid email address')
    if (!isEqual(messages, previousMessages.current)) setMessages(messages)
    previousMessages.current = messages

    const canSubmitUsername = !!username && username !== ''
    const canSubmitPassword = !!password && password !== '' && !passwordTooShort && !passwordTooLong && passwordsMatch
    const canSubmitEmail = !!email && email !== '' && validEmail
    const canSubmit = canSubmitUsername && canSubmitPassword && canSubmitEmail

    setCanRegister(canSubmit)
  }, [username, password, verifyPassword, email])

  return (
    <div className='page-container'>
      <div className='page-body'>
        <div className='page-form'>
          <EntryField id='username'
                      text='Username'
                      type='text'
                      autoFocus='autofocus'
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      onKeyDown={onKeyDown}
                      labelActionIcon={Icons.CLOSE}
                      onLabelAction={close}/>
          <EntryField id='password' text='Password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={onKeyDown}/>
          <EntryField id='verify-password' text='Verify Password' type='password' value={verifyPassword} onChange={(event) => setVerifyPassword(event.target.value)} onKeyDown={onKeyDown}/>
          <EntryField id='email' text='Email Address' type='text' value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={onKeyDown}/>
          <button disabled={!canRegister} className='page-submit' onClick={register}>Sign Up</button>
          <Link className='page-link' to={AppPath.LOGIN}>Already have an account?</Link>
          <Notice priority='error' messages={messages} clearMessages={() => setMessages([])}/>
        </div>
      </div>
    </div>
  );

}
