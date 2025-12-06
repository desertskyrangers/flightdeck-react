import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Times from "./util/Times";
import Ago from "./part/Ago";

export default function UserFlights() {

	const [page, setPage] = useState()
	const [messages, setMessages] = useState([])

	function clearMessages() {
		setMessages([])
	}

	let list;
	if (!!page) {
		list = <FlightList page={page} loadFlightPage={loadFlightPage}/>
	} else {
		list = <Loading/>
	}

	function loadFlightPage(page) {
		UserService.getFlightPage(page, (success) => {
			setPage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadFlightPage(0), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<Notice messages={messages} clearMessages={clearMessages}/>
				</div>
			</div>
		</div>
	)
}

function FlightList(props) {
	const navigate = useNavigate();

	let page
	if (props.page.content.length === 0) {
		page = <NoResults message='No flights'/>
	} else {
		page = <table className='flight-list'>
			<tbody>
			{props.page.content.map((flight) => <FlightRow key={flight.id} value={flight.id} flight={flight}/>)}
			</tbody>
		</table>
	}

	function add() {
		navigate(AppPath.FLIGHT + "/new")
	}

	function prior() {
		props.loadFlightPage(props.page.number - 1)
	}

	function next() {
		props.loadFlightPage(props.page.number + 1)
	}

	function exportData() {
		navigate(AppPath.EXPORT)
	}

	return (
		<div className='vbox'>
			<div className='hbox'>
				<button className='page-action icon' onClick={prior} disabled={props.page.first}>{Icons.PAGE_PRIOR}</button>
				<button className='page-action' onClick={add}>Log a Flight</button>
				<button className='page-action icon' onClick={next} disabled={props.page.last}>{Icons.PAGE_NEXT}</button>
			</div>
			{page}
			<div className='hbox'>
				<button className='page-action icon' onClick={exportData}>{Icons.EXPORT}</button>
			</div>
		</div>
	)

}

function FlightRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.FLIGHT + "/" + props.flight.id)
	}

	return (
		<tr onClick={open}>
			<td>{Icons.fromUserFlightRole(props.flight.userFlightRole)}</td>
			<td>
				<span style={{'color':props.flight.trimColor, 'backgroundColor':props.flight.baseColor,'padding':'0.2rem', 'borderRadius':'0.2rem'}}>{Icons.fromAircraftTypeAndStatus(props.flight.type, props.flight.status)}</span>
			</td>
			<td>{props.flight.name}</td>
			<td>{Times.toFlightTime(props.flight.duration)}</td>
			<td className='no-wrap'><Ago timestamp={props.flight.timestamp}/></td>
		</tr>
	)

}
