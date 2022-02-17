import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";

export default function UserBatteries() {

	const [batteries, setBatteries] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!batteries) {
		list = <BatteryList batteries={batteries}/>
	} else {
		list = <Loading/>
	}

	function loadBatteryPage(page) {
		UserService.getBatteryPage(page, (success) => {
			setBatteries(success.batteries)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadBatteryPage(page), [page])

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

	let page
	if (props.batteries.length === 0) {
		page = <NoResults message='No batteries found'/>
	} else {
		page = props.batteries.map((craft) => <BatteryRow key={craft.id} value={craft.id} battery={craft}/>)
	}

	function add() {
		navigate(AppPath.BATTERY + "/new")
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={add}>Add an Battery</button>
			{page}
		</div>
	)

}

function BatteryRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.BATTERY + "/" + props.battery.id)
	}

	function icon(status, life) {
		if (status === "destroyed") {
			return Icons.fromBatteryStatus(status)
		} else {
			if (life > 80) return Icons.BATTERY_FULL;
			if (life > 60) return Icons.BATTERY_THREE_QUARTER;
			if (life > 40) return Icons.BATTERY_HALF;
			if (life > 20) return Icons.BATTERY_QUARTER;
			return Icons.BATTERY_EMPTY;
		}
	}

	return (
		<div className='page-result' onClick={open}>{icon(props.battery.status, props.battery.life)} {props.battery.name}</div>
	)

}
