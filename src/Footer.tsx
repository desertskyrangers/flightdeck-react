import React from "react";
import CopyrightNotice from "./part/CopyrightNotice";
import AppPath from "./AppPath";
import {Link} from "react-router";

export default function Footer(props) {

	const year = new Date().getFullYear()

	return (
		<div className='footer'>
			<div className='copyright'><Link to={AppPath.LEGAL}><CopyrightNotice year={year}/></Link></div>
			<div className='tag-line'><Link to={AppPath.ABOUT}>v{props.version}</Link></div>
		</div>
	)

}
