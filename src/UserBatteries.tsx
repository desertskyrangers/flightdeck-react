import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Times from "./util/Times";

export default function UserBatteries() {

	const [page, setPage] = useState()
	const [unavailablePage, setUnavailablePage] = useState()
	const [messages, setMessages] = useState([])
	const [showUnavailable, setShowUnavailable] = useState(false)

	let list;
	if (!!page) {
		list = <BatteryList
			page={page}
			unavailablePage={unavailablePage}
			showUnavailable={showUnavailable}
			loadBatteryPage={loadBatteryPage}
			loadUnavailableBatteryPage={loadUnavailableBatteryPage}
			setShowUnavailable={setShowUnavailable}/>
	} else {
		list = <Loading/>
	}

	function loadBatteryPage(page) {
		UserService.getBatteryPage(page, (success) => {
			setPage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadUnavailableBatteryPage(page) {
		UserService.getUnavailableBatteryPage(page, (success) => {
			setUnavailablePage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadBatteryPage(0), [])
	useEffect(() => loadUnavailableBatteryPage(0), [])

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

function BatteryList(props) {
	const navigate = useNavigate();

	let content: JSX.Element;
	if (props.page.content.length === 0) {
		content = <NoResults message='No batteries found'/>
	} else {
		content = <table className='flight-list'>
			<tbody>
			{props.page.content.map((craft) => <BatteryRow key={craft.id} value={craft.id} battery={craft}/>)}
			</tbody>
		</table>
	}

	let unavailableBatteryContent: JSX.Element;
	let unavailableIcon: JSX.Element;
	if (props.showUnavailable === false) {
		unavailableIcon = Icons.ADVANCED_V;
	} else {
		if (props.unavailablePage.content.length === 0) {
			unavailableBatteryContent = <NoResults message='No unavailable batteries found'/>
		} else {
			unavailableBatteryContent = <table className='flight-list'>
				<tbody>
				{props.unavailablePage.content.map((battery) => <BatteryRow key={battery.id} value={battery.id} battery={battery}/>)}
				</tbody>
			</table>
		}
		unavailableIcon = Icons.COLLAPSE;
	}

	function add() {
		navigate(AppPath.BATTERY + "/new")
	}

	function prior() {
		props.loadBatteryPage(props.page.number - 1)
	}

	function next() {
		props.loadBatteryPage(props.page.number + 1)
	}

	function toggleUnavailable() {
		props.setShowUnavailable(!props.showUnavailable)
	}

	return (
		<div className='vbox'>
			<div className='hbox'>
				<button className='page-action icon' onClick={prior} disabled={props.page.first}>{Icons.PAGE_PRIOR}</button>
				<button className='page-action' onClick={add}>Add a Battery</button>
				<button className='page-action icon' onClick={next} disabled={props.page.last}>{Icons.PAGE_NEXT}</button>
			</div>
			{content}
			<button className='icon centered' onClick={toggleUnavailable}>{unavailableIcon}</button>
			{unavailableBatteryContent}
		</div>
	)

}

function BatteryRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.BATTERY + "/" + props.battery.id)
	}

	return (
		<tr onClick={open}>
			<td className='no-wrap'>{Icons.fromBatteryStatusAndLife(props.battery.status, props.battery.life)} {props.battery.name}</td>
			<td>{props.battery.flightCount}</td>
			<td>{Times.toSummaryFlightTime(props.battery.flightTime)}</td>
		</tr>
	)

}
