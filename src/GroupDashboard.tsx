import React, {useEffect, useState} from "react";
import {FlightStats, FlightStatsHeader} from "./part/FlightStats";
import GroupService from "./api/GroupService";
import {Link} from "react-router";
import AppPath from "./AppPath";
import Times from "./util/Times";
import Icons from "./util/Icons";
import Dates from "./util/Dates";

export default function GroupDashboard(props) {

	const [dashboard, setDashboard] = useState(props.dashboard || {
		pilotFlightCount: 0,
		pilotFlightTime: 0,
		pilotWithHighestTotalFlightCount: {name: "", description: "", value: "", owner: ""},
		pilotWithHighestTotalFlightTime: {name: "", description: "", value: "", owner: ""},
		pilotWithMostRecentFlightDate: {name: "", description: "", value: "", owner: ""},
		pilotWithLongestSingleFlightTime: {name: "", description: "", value: "", owner: ""}
	})

	function loadDashboards() {
		GroupService.dashboard(props.id, (result) => {
			setDashboard(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			props.setMessages(messages)
		})
	}

	function groupCallout() {
		GroupService.callout(props.id, (result) => {
			let messages = result.messages
			if (!!!messages) messages = [result.message]
			props.setMessages(messages, 'info')
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			props.setMessages(messages)
		})
	}

	useEffect(loadDashboards, [props])

	return (
		<div className='page-form-content'>

			{/* TODO IF the user has not joined a group, show a link to join */}


			<table className='dashboard'>
				<tbody>
				<FlightStatsHeader/>
				<FlightStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/>
				{/*	{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}*/}
				{/*	{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}*/}
				</tbody>
			</table>

			<div className='hbox'>
				<button className='page-action' onClick={groupCallout}>{Icons.CALLOUT} Callout</button>
			</div>

			{!!dashboard.memberStats ?
				<table className='stats'>
					<tbody>
					<tr>
						<td>Pilot</td>
						<td>Flights</td>
						<td>Time</td>
					</tr>
					{dashboard.memberStats.map((member) => <MemberRow key={member.id} value={member.id} member={member}/>)}
					</tbody>
				</table>
				: null}

			<div className='page-header'>Current Records</div>
			<RecordRow item={dashboard.pilotWithHighestTotalFlightCount}/>
			<RecordRow item={dashboard.pilotWithHighestTotalFlightTime}/>
			<RecordRow item={dashboard.pilotWithMostRecentFlightDate}/>
			<RecordRow item={dashboard.pilotWithLongestSingleFlightTime}/>
		</div>
	)
}

function MemberRow(props) {
	let name = props.member.name
	if (props.member.publicDashboardEnabled) name = <Link to={AppPath.DASHBOARD + "/" + props.member.id}>{props.member.name}</Link>

	return (
		<tr>
			<td className='no-wrap'>{name}</td>
			<td>{props.member.flightCount}</td>
			<td>{Times.toSummaryFlightTime(props.member.flightTime)}</td>
		</tr>
	)
}

function RecordRow(props) {

	/* Record values can have types that indicate the value format */
	let value = props.item.value
	if (props.item.type === 'duration') value = Times.toSummaryFlightTime(props.item.value)
	if (props.item.type === 'timestamp') value = Dates.isoDate(new Date(Number.parseInt(props.item.value)))

	return (
		<div>
			<div className='page-label'>{props.item.name}</div>
			<table className='records'>
				<tbody>
				<tr>
					<td>{props.item.owner}</td>
					<td>{value}</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
}
