import EntrySelect from "../part/EntrySelect"
import React, {useCallback, useEffect, useRef, useState} from "react"
import LookupService from "../api/LookupService"
import {useNavigate, useParams} from "react-router"
import EntryField from "../part/EntryField"
import Icons from "../util/Icons"
import GroupService from "../api/GroupService";
import Notice from "../part/Notice";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import NoResults from "../part/NoResults";
import {MembershipUser} from "../part/MembershipUser";

export default function Group(props) {
	const navigate = useNavigate();

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || '')
	const [invitee, setInvitee] = useState(props.invitee || '')
	const [memberships, setMemberships] = useState([])
	const [messages, setMessages] = useState([])

	// Options
	const [typeOptions, setTypeOptions] = useState([])

	// Actions
	const [requestDelete, setRequestDelete] = useState(false)
	const [inviteMember, setInviteMember] = useState(false)

	// References
	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function onInviteKeyDown(event) {
		if (event.key === 'Enter') doInvite();
	}

	function clearMessages() {
		setMessages([])
	}

	function loadTypeOptions() {
		LookupService.getGroupTypes((result) => {
			setTypeOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	const loadMemberships = useCallback((groupId) => {
		GroupService.getMemberships(!!groupId ? groupId : id, (response) => {
			setMemberships(response)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}, [id])

	const loadGroup = useCallback(() => {
		if (isNewRef.current) return
		GroupService.getGroup(idRef.current, (result) => {
			setId(result.group.id)
			setName(result.group.name)
			setType(result.group.type)
			loadMemberships(result.group.id)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}, [loadMemberships])

	function update() {
		GroupService.updateGroup({
			id: idRef.current,
			name: name,
			type: type
		}, (success) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function toggleInvite() {
		setInviteMember(!inviteMember)
	}

	function doDelete() {
		GroupService.deleteGroup(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function doInvite() {
		GroupService.inviteMember(id, invitee, (result) => {
			loadGroup()
			setInviteMember(false)
			setInvitee('')
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadTypeOptions(), [])
	useEffect(() => loadGroup(), [loadGroup])

	let membershipList: JSX.Element[] = [<NoResults message='No members found'/>]
	if (!!memberships && memberships.length > 0) membershipList = memberships.map((membership) => <MembershipUser key={membership.id} membership={membership} onMemberUpdate={loadMemberships}/>)

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='hbox'><button className='icon' onClick={close}>{Icons.BACK}</button><span className='page-header'>{name}</span></div>

					<EntryField id='name' text='Name' type='text' value={name} required={true} autoFocus='autofocus' onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown}/>

					<EntrySelect id='type' text='Type' value={type} required defaultValue='unspecified' onChange={(event) => setType(event.target.value)}>
						<option key='unspecified' hidden>Select a group type</option>
						{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNewRef.current ? null : <button className='icon' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='name of the group' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

					<div className='vbox'>
						{membershipList}
						<button className='page-action' onClick={toggleInvite}>{Icons.ADD}</button>
						{inviteMember ? <EntryField id='invitee'
																				type='text'
																				value={invitee}
																				onChange={(event) => setInvitee(event.target.value)}
																				onKeyDown={onInviteKeyDown}
																				fieldActionIcon={Icons.SEND}
																				onFieldAction={doInvite}/> : null}
					</div>
				</div>
			</div>
		</div>
	)

}
