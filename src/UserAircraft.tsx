import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Times from "./util/Times";

export default function UserAircraft() {

	const [page, setPage] = useState()
	const [unavailablePage, setUnavailablePage] = useState()
	const [messages, setMessages] = useState([])
	const [showUnavailable, setShowUnavailable] = useState(false)

	let list;
	if (!!page) {
		list = <AircraftList
			page={page}
			unavailablePage={unavailablePage}
			showUnavailable={showUnavailable}
			loadAircraftPage={loadAircraftPage}
			loadUnavailableAircraftPage={loadUnavailableAircraftPage}
			setShowUnavailable={setShowUnavailable}
		/>
	} else {
		list = <Loading/>
	}

	function loadAircraftPage(page) {
		UserService.getAircraftPage(page, (success) => {
			setPage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadUnavailableAircraftPage(page) {
		UserService.getUnavailableAircraftPage(page, (success) => {
			setUnavailablePage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadAircraftPage(0), [])
	useEffect(() => loadUnavailableAircraftPage(0), [])

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

function AircraftList(props) {
	const navigate = useNavigate();

	let content: JSX.Element;
	if (props.page.content.length === 0) {
		content = <NoResults message='No aircraft found'/>
	} else {
		content = <table className='flight-list'>
			<tbody>
			{props.page.content.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
			</tbody>
		</table>
	}

	let unavailableAircraftContent: JSX.Element;
	let unavailableIcon: JSX.Element;
	if (props.showUnavailable === false) {
		unavailableIcon = Icons.ADVANCED_V;
	} else {
		if (props.unavailablePage.content.length === 0) {
			unavailableAircraftContent = <NoResults message='No unavailable aircraft found'/>
		} else {
			unavailableAircraftContent = <table className='flight-list'>
				<tbody>
				{props.unavailablePage.content.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
				</tbody>
			</table>
		}
		unavailableIcon = Icons.COLLAPSE;
	}

	function add() {
		navigate(AppPath.AIRCRAFT + "/new")
	}

	function prior() {
		props.loadAircraftPage(props.page.number - 1)
	}

	function next() {
		props.loadAircraftPage(props.page.number + 1)
	}

	function toggleUnavailable() {
		props.setShowUnavailable(!props.showUnavailable)
	}

	return (
		<div className='vbox'>
			<div className='hbox'>
				<button className='page-action icon' onClick={prior} disabled={props.page.first}>{Icons.PAGE_PRIOR}</button>
				<button className='page-action' onClick={add}>Add an Aircraft</button>
				<button className='page-action icon' onClick={next} disabled={props.page.last}>{Icons.PAGE_NEXT}</button>
			</div>
			{content}
			<button className='icon centered' onClick={toggleUnavailable}>{unavailableIcon}</button>
			{unavailableAircraftContent}
		</div>
	)

}

function AircraftRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.AIRCRAFT + "/" + props.aircraft.id)
	}

	return (
		<tr onClick={open}>
			<td>
				<span style={{'color':props.aircraft.trimColor, 'backgroundColor':props.aircraft.baseColor,'padding':'0.2rem', 'borderRadius':'0.2rem'}}>{Icons.fromAircraftTypeAndStatus(props.aircraft.type, props.aircraft.status)}</span>
			</td>
			<td className='no-wrap' >
				{props.aircraft.name}
			</td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toSummaryFlightTime(props.aircraft.flightTime)}</td>
		</tr>
	)

}
