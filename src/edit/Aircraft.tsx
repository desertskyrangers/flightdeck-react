import "../css/metrics.css"
import Notice from "../part/Notice";
import React, {useEffect, useRef, useState} from "react";
import LookupService from "../api/LookupService";
import {useNavigate, useParams} from "react-router";
import AircraftService from "../api/AircraftService";
import Icons from "../util/Icons";
import EntryField from "../part/EntryField";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import EntrySelect from "../part/EntrySelect";
import EntryCheck from "../part/EntryCheck";
import {Option} from "./Option";
import EntryColor from "../part/EntryColor";

export function calcAspectRatio(wingspan, wingarea) {
	return (wingspan * wingspan) / (wingarea * 100)
}

export function calcMeanAirfoilChord(wingspan, wingarea) {
	return (wingarea * 100) / wingspan;
}

export function calcWingLoading(weight, wingarea) {
	// Weight must be in grams
	// Wingarea must be in cmsq
	return weight / wingarea
}

export function calcWingCubeLoading(weight, wingarea) {
	// Weight must be in grams
	// Wingarea must be in cmsq
	return weight / Math.pow(wingarea/100, 1.5)
}

export default function Aircraft(props) {
	const navigate = useNavigate();

	const [advanced, setAdvanced] = useState<boolean>(props.advanced || false)

	const [id, setId] = useState<string>(props.id || '')
	const [name, setName] = useState<string>(props.name || '')
	const [type, setType] = useState<string>(props.type || '')
	const [make, setMake] = useState<string>(props.make || '')
	const [model, setModel] = useState<string>(props.model || '')
	const [status, setStatus] = useState<string>(props.status || '')
	const [wingspan, setWingspan] = useState<number>(props.wingspan || '')
	const [length, setLength] = useState<number>(props.length || '')
	const [wingarea, setWingarea] = useState<number>(props.wingarea || '')
	const [weight, setWeight] = useState<number>(props.weight || '')
	const [nightLights, setNightLights] = useState<boolean>(props.nightLights || false)
	const [baseColor, setBaseColor] = useState<string>(props.baseColor || '')
	const [trimColor, setTrimColor] = useState<string>(props.trimColor || '')

	// Derived
	const [wingAspect, setWingAspect] = useState<number>(props.wingAspect || '')
	const [wingMac, setWingMac] = useState<number>(props.wingMac || '');
	const [wingLoading, setWingLoading] = useState<number>(props.wingLoading || '');
	const [wingCubeLoading, setWingCubeLoading] = useState<number>(props.wingCubeLoading || '');

	// Messages
	const [notices, setNotices] = useState([])
	const [messages, setMessages] = useState([])

	// Options
	const [statusOptions, setStatusOptions] = useState<Array<Option>>([{'id': '', 'name': ''}])
	const [typeOptions, setTypeOptions] = useState<Array<Option>>([{'id': '', 'name': ''}])
	const [requestDelete, setRequestDelete] = useState<boolean>(false)

	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')

	function update() {
		AircraftService.updateAircraft({
			id: idRef.current,
			name,
			type,
			make,
			model,
			status,
			wingspan,
			length,
			wingarea,
			weight,
			nightLights,
			baseColor,
			trimColor
		}, () => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
	}

	function toggleAdvanced() {
		setAdvanced(!advanced)
	}

	function loadAircraft() {
		if (isNewRef.current) {
			setAdvanced(true)
			return
		}
		AircraftService.getAircraft(idRef.current, (aircraft) => {
			setId(aircraft.id)
			setName(aircraft.name)
			setType(aircraft.type)
			setMake(aircraft.make || '')
			setModel(aircraft.model || '')
			setStatus(aircraft.status)
			setWingspan(aircraft.wingspan)
			setLength(aircraft.length)
			setWingarea(aircraft.wingarea)
			setWeight(aircraft.weight)
			setNightLights(aircraft.nightLights || '')
			setBaseColor(aircraft.baseColor || '')
			setTrimColor(aircraft.trimColor || '')
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftStatusOptions() {
		LookupService.getAircraftStatuses((success) => {
			setStatusOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftTypeOptions() {
		LookupService.getAircraftTypes((success) => {
			setTypeOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function doDelete() {
		AircraftService.deleteAircraft(id, () => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function verifyWeight(weight) {
		let notices = []
		if (weight > 250) notices = ['Recreational flyers must add manufacturer and model information for all UAS over 250 grams (0.55 pounds) that they own and operate']
		setNotices(notices)
	}

	useEffect(() => verifyWeight(weight), [weight])

	useEffect(() => setWingAspect(calcAspectRatio(wingspan, wingarea)), [wingspan, wingarea])
	useEffect(() => setWingMac(calcMeanAirfoilChord(wingspan, wingarea)), [wingspan, wingarea])
	useEffect(() => setWingLoading(calcWingLoading(weight, wingarea)), [weight, wingarea])
	useEffect(() => setWingCubeLoading(calcWingCubeLoading(weight, wingarea)), [weight, wingarea])

	useEffect(() => loadAircraftStatusOptions(), [])
	useEffect(() => loadAircraftTypeOptions(), [])
	useEffect(() => loadAircraft(), [])

	function wrapSetBaseColor(color) {
		console.log("Base color=" + JSON.stringify(color))
		setBaseColor(color)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='hbox'>
						<button className='icon' onClick={close}>{Icons.BACK}</button>
						<span className='page-header'>{name}</span></div>

					{/* Aircraft information */}
					<div className='vbox'>
						<table className='metrics'>
							<tbody>
							{!!type ? <DataRow label='Type:' data={(typeOptions.find(o => o.id === type) || {'name': ''}).name}/> : null}
							{!!status ? <DataRow label='Status:' data={(statusOptions.find(o => o.id === status) || {'name': ''}).name}/> : null}
							{!!make ? <DataRow label='Manufacturer:' data={make}/> : null}
							{!!model ? <DataRow label='Model:' data={model}/> : null}
							{!!wingspan ? <MetricRow label='Wing Span:' metric={wingspan} unit='mm'/> : null}
							{!!length ? <MetricRow label='Length:' metric={length} unit='mm'/> : null}
							{!!wingarea ? <MetricRow label='Wing Area::' metric={wingarea} unit='cm²'/> : null}
							{!!weight ? <MetricRow label='Weight:' metric={weight} unit='g'/> : null}
							{!!wingAspect ? <MetricRow label='Aspect Ratio:' metric={wingAspect} unit='' decimal={1}/> : null}
							{!!wingMac ? <MetricRow label='Wing MAC:' metric={wingMac} unit='mm' decimal={1}/> : null}
							{!!wingLoading ? <MetricRow label='Wing² Loading:' metric={wingLoading} unit='g/cm²' decimal={2}/> : null}
							{!!wingCubeLoading ? <MetricRow label='Wing³ Loading:' metric={wingCubeLoading} unit='g/dm³' decimal={2}/> : null}
							{!!nightLights ? <DataRow label='Night flying lights:' data={nightLights ? "yes" : "no"}/> : null}
							{!!baseColor ? <ColorRow label='Base color:' color={baseColor}/> : null}
							{!!trimColor ? <ColorRow label='Trim color:' color={trimColor}/> : null}
							</tbody>
						</table>
						<Notice priority='warn' messages={notices}/>
					</div>

					<button className='icon centered' onClick={toggleAdvanced}>{advanced ? Icons.COLLAPSE : Icons.ADVANCED_V}</button>

					{
						advanced ? <div className='vbox'>
							<EntryField id='name' text='Name' type='text' value={name} required={true} autoFocus='autofocus' onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown}/>

							<EntrySelect id='type' name='type' text='Type' value={type} required={true} onChange={(event) => setType(event.target.value)}>
								<option key='unspecified' hidden>Select a type</option>
								{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
							</EntrySelect>

							<EntrySelect id='status' name='status' text='Status' value={status} required={true} onChange={(event) => setStatus(event.target.value)}>
								<option key='unspecified' hidden>Select a status</option>
								{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
							</EntrySelect>

							<EntryField id='make' text='Manufacturer or Designer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>

							<EntryField id='wingspan' text='Wing Span (mm)' type='text' value={wingspan} onChange={(event) => setWingspan(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='length' text='Length (mm)' type='text' value={length} onChange={(event) => setLength(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='wingarea' text='Wing Area (cm²)' type='text' value={wingarea} onChange={(event) => setWingarea(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='weight' text='Weight (g)' type='text' value={weight} onChange={(event) => setWeight(event.target.value)} onKeyDown={onKeyDown}/>

							<EntryColor id='baseColor' text='Base Color' value={baseColor} onChange={(event) => wrapSetBaseColor(event.target.value)}/>
							<EntryColor id='trimColor' text='Trim Color' value={trimColor} onChange={(event) => setTrimColor(event.target.value)}/>

							<EntryCheck id='nightlights' text='Lights for night flying' checked={nightLights} onChange={() => setNightLights(!nightLights)}/>

							{/* Advanced properties
							* motor radius (mm)
							* motor length (cm)
							* motor kv
							* motor max watts
							*/}

							<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
							<div className='hbox'>
								{isNewRef.current ? null : <button className='icon' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE : Icons.DELETE}</button>}
								{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
							</div>

							{requestDelete ? <DeleteWithConfirm entity='name of the aircraft' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

						</div> : null
					}

				</div>
			</div>
		</div>
	)

}

function ColorRow(props) {

	return (
		<tr>
			<td>{props.label}</td>
			<td colSpan={2} style={{backgroundColor: props.color}}></td>
		</tr>
	)
}

function DataRow(props) {

	return (
		<tr>
			<td>{props.label}</td>
			<td colSpan={2}>{props.data}</td>
		</tr>
	)
}

function MetricRow(props) {
	return (
		<tr>
			<td>{props.label}</td>
			<td>{parseFloat(props.metric).toFixed(!!props.decimal ? props.decimal : 0)}</td>
			<td>{props.unit}</td>
		</tr>
	)
}
