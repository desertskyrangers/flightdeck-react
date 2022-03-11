import React from 'react';
import {
	faAngleDoubleRight,
	faAngleDown,
	faAngleUp,
	faBan,
	faBars,
	faBatteryEmpty,
	faBatteryFull,
	faBatteryHalf,
	faBatteryQuarter,
	faBatteryThreeQuarters,
	faBinoculars,
	faBuilding,
	faCalendar,
	faCheck,
	faClock,
	faCopy,
	faEllipsisH,
	faEllipsisV,
	faEnvelope,
	faHelicopter,
	faHome,
	faKey,
	faPlane,
	faPlus,
	faQuestion,
	faSpinner,
	faTrash,
	faTv,
	faUserAlt,
	faUserFriends,
	faUsers
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DroneIcon from "../icon/DroneIcon";
import CloseIcon from "../icon/CloseIcon";

class Icons {

	ACCEPT = <FontAwesomeIcon icon={faCheck}/>
	ADD = <FontAwesomeIcon icon={faPlus}/>
	ADVANCED = <FontAwesomeIcon icon={faEllipsisH}/>
	ADVANCED_V = <FontAwesomeIcon icon={faEllipsisV}/>
	AIRCRAFT_DESTROYED = <FontAwesomeIcon icon={faBan}/>
	BARS = <FontAwesomeIcon icon={faBars}/>
	BATTERY = <FontAwesomeIcon icon={faBatteryFull}/>
	BATTERY_FULL = <FontAwesomeIcon icon={faBatteryFull}/>
	BATTERY_THREE_QUARTER = <FontAwesomeIcon icon={faBatteryThreeQuarters}/>
	BATTERY_HALF = <FontAwesomeIcon icon={faBatteryHalf}/>
	BATTERY_QUARTER = <FontAwesomeIcon icon={faBatteryQuarter}/>
	BATTERY_EMPTY = <FontAwesomeIcon icon={faBatteryEmpty}/>
	BATTERY_DESTROYED = <FontAwesomeIcon icon={faBan}/>
	CALENDAR = <FontAwesomeIcon icon={faCalendar}/>
	CANCEL = <FontAwesomeIcon icon={faBan}/>
	CLOCK = <FontAwesomeIcon icon={faClock}/>
	CLOSE = <CloseIcon/>
	CLUB = <FontAwesomeIcon icon={faUserFriends}/>
	COLLAPSE = <FontAwesomeIcon icon={faAngleUp}/>
	COMPANY = <FontAwesomeIcon icon={faBuilding}/>
	COPY = <FontAwesomeIcon icon={faCopy}/>
	DASHBOARD = <FontAwesomeIcon icon={faTv}/>
	DELETE = <FontAwesomeIcon icon={faTrash}/>
	DRONE = <DroneIcon/>
	ENVELOPE = <FontAwesomeIcon icon={faEnvelope}/>
	EXPAND = <FontAwesomeIcon icon={faAngleDown}/>
	GROUP = <FontAwesomeIcon icon={faUsers}/>
	GROUP_ADD = <FontAwesomeIcon icon={faPlus}/>
	HELICOPTER = <FontAwesomeIcon icon={faHelicopter}/>
	HOME = <FontAwesomeIcon icon={faHome}/>
	INVITE = <FontAwesomeIcon icon={faPlus}/>
	KEY = <FontAwesomeIcon icon={faKey}/>
	MEMBER = <FontAwesomeIcon icon={faUserAlt}/>
	MEMBERSHIP = <FontAwesomeIcon icon={faUserAlt}/>
	NO_RESULT = <FontAwesomeIcon icon={faBan}/>
	OBSERVER = <FontAwesomeIcon icon={faBinoculars}/>
	OWNER = <FontAwesomeIcon icon={faKey}/>
	PILOT = <FontAwesomeIcon icon={faUserAlt}/>
	PLANE = <FontAwesomeIcon icon={faPlane}/>
	REVOKE = <FontAwesomeIcon icon={faBan}/>
	SEND = <FontAwesomeIcon icon={faAngleDoubleRight}/>
	UNKNOWN = <FontAwesomeIcon icon={faQuestion}/>
	USER = <FontAwesomeIcon icon={faUserAlt}/>
	WAIT = <FontAwesomeIcon icon={faSpinner}/>

	private aircraftTypeIcons = {
		fixedwing: this.PLANE,
		helicopter: this.HELICOPTER,
		multirotor: this.DRONE,
		other: this.DRONE
	}

	private userFlightRoleIcons = {
		pilot: this.PILOT,
		observer: this.OBSERVER,
		owner: this.OWNER,
		other: this.UNKNOWN
	}

	private groupTypeIcons = {
		club: this.CLUB,
		company: this.COMPANY,
		group: this.GROUP,
	}

	private aircraftStatusIcons = {
		preflight: this.PLANE,
		airworthy: this.PLANE,
		inoperative: this.AIRCRAFT_DESTROYED,
		decommissioned: this.AIRCRAFT_DESTROYED,
		destroyed: this.AIRCRAFT_DESTROYED
	}

	private batteryStatusIcons = {
		new: this.BATTERY,
		available: this.BATTERY,
		destroyed: this.BATTERY_DESTROYED
	}

	fromAircraftType(type) {
		let icon = instance.aircraftTypeIcons[type]
		if (!icon) icon = instance.PLANE
		return icon
	}

	fromUserFlightRole(role) {
		let icon = instance.userFlightRoleIcons[role]
		if (!icon) icon = instance.PLANE
		return icon
	}

	fromGroupType(type) {
		let icon = instance.groupTypeIcons[type]
		if (!icon) icon = instance.GROUP
		return icon
	}

	fromAircraftStatus(status) {
		let icon = instance.aircraftStatusIcons[status]
		if (!icon) icon = instance.PLANE
		return icon
	}

	fromAircraftTypeAndStatus(type, status) {
		if (status === 'airworthy' || status === 'preflight') {
			return this.fromAircraftType(type)
		} else {
			return this.fromAircraftStatus(status);
		}
	}

	fromBatteryStatus(status) {
		let icon = instance.batteryStatusIcons[status]
		if (!icon) icon = instance.BATTERY
		return icon
	}

	fromBatteryStatusAndLife(status, life) {
		if (status === "destroyed") {
			return this.fromBatteryStatus(status)
		} else {
			if (life > 80) return this.BATTERY_FULL;
			if (life > 60) return this.BATTERY_THREE_QUARTER;
			if (life > 40) return this.BATTERY_HALF;
			if (life > 20) return this.BATTERY_QUARTER;
			return this.BATTERY_EMPTY;
		}
	}
}

const instance = new Icons()
Object.freeze(instance)
export default instance
