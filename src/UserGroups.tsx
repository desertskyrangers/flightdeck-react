import "./css/member.css"
import React, {useEffect, useState} from "react";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import EntrySelect from "./part/EntrySelect";
import GroupService from "./api/GroupService";
import TokenService from "./api/TokenService";
import {MembershipGroup} from "./part/MembershipGroup";
import MembershipService from "./api/MembershipService";
import Loading from "./part/Loading";

export default function UserGroups(props) {
	const navigate = useNavigate();

	const [groups, setGroups] = useState([])
	const [memberships, setMemberships] = useState([])
	const [messages, setMessages] = useState([])

	function clearMessages() {
		setMessages([])
	}

	let list;
	if (!!groups) {
		list = <MembershipList memberships={memberships} groups={groups} onMembershipRequest={requestMembership} onMemberUpdate={loadMemberships}/>
	} else {
		list = <Loading/>
	}

	function loadGroups() {
		GroupService.getAvailableGroups((success) => {
			setGroups(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			console.log(messages)
			// if (!!messages) setMessages(messages)
		})
	}

	function loadMemberships() {
		UserService.getMemberships((response) => {
			setMemberships(response.data)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function requestMembership(group) {
		MembershipService.requestMembership(TokenService.getUserId(), group, 'requested', (response) => {
			setMemberships(response.memberships)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadGroups(), [])
	useEffect(() => loadMemberships(), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<button className='page-action' onClick={() => navigate(AppPath.GROUP + "/new")}>Create a new Group</button>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
				</div>
			</div>
		</div>
	)
}

function JoinRequest(props) {

	const [group, setGroup] = useState(props.group || '')


	function requestMembership() {
		props.onMembershipRequest(group)
		props.onClose()
	}

	function getContent() {
		const hasOptions = !!props.groups && props.groups.length > 0

		return hasOptions ?
			<EntrySelect id='group'
									 text='Group'
									 value={group}
									 required
									 defaultValue='unspecified'
									 onChange={(event) => setGroup(event.target.value)}
									 fieldActionIcon={Icons.GROUP_ADD}
									 onFieldAction={requestMembership}>
				<option key='unspecified' hidden>Select a group</option>
				{props.groups.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
			</EntrySelect> : <div>No groups available to join</div>
	}

	return (
		getContent()
	)

}

function MembershipList(props) {
	// Actions
	const [joinRequest, setJoinRequest] = useState(false)

	function toggleJoinRequest() {
		setJoinRequest(!joinRequest)
	}

	let memberships = <NoResults message='No group memberships'/>
	if (!!props.memberships && props.memberships.length > 0)
		memberships = props.memberships.map((membership) =>
			<MembershipGroup key={membership.id}
											 membership={membership}
											 onMemberUpdate={props.onMemberUpdate}/>)

	return (
		<div className='vbox'>
			<button className='page-action' onClick={() => toggleJoinRequest()}>Join a Group</button>
			{joinRequest ? <JoinRequest groups={props.groups} onClose={toggleJoinRequest} onMembershipRequest={props.onMembershipRequest}/> : null}
			{memberships}
		</div>
	)
}
