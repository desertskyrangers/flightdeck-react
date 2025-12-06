import {useNavigate, useParams} from "react-router";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import BatteryService from "../api/BatteryService";
import LookupService from "../api/LookupService";
import EntryField from "../part/EntryField";
import Icons from "../util/Icons";
import Notice from "../part/Notice";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import EntrySelect from "../part/EntrySelect";
import AppConfig from "../AppConfig";
import {isEqual} from "lodash";
import Batteries from "../util/Batteries";

export function calcVoltage(type, cells) {
	return Batteries.voltsPerCell(type) * cells;
}

export function calcPower(capacity, volts) {
	return capacity / 1000 * volts;
}

export function calcLife(cycles) {
	return 1 - (cycles / Batteries.EXPECTED_LIFETIME_CYCLES);
}

export default function Battery(props) {

	const navigate = useNavigate();

	const [advanced, setAdvanced] = useState(props.advanced || false)

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [status, setStatus] = useState(props.status || '')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [connector, setConnector] = useState(props.connector || 'unlisted')
	const [unlistedConnector, setUnlistedConnector] = useState(props.unlistedConnector || '')
	const [type, setType] = useState(props.type || '')
	const [cells, setCells] = useState(props.cells || '')
	const [cycles, setCycles] = useState(props.cycles || '')
	const [capacity, setCapacity] = useState(props.capacity || '')
	const [dischargeRating, setDischargeRating] = useState(props.dischargeRating || '')

	// Derived
	const [voltage, setVoltage] = useState(props.voltage || '')
	const [power, setPower] = useState(props.power || '')
	const [life, setLife] = useState(props.life || '')

	// Messages
	const [messages, setMessages] = useState([])

	// Options
	const [connectorOptions, setConnectorOptions] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	const [canSave, setCanSave] = useState(false)

	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')
	const previousMessages = useRef(messages)

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function toggleAdvanced() {
		setAdvanced(!advanced)
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function clearMessages() {
		setMessages([])
	}

	function loadBatteryConnectorOptions() {
		LookupService.getBatteryConnectors((result) => {
			setConnectorOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBatteryStatusOptions() {
		LookupService.getBatteryStatuses((result) => {
			setStatusOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBatteryTypeOptions() {
		LookupService.getBatteryTypes((result) => {
			setTypeOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBattery() {
		if (isNewRef.current) {
			setAdvanced(true)
			return
		}
		BatteryService.getBattery(idRef.current, (result) => {
			setId(result.battery.id)
			setName(result.battery.name || '')
			setType(result.battery.type || '')
			setMake(result.battery.make || '')
			setModel(result.battery.model || '')
			setConnector(result.battery.connector || '')
			setUnlistedConnector(result.battery.unlistedConnector || '')
			setStatus(result.battery.status || '')
			setCells(result.battery.cells || '')
			setCycles(result.battery.cycles || '')
			setCapacity(result.battery.capacity || '')
			setDischargeRating(result.battery.dischargeRating || '')
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function update() {
		BatteryService.updateBattery({
			id: idRef.current,
			name: name,
			type: type,
			make: make,
			model: model,
			connector: connector,
			unlistedConnector: unlistedConnector,
			status: status,
			cells: cells,
			cycles: cycles,
			capacity: capacity,
			dischargeRating: dischargeRating
		}, (success) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function doDelete() {
		BatteryService.deleteBattery(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useLayoutEffect(() => {
		const validCells = cells === '' || String(cells).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null
		const validCycles = cycles === '' || String(cycles).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null
		const validCapacity = capacity === '' || String(capacity).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null
		const validDischargeRating = dischargeRating === '' || String(dischargeRating).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null

		let messages = [];
		if (!validCells) messages.push('Invalid cells')
		if (!validCycles) messages.push('Invalid cycles')
		if (!validCapacity) messages.push('Invalid capacity')
		if (!validDischargeRating) messages.push('Invalid discharge rating')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages

		setCanSave(validCells && validCycles && validCapacity && validDischargeRating)
	}, [cells, cycles, capacity, dischargeRating])

	useEffect(() => setVoltage(calcVoltage(type, cells)), [type, cells])
	useEffect(() => setPower(calcPower(capacity, voltage)), [capacity, voltage])
	useEffect(() => setLife(calcLife(cycles)), [cycles])

	useEffect(() => loadBatteryConnectorOptions(), [])
	useEffect(() => loadBatteryStatusOptions(), [])
	useEffect(() => loadBatteryTypeOptions(), [])
	useEffect(() => loadBattery(), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<div className='hbox'><button className='icon' onClick={close}>{Icons.BACK}</button><span className='page-header'>{name}</span></div>

					{/* Aircraft information */}
					<div className='vbox'>
						<table className='metrics'>
							<tbody>
							{!!status ? <DataRow label='Status:' data={(statusOptions.find(o => o.id === status) || {'name': ''}).name}/> : null}
							{!!make ? <DataRow label='Manufacturer:' data={make}/> : null}
							{!!model ? <DataRow label='Model:' data={model}/> : null}
							{!!type ? <DataRow label='Type:' data={(typeOptions.find(o => o.id === type) || {'name': ''}).name}/> : null}
							{!!cells ? <DataRow label='Cells:' data={cells}/> : null}
							{!!cycles ? <DataRow label='Cycles:' data={cycles}/> : null}
							{!!dischargeRating ? <DataRow label='Discharge Rating(C):' data={dischargeRating}/> : null}
							{!!connector ? <DataRow label='Connector:' data={(connectorOptions.find(o => o.id === connector) || {'name': ''}).name}/> : null}

							{!!capacity ? <MetricRow label='Capacity:' metric={capacity} unit='mAh'/> : null}
							{!!voltage ? <MetricRow label='Voltage:' metric={voltage} unit='V' decimal={1}/> : null}
							{!!power ? <MetricRow label='Power:' metric={power} unit='Wh' decimal={1}/> : null}
							{!!life ? <MetricRow label='Life Remaining:' metric={life * 100} unit='%'/> : null}
							</tbody>
						</table>
					</div>

					<button className='icon centered' onClick={toggleAdvanced}>{advanced ? Icons.COLLAPSE : Icons.ADVANCED_V}</button>

					{
						advanced ? <div className='vbox'>
							<EntryField id='name' text='Name' type='text' required={true} autoFocus='autofocus' value={name} onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown}/>
							<EntrySelect id='status' text='Status' value={status} required={true} onChange={(event) => setStatus(event.target.value)}>
								<option key='unspecified' hidden>Select a status</option>
								{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
							</EntrySelect>
							<EntryField id='make' text='Manufacturer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>
							<EntrySelect id='connector' text='Connector' value={connector} onChange={(event) => setConnector(event.target.value)}>
								{connectorOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
							</EntrySelect>
							{connector === 'unlisted' ?
								<EntryField id='unlistedConnector' text='Unlisted Connector' type='text' value={unlistedConnector} onChange={(event) => setUnlistedConnector(event.target.value)}/> : null}

							<EntrySelect id='type' text='Type' value={type} onChange={(event) => setType(event.target.value)}>
								<option key='unspecified' hidden>Select a type</option>
								{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
							</EntrySelect>
							<EntryField id='capacity' text='Capacity (mAh)' type='text' value={capacity} onChange={(event) => setCapacity(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='cells' text='Cells' type='text' value={cells} onChange={(event) => setCells(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='cycles' text='Cycles' type='text' value={cycles} onChange={(event) => setCycles(event.target.value)} onKeyDown={onKeyDown}/>
							<EntryField id='dischargeRating' text='Discharge Rating (C)' type='text' value={dischargeRating} onChange={(event) => setDischargeRating(event.target.value)} onKeyDown={onKeyDown}/>

							<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
							<div className='hbox'>
								{isNewRef.current ? null : <button className='icon' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE : Icons.DELETE}</button>}
								{requestDelete ? null : <button disabled={!canSave} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
							</div>

							{requestDelete ? <DeleteWithConfirm entity='name of the battery' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}
						</div> : null
					}
				</div>
			</div>
		</div>
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
