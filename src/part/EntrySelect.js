import React from "react";

export default function EntrySelect(props) {

	const isRequired = props.required
	const help = !props.help ? '' : '(' + props.help + ')'
	const text = props.text + (isRequired ? ' *' : '') + ' ' + help

	return (
		<div>
			<div className='page-label-row'>
				<label htmlFor={props.id} className='page-label'>{text}</label>
				{props.labelActionIcon ? <span className='icon page-label-action-button' onClick={props.onLabelAction}>{props.labelActionIcon}</span> : null}
			</div>
			<div className='hbox'>
				<select id={props.id} name={props.id} value={props.value} className='page-field' onChange={props.onChange} onKeyDown={props.onKeyDown}>
					{props.children}
				</select>
				{props.fieldActionIcon ? <button className='icon-button page-field-action-button' onClick={props.onFieldAction}>{props.fieldActionIcon}</button> : null}
			</div>
		</div>
	)

}
