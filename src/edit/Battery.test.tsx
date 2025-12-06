import React from "react"
import {render, screen} from "@testing-library/react"
import {MemoryRouter as Router, Route, Routes} from "react-router"
import AppPath from "../AppPath"
import Battery from "./Battery"

test('renders name field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/name/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders status field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/status/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field')
})

test('renders make field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/manufacturer/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders model field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/model/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders type field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/type/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field')
})

test('renders capacity field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/capacity/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field')
})

test('renders cells field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/cells/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field')
})

test('renders cycles field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/cycles/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field')
})

test('renders discharge rating field', () => {
	render(<Router><Battery advanced={true}/></Router>)
	const element = screen.getByLabelText(/discharge rating/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field')
})

test('renders update button', () => {
	render(<Router><Battery advanced={true}/></Router>);
	const element = screen.getByText('Update')
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('BUTTON')
})

test('renders save button', () => {
	render(
		<Router initialEntries={[AppPath.BATTERY + '/new']}>
			<Routes>
				<Route path={AppPath.BATTERY + '/:id'} element={<Battery advanced={true}/>}/>
			</Routes>
		</Router>
	)

	const element = screen.getByText('Save')
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('BUTTON')
})
