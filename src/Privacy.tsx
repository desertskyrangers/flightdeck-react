import React from "react";
import Icons from "./util/Icons";
import {useNavigate} from "react-router";

export default function Privacy() {
	const navigate = useNavigate();

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='page-header-row'>
						<h1>Privacy Policy</h1>
						<span className='icon' onClick={() => navigate(-1)}>{Icons.CLOSE}</span>
					</div>

					<div>
						Collection of personal information (name, email, phone number, etc.)
						is for the express purpose to support FlightDeck members. Personal
						information is not released to any other group or entity for any
						purpose except if legally required.
					</div>

				</div>
			</div>
		</div>
	)

}
