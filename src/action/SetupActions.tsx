import React from "react";
import AppPath from "../AppPath";
import {useNavigate} from "react-router";

export default function SetupActions(props) {
	const navigate = useNavigate();

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-action' onClick={() => navigate(AppPath.USER_AIRCRAFT)}>Aircraft</button>
					<button className='page-action' onClick={() => navigate(AppPath.USER_BATTERIES)}>Batteries</button>
					<button className='page-action' onClick={() => navigate(AppPath.USER_LOCATIONS)}>Locations</button>
					<button className='page-action' onClick={() => navigate(AppPath.USER_GROUPS)}>Groups</button>
				</div>
			</div>
		</div>
	)

}
