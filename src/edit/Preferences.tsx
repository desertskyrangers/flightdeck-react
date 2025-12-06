import React, {useEffect, useState} from "react";
import Icons from "../util/Icons";
import {useNavigate} from "react-router";
import EntryCheck from "../part/EntryCheck";
import AppPath from "../AppPath";
import UserService from "../api/UserService";
import TokenService from "../api/TokenService";
import Notice from "../part/Notice";
import AppConfig from "../AppConfig";
import EntryLink from "../part/EntryLink";

export default function Preferences(props) {
	const navigate = useNavigate();

	const [preferences, setPreferences] = useState(props.preferences || {
		showObserverStats: false,
		showAircraftStats: false,
		showAllAircraft: false,
		enablePublicDashboard: false,
		showPublicObserverStats: false,
		showPublicAircraftStats: false,
		showPublicAllAircraft: false,
		flightListView: 'week',
		showObserverFlights: false,
		showOwnerFlights: false
	})

	const [messages, setMessages] = useState(props.messages || [])

	function close() {
		navigate(AppPath.USER)
	}

	function clearMessages() {
		setMessages([])
	}

	function loadPreferences() {
		UserService.getPreferences((success) => {
			setPreferences(p => {
				return {...p, ...success.data}
			})
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function updatePreference(name: string, value: Object) {
		UserService.setPreferences(TokenService.getUserId(), {...preferences, ...{[name]: value}}, (success) => {
			setPreferences({...preferences, ...success.data})
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function copyToClipboard(content: string) {
		return navigator.clipboard.writeText(content)
	}

	function share(content: string, title: string, text: string) {
		if (navigator.share) {
			const shareDetails = {url: content, title: title, text: text};
			console.log("Share")
			return navigator.share(shareDetails)
		} else {
			console.log("Copy to clipboard")
			return copyToClipboard(content)
		}
	}

	useEffect(loadPreferences, [])

	const dashboardIdUrl = AppConfig.APP_URL + AppPath.DASHBOARD + "/" + TokenService.getUserId()
	const dashboardUsernameUrl = AppConfig.APP_URL + AppPath.DASHBOARD + "/" + preferences.username

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='hbox'><button className='icon' onClick={close}>{Icons.BACK}</button><span className='page-header'>Preferences</span></div>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>

					<PreferenceSection preferences={preferences} title='Private Dashboard'>
						<EntryCheck
							id='show-observer-stats'
							text='Show observer statistics'
							checked={preferences.showObserverStats}
							onChange={() => {
								updatePreference('showObserverStats', !preferences.showObserverStats)
							}}
						/>
						<EntryCheck
							id='show-aircraft-stats'
							text='Show aircraft statistics'
							checked={preferences.showAircraftStats}
							onChange={() => {
								updatePreference('showAircraftStats', !preferences.showAircraftStats)
							}}
						/>
						<EntryCheck
							id='show-all-aircraft'
							text='Show all aircraft'
							checked={preferences.showAllAircraft}
							onChange={() => {
								updatePreference('showAllAircraft', !preferences.showAllAircraft)
							}}
						/>
					</PreferenceSection>
					<PreferenceSection preferences={preferences} title='Public Dashboard'>
						<EntryCheck
							id='enable-public-dashboard'
							text='Enable public dashboard'
							checked={preferences.enablePublicDashboard}
							onChange={() => {
								updatePreference('enablePublicDashboard', !preferences.enablePublicDashboard)
							}}
						/>
						{preferences.enablePublicDashboard ? <EntryLink to={dashboardUsernameUrl} value='Friendly Link' fieldActionIcon={Icons.SHARE} fieldActionTitle='Copy Link' onFieldAction={() => {
							share(dashboardUsernameUrl, "FlightDeck Dashboard", "FlightDeck Dashboard")
						}}/> : null}
						{preferences.enablePublicDashboard ? <EntryLink to={dashboardIdUrl} value='Forever Link' fieldActionIcon={Icons.SHARE} fieldActionTitle='Copy Link' onFieldAction={() => {
							share(dashboardIdUrl, "FlightDeck Dashboard", "FlightDeck Dashboard")
						}}/> : null}
						<EntryCheck
							id='show-public-observer-stats'
							text='Show observer statistics'
							checked={preferences.showPublicObserverStats}
							onChange={() => {
								updatePreference('showPublicObserverStats', !preferences.showPublicObserverStats)
							}}
						/>
						<EntryCheck
							id='show-public-aircraft-stats'
							text='Show aircraft statistics'
							checked={preferences.showPublicAircraftStats}
							onChange={() => {
								updatePreference('showPublicAircraftStats', !preferences.showPublicAircraftStats)
							}}
						/>
						<EntryCheck
							id='show-public-all-aircraft'
							text='Show all aircraft'
							checked={preferences.showPublicAllAircraft}
							onChange={() => {
								updatePreference('showPublicAllAircraft', !preferences.showPublicAllAircraft)
							}}
						/>
					</PreferenceSection>
					<PreferenceSection preferences={preferences} title='Flights'>
						<EntryCheck
							id='show-observer-flights'
							text='Show observer flights'
							checked={preferences.showObserverFlights}
							onChange={() => {
								updatePreference('showObserverFlights', !preferences.showObserverFlights)
							}}
						/>
						<EntryCheck
							id='show-owner-flights'
							text='Show owner flights'
							checked={preferences.showOwnerFlights}
							onChange={() => {
								updatePreference('showOwnerFlights', !preferences.showOwnerFlights)
							}}
						/>
					</PreferenceSection>
				</div>
			</div>
		</div>
	)

}

function PreferenceSection(props) {

	const [expanded, setExpanded] = useState(props.expanded || false)

	return (
		<div className={'vbox'}>
			<div className={'page-section'} onClick={() => setExpanded(!expanded)}>
				<div className='page-header'>{props.title}</div>
				<span className='icon'>{expanded ? Icons.COLLAPSE : Icons.EXPAND}</span>
			</div>
			{expanded ? props.children : null}
		</div>
	)

}
