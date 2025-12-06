import React, {useEffect, useRef, useState} from "react"
import UserService from "./api/UserService"
import Notice from "./part/Notice"
import {useParams} from "react-router"
import './css/dashboard.css'
import Times from "./util/Times";
import Ago from "./part/Ago";
import Icons from "./util/Icons";

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
			setDashboard(result.data)
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

					{!!dashboard.displayName ? <h1>{dashboard.displayName}</h1> : null}

					{!!dashboard.displayName ? <table className='dashboard'>
						<tbody>
						{!!dashboard.pilotFlightCount ? <PilotStatsHeader/> : null}
						{!!dashboard.pilotFlightCount ? <PilotStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/> : null}
						{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}
						{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}
						</tbody>
					</table> : null}

					{!!dashboard.aircraftStats ?
						<table className='stats'>
							<tbody>
							{dashboard.aircraftStats.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
							</tbody>
						</table>
						: null}

					{!!dashboard.lastPilotFlightTimestamp ? <LastFlight timestamp={dashboard.lastPilotFlightTimestamp}/> : null}
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
			<td className='page-metric'>{Times.toSummaryFlightTime(props.time)}</td>
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
			<td className='page-metric'>{Times.toSummaryFlightTime(props.time)}</td>
		</tr>
	)
}

function AircraftRow(props) {
	return (
		<tr>
			<td>
				<span style={{'color':props.aircraft.trimColor, 'backgroundColor':props.aircraft.baseColor,'padding':'0.2rem', 'borderRadius':'0.2rem','display':'inline-block'}}>{Icons.fromAircraftTypeAndStatus(props.aircraft.type, props.aircraft.status)}</span>
			</td>
			<td>{props.aircraft.name}</td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toSummaryFlightTime(props.aircraft.flightTime)}</td>
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
