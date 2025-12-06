import React from "react";
import {useNavigate} from "react-router";
import Icons from "./util/Icons";

export default function About(props) {
	const navigate = useNavigate();

	function close() {
		navigate(-1)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<div>
						<div className='hbox'><button className='icon' onClick={close}>{Icons.BACK}</button><h1>About</h1></div>
						<div><span className='page-label'>app version</span> {props.appVersion}</div>
						<div><span className='page-label'>api version</span> {props.apiVersion}</div>
						<hr/>
						<div>
							<span className='page-label'>hosted by</span> <a href='https://www.desertskyrangers.org/'>Desert Sky Rangers</a><br/>
							<span className='page-label'>written by</span> Mark Soderquist
						</div>
						<hr/>
						<div>
							<a href='https://github.com/desertskyrangers/flightdeck/issues/new'>Submit an enhancement request</a><br/>
							<a href='https://github.com/desertskyrangers/flightdeck/issues/new'>Submit a bug report</a>
						</div>
					</div>
					<div>
						<h1>Privacy Policy</h1>
						<p>
							Collection of personal information (name, email, phone number, etc.)
							is for the express purpose to support FlightDeck members. Personal
							information is not released to any other group or entity for any
							purpose except if legally required.
						</p>
					</div>

				</div>
			</div>
		</div>
	)
}
