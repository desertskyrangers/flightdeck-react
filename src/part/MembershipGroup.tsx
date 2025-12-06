import {useNavigate} from "react-router";
import AppPath from "../AppPath";
import MembershipIcon from "./MembershipStatusIcon";
import {useCallback, useEffect, useState} from "react";
import MembershipService from "../api/MembershipService";
import Icons from "../util/Icons";
import React from "react";

export function MembershipGroup(props) {
	const navigate = useNavigate();

	const [acceptAction, setAcceptAction] = useState(false)
	const [cancelAction, setCancelAction] = useState(false)

	function isOwner() {
		return props.membership.status === 'owner'
	}

	function doClick() {
		if (isOwner()) navigate(AppPath.GROUP + "/" + props.membership.group.id)
	}

	const isAccepted = useCallback(() => {
		return props.membership.status === 'accepted'
	}, [props.membership.status])

	const isInvited = useCallback(() => {
		return props.membership.status === 'invited'
	}, [props.membership.status])

	const isRequested = useCallback(() => {
		return props.membership.status === 'requested'
	}, [props.membership.status])

	const isRevoked = useCallback(() => {
		return props.membership.status === 'revoked'
	}, [props.membership.status])

	function doAccept() {
		MembershipService.acceptMembership(props.membership.id, (result) => {
			props.onMemberUpdate()
		}, (failure) => {

		})
	}

	function doCancel() {
		MembershipService.cancelMembership(props.membership.id, (result) => {
			props.onMemberUpdate()
		}, (failure) => {

		})
	}

	useEffect(() => {
		setAcceptAction(isInvited())
		setCancelAction(isRequested() || isAccepted() || isRevoked())
	}, [isRequested, isRevoked, isInvited, isAccepted])

	return (
		<div className='hbox'>
			<div className={isOwner() ? 'page-result' : 'page-row'} onClick={doClick}>
				<MembershipIcon status={props.membership.status}/>
				{/*&nbsp;{Icons.fromGroupType(props.membership.group.type)}*/}
				<span className='page-text, no-wrap'>{props.membership.group.name}</span>
			</div>
			{acceptAction ? <button className='icon' onClick={doAccept}>{Icons.ACCEPT}</button> : null}
			{cancelAction ? <button className='icon' onClick={doCancel}>{Icons.CANCEL}</button> : null}
			{props.actionIcon ? <button className='icon page-field-action-button' onClick={props.onAction}>{props.actionIcon}</button> : null}
		</div>
	)
}
