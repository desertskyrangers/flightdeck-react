import React, {useEffect, useState} from "react";
import {FlightStats, FlightStatsHeader} from "./part/FlightStats";
import GroupService from "./api/GroupService";
import {Link} from "react-router-dom";
import AppPath from "./AppPath";
import Times from "./util/Times";

export default function GroupDashboard(props) {

	const [dashboard, setDashboard] = useState(props.dashboard || {
		pilotFlightCount: 0,
		pilotFlightTime: 0
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

	useEffect(loadDashboards, [props])

	return (
		<div className='page-form-content'>

			{/* TODO IF the user has not joined a group, show a link to join */}

			{/*<button className='page-action' onClick={() => navigate(ApiPath.FLIGHT_TIMER)}>Time a Flight</button>*/}

			<table className='dashboard'>
				<tbody>
				<FlightStatsHeader/>
				<FlightStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/>
				{/*	{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}*/}
				{/*	{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}*/}
				</tbody>
			</table>

			{/*<button className='page-action' onClick={() => navigate(AppPath.FLIGHT + "/new")}>Log a Flight</button>*/}

			{!!dashboard.memberStats ?
				<table className='stats'>
					<tbody>
					{dashboard.memberStats.map((member) => <MemberRow key={member.id} value={member.id} member={member}/>)}
					</tbody>
				</table>
				: null}

			{/*<LastFlight timestamp={dashboard.lastPilotFlightTimestamp}/>*/}
		</div>
	)
}

function MemberRow(props) {
	let name = props.member.name
	if( props.member.publicDashboardEnabled ) name = <Link to={AppPath.DASHBOARD + "/" + props.member.id}>{props.member.name}</Link>

	return (
		<tr>
			<td>{name}</td>
			<td>{props.member.flightCount}</td>
			<td>{Times.toHourMinSec(props.member.flightTime)}</td>
		</tr>
	)
}
