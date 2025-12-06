import './css/app.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router';
import TokenService from "./api/TokenService";
import ApiPath from "./AppPath";
import AppPath from "./AppPath";

import Footer from "./Footer";
import Legal from "./Legal";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";
import NotFound from "./part/NotFound";
import FlightActions from "./action/FlightActions";
import SetupActions from "./action/SetupActions";
import UserActions from "./action/UserActions";
import Profile from "./edit/Profile";
import Menu from "./Menu";
import UserAircraft from "./UserAircraft";
import UserBatteries from "./UserBatteries";
import UserFlights from "./UserFlights"
import Aircraft from "./edit/Aircraft";
import About from "./About";
import React, {useEffect, useState} from "react";
import AppService from "./api/AppService";
import Flight from "./edit/Flight";
import Battery from "./edit/Battery";
import FlightTimer from "./FlightTimer";
import Recover from "./Recover";
import Reset from "./Reset";
import Password from "./edit/Password";
import UserGroups from "./UserGroups";
import Group from "./edit/Group";
import Location from "./edit/Location";
import Preferences from "./edit/Preferences";
import PublicDashboard from "./PublicDashboard";
import Dashboards from "./Dashboards";
import DataExport from "./DataExport";
import UserLocations from "./UserLocations";

const manifest = require('./manifest.json')

function Protect({children}) {
	return TokenService.isAuthenticated() ? <div><Menu/>{children}</div> : <Navigate to={ApiPath.LOGIN}/>;
}

function App() {

	const [appVersion, setAppVersion] = useState()
	const [apiVersion, setApiVersion] = useState()

	useEffect(() => loadAppInformation(), [])
	useEffect(() => loadApiInformation(), [])

	function loadAppInformation() {
		setAppVersion(manifest.version)
	}

	function loadApiInformation() {
		AppService.getProgramInformation((result) => {
			setApiVersion(result.version)
		}, () => {
		})
	}

	return (

		<div className="app">
			<Router>
				<div className='content'>
					<Routes>
						{/* Public */}
						<Route path={AppPath.ABOUT} element={<About appVersion={appVersion} apiVersion={apiVersion}/>}/>
						<Route path={AppPath.DASHBOARD + "/:id"} element={<PublicDashboard/>}/>
						<Route path={AppPath.LEGAL} element={<Legal/>}/>
						<Route path={AppPath.LOGIN} element={<Login version={apiVersion}/>}/>
						<Route path={AppPath.PRIVACY} element={<About version={apiVersion}/>}/>
						<Route path={AppPath.RECOVER} element={<Recover/>}/>
						<Route path={AppPath.REGISTER} element={<Register/>}/>
						<Route path={AppPath.RESET} element={<Reset/>}/>
						<Route path={AppPath.VERIFY + "/:id"} element={<Verify/>}/>
						<Route path={AppPath.VERIFY + "/:id/:code"} element={<Verify/>}/>

						{/* Home */}
						<Route path={AppPath.HOME} element={<Protect children={<Dashboards/>}/>}/>

						{/* Menus */}
						<Route path={AppPath.FLIGHTS} element={<Protect children={<FlightActions/>}/>}/>
						<Route path={AppPath.SETUP} element={<Protect children={<SetupActions/>}/>}/>
						<Route path={AppPath.USER} element={<Protect children={<UserActions/>}/>}/>

						{/* Entry */}
						<Route path={AppPath.AIRCRAFT + "/:id"} element={<Protect children={<Aircraft/>}/>}/>
						<Route path={AppPath.BATTERY + "/:id"} element={<Protect children={<Battery/>}/>}/>
						<Route path={AppPath.EXPORT} element={<Protect children={<DataExport/>}/>}/>
						<Route path={AppPath.FLIGHT + "/:id"} element={<Protect children={<Flight/>}/>}/>
						<Route path={AppPath.FLIGHT_TIMER} element={<Protect children={<FlightTimer/>}/>}/>
						<Route path={AppPath.FLIGHT + "/:id/:timestamp/:duration"} element={<Protect children={<Flight/>}/>}/>
						<Route path={AppPath.GROUP + "/:id"} element={<Protect children={<Group/>}/>}/>
						<Route path={AppPath.LOCATION + "/:id"} element={<Protect children={<Location/>}/>}/>
						<Route path={AppPath.PASSWORD} element={<Protect children={<Password/>}/>}/>
						<Route path={AppPath.PREFERENCES} element={<Protect children={<Preferences/>}/>}/>
						<Route path={AppPath.PROFILE} element={<Protect children={<Profile/>}/>}/>
						<Route path={AppPath.SECURITY} element={<Protect children={<Password/>}/>}/>
						{/*<Route path={AppPath.ORG + "/:id"} element={<Protect children={<Org/>}/>}/>*/}
						<Route path={AppPath.USER_AIRCRAFT} element={<Protect children={<UserAircraft/>}/>}/>
						<Route path={AppPath.USER_BATTERIES} element={<Protect children={<UserBatteries/>}/>}/>
						<Route path={AppPath.USER_LOCATIONS} element={<Protect children={<UserLocations/>}/>}/>
						<Route path={AppPath.USER_FLIGHTS} element={<Protect children={<UserFlights/>}/>}/>
						<Route path={AppPath.USER_GROUPS} element={<Protect children={<UserGroups/>}/>}/>

						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</div>
				<Footer version={apiVersion}/>
			</Router>
		</div>
	)

}

export default App
