import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router";
import AppPath from "./AppPath";
import UserService from "./api/UserService";

export default function UserLocations() {

	const [page, setPage] = useState()
	//const [unavailablePage, setUnavailablePage] = useState()
	const [messages, setMessages] = useState([])
	const [showUnavailable, setShowUnavailable] = useState(false)

	let list;
	if (!!page) {
		list = <LocationList
			page={page}
			//unavailablePage={unavailablePage}
			showUnavailable={showUnavailable}
			loadLocationPage={loadLocationPage}
			loadUnavailableLocationPage={loadRemovedLocationPage}
			setShowUnavailable={setShowUnavailable}/>
	} else {
		list = <Loading/>
	}

	function loadLocationPage(page) {
		UserService.getLocationPage(page, (success) => {
			setPage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadRemovedLocationPage(page) {
		// UserService.getRemovedLocationPage(page, (success) => {
		// 	setUnavailablePage(success.page)
		// }, (failure) => {
		// 	let messages = failure.messages
		// 	if (!!!messages) messages = [failure.message]
		// 	if (!!messages) setMessages(messages)
		// })
	}

	useEffect(() => loadLocationPage(0), [])
	useEffect(() => loadRemovedLocationPage(0), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<Notice messages={messages}/>
				</div>
			</div>
		</div>
	)
}

function LocationList(props) {
	const navigate = useNavigate();

	let content: JSX.Element;
	if (props.page.content.length === 0) {
		content = <NoResults message='No locations found'/>
	} else {
		content = <table className='flight-list'>
			<tbody>
			{props.page.content.map((craft) => <LocationRow key={craft.id} value={craft.id} location={craft}/>)}
			</tbody>
		</table>
	}

	let unavailableLocationContent: JSX.Element;
	// let unavailableIcon: JSX.Element;
	// if (props.showUnavailable === false) {
	// 	unavailableIcon = Icons.ADVANCED_V;
	// } else {
	// 	if (props.unavailablePage.content.length === 0) {
	// 		unavailableLocationContent = <NoResults message='No unavailable locations found'/>
	// 	} else {
	// 		unavailableLocationContent = <table className='flight-list'>
	// 			<tbody>
	// 			{props.unavailablePage.content.map((location) => <LocationRow key={location.id} value={location.id} location={location}/>)}
	// 			</tbody>
	// 		</table>
	// 	}
	// 	unavailableIcon = Icons.COLLAPSE;
	// }

	function add() {
		navigate(AppPath.LOCATION + "/new")
	}

	function prior() {
		props.loadLocationPage(props.page.number - 1)
	}

	function next() {
		props.loadLocationPage(props.page.number + 1)
	}

	// function toggleUnavailable() {
	// 	props.setShowUnavailable(!props.showUnavailable)
	// }

	return (
		<div className='vbox'>
			<div className='hbox'>
				<button className='page-action icon' onClick={prior} disabled={props.page.first}>{Icons.PAGE_PRIOR}</button>
				<button className='page-action' onClick={add}>Add a Location</button>
				<button className='page-action icon' onClick={next} disabled={props.page.last}>{Icons.PAGE_NEXT}</button>
			</div>
			{content}
			{/*<button className='icon centered' onClick={toggleUnavailable}>{unavailableIcon}</button>*/}
			{unavailableLocationContent}
		</div>
	)

}

function LocationRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.LOCATION + "/" + props.location.id)
	}

	return (
		<tr onClick={open}>
			<td className='no-wrap'>{Icons.fromLocationStatus(props.location.status)} {props.location.name}</td>
			{/*<td>{props.location.flightCount}</td>*/}
			{/*<td>{Times.toSummaryFlightTime(props.location.flightTime)}</td>*/}
		</tr>
	)

}
