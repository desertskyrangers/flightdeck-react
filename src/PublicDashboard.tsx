import React, {useEffect, useRef, useState} from "react"
import UserService from "./api/UserService"
import Notice from "./part/Notice"
import {Link, useParams} from "react-router-dom"
import './css/dashboard.css'
import Times from "./util/Times";
import Ago from "./part/Ago";
import AppPath from "./AppPath";

export default function PublicDashboard(props) {

	const idRef = useRef(useParams().id)

	// const navigate = useNavigate()

	const [dashboard, setDashboard] = useState(props.dashboard || {
		pilotFlightCount: 0,
		pilotFlightTime: 0
	})

	const [messages, setMessages] = useState(props.messages || [])

	function clearMessages() {
		setMessages([])
	}

	function loadDashboard() {
		UserService.publicDashboard(idRef.current, (result) => {
			setDashboard(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	useEffect(loadDashboard, [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>

					<h1>{dashboard.displayName}</h1>

					<table className='dashboard'>
						<tbody>
						<PilotStatsHeader/>
						<PilotStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/>
						{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}
						{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}
						</tbody>
					</table>

					{!!dashboard.aircraftStats ?
						<table className='stats'>
							<tbody>
							{dashboard.aircraftStats.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
							</tbody>
						</table>
						: null}

					<LastFlight timestamp={dashboard.lastPilotFlightTimestamp}/>
				</div>
			</div>
		</div>
	)
}

function PilotStatsHeader() {
	return (
		<tr>
			<td className='dashboard-header'>Flights</td>
			<td rowSpan={2}>
				<div className='v-separator'/>
			</td>
			<td className='dashboard-header'>Flight Time</td>
		</tr>
	)
}

function PilotStats(props) {
	return (
		<tr>
			<td className='page-metric'>{props.count}</td>
			<td className='page-metric'>{Times.toHourMinSec(props.time)}</td>
		</tr>
	)
}

function ObserverStatsHeader() {
	return (
		<tr>
			<td className='dashboard-header'>Flights</td>
			<td rowSpan={2}>
				<div className='v-separator'/>
			</td>
			<td className='dashboard-header'>Observer Time</td>
		</tr>
	)
}

function ObserverStats(props) {
	return (
		<tr>
			<td className='page-metric'>{props.count}</td>
			<td className='page-metric'>{Times.toHourMinSec(props.time)}</td>
		</tr>
	)
}

function AircraftRow(props) {
	return (
		<tr>
			<td><Link to={AppPath.AIRCRAFT + "/" + props.aircraft.id}>{props.aircraft.name}</Link></td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toHourMinSec(props.aircraft.flightTime)}</td>
		</tr>
	)
}

function LastFlight(props) {
	return (
		<table className='metrics'>
			<tbody>
			<tr>
				<td>Last flight:</td>
				<td><Ago timestamp={props.timestamp}/></td>
			</tr>
			</tbody>
		</table>
	)
}
