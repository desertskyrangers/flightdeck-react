import React from "react";
import Icons from "./util/Icons";
import {useNavigate} from "react-router";

export default function Legal() {
	const navigate = useNavigate();

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='page-header-row'>
						<h1>Copyright</h1>
						<span className='icon' onClick={() => navigate(-1)}>{Icons.CLOSE}</span>
					</div>

					<div>
						All content on this website is under copyright protection unless
						otherwise specified. Linking to this website is permitted. Some
						content on the website is under copyright protection by a separate
						owner. Such ownership is noted below.
					</div>

					<div>
						<dl>
							<dt>&copy; Fonticons, Inc.</dt>
							<dd><a href='https://fontawesome.com/'>Font Awesome free icons</a></dd>
						</dl>
						<dl>
							<dt>&copy; 2014 Uri Herrera and others, KDE Visual Design Group; via Wikimedia Commons</dt>
							<dd><a href="https://commons.wikimedia.org/wiki/File:Breezeicons-devices-22-uav-quadcopter.svg">Breezeicons-devices-22-uav-quadcopter.svg</a></dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	)

}
