import React, {useEffect, useRef, useState} from "react";
import './css/timer.css';
import {useNavigate} from "react-router";
import Icons from "./util/Icons";
import AppPath from "./AppPath";

export default function FlightTimer() {

	const navigate = useNavigate()
	const startRef = useRef(new Date())

	const [hh, setHH] = useState(0)
	const [mm, setMM] = useState(0)
	const [ss, setSS] = useState(0)

	function updateClock() {
		let duration = Math.floor((new Date().getTime() - startRef.current.getTime()) / 1000)
		setSS(duration % 60)
		duration = Math.floor(duration / 60)
		setMM(duration % 60)
		duration = Math.floor(duration / 60)
		setHH(duration)
	}

	function resetClock() {
		startRef.current = new Date()
	}

	function logFlight() {
		let duration = Math.floor((new Date().getTime() - startRef.current.getTime()) / 1000)
		navigate(AppPath.FLIGHT + "/new/" + startRef.current.getTime() + "/" + duration)
	}

	function close() {
		navigate(-1)
	}

	useEffect(() => {
		const timer = setInterval(updateClock, 1000)
		return () => clearInterval(timer)
	}, [])

	return (

		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<div className='page-label-row'>
						<span>Flight timer running...</span>
						<span className='icon' onClick={close}>{Icons.CLOSE}</span>
					</div>

					<div className='flight-timer-clock'>{String(hh).padStart(2, '0')}:{String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}</div>
					<div>Enjoy your flight!</div>
					<div className='hbox'>
						<button className='page-action' onClick={resetClock}>Restart</button>
						<button className='page-action' onClick={logFlight}>Log Flight</button>
					</div>
				</div>
			</div>
		</div>
	)

}
