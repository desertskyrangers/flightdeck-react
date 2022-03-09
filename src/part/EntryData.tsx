import React from "react"

export default function EntryData(props) {

	const isRequired: boolean = props.required
	const help: string = !props.help ? '' : '(' + props.help + ')'
	const text: string = props.text + (isRequired ? ' *' : '')

	return (
		<div>
			{
				!!props.text ?
					<div className='page-label-row'>
						<label htmlFor={props.id} className='page-label'>{text}</label>
						<span className='icon' onClick={props.onIconClick}>{props.icon}</span>
						{props.labelActionIcon ? <span className='icon page-label-action-button' onClick={props.onLabelAction}>{props.labelActionIcon}</span> : null}
					</div> : null
			}
			{
				!!help ?
					<div>
						<label className='page-label'>{help}</label>
					</div> : null
			}
			<div className='hbox'>
				<span className='page-field'>{props.value}</span>
				{props.fieldActionIcon ? <button className='icon page-field-action-button' title={props.fieldActionTitle} onClick={props.onFieldAction}>{props.fieldActionIcon}</button> : null}
			</div>
		</div>
	)

}
