import React, {useState} from "react";
import {useNavigate} from "react-router";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import EntrySelect from "./part/EntrySelect";

export default function DataExport(props) {

	const navigate = useNavigate()

	const [messages, setMessages] = useState([])
	const [type, setType] = useState(props.type || '')

	function close() {
		navigate(-1)
	}

	function clearMessages() {
		setMessages([])
	}

	function exportData() {
		setMessages(['Export not supported yet'])
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='hbox'>
						<button className='icon' onClick={close}>{Icons.BACK}</button>
						<span className='page-header'>Data Export</span>
					</div>

					{/* What type of data (flights, aircraft, batteries, etc.) */}

					<EntrySelect id='type' name='type' text='Type' value={type} required={true} onChange={(event) => setType(event.target.value)}>
						<option key='flights' value='flights'>Flights</option>
						<option key='aircraft' value='aircraft'>Aircraft</option>
						<option key='batteries' value='batteries'>Batteries</option>
					</EntrySelect>

					{/* Data ranges (dates for flights, status for aircraft, etc.*/}

					{/* Export button */}
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={messages.length > 0} className='page-submit' onClick={exportData}>Export</button>

				</div>
			</div>
		</div>
	)

}
