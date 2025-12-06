import React from "react";
import ApiPath from "../AppPath";
import AppPath from "../AppPath";
import {useNavigate} from "react-router";

export default function FlightActions() {

	const navigate = useNavigate();

	function timeFlight() {
		navigate(ApiPath.FLIGHT_TIMER)
	}

	function logFlight() {
		navigate(AppPath.FLIGHT + "/new")
	}

	function flightLog() {
		navigate(ApiPath.USER_FLIGHTS)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-action' onClick={timeFlight}>Time a Flight</button>
					<button className='page-action' onClick={logFlight}>Log a Flight</button>
					<button className='page-action' onClick={flightLog}>My Flight Log</button>
				</div>
			</div>
		</div>
	);

}
