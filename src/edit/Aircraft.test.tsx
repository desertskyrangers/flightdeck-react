import React from "react";
import {MemoryRouter as Router, Route, Routes} from "react-router";
import Aircraft, {calcAspectRatio, calcMeanAirfoilChord, calcWingCubeLoading, calcWingLoading} from "./Aircraft";
import AppPath from "../AppPath";
import {render, screen} from "@testing-library/react";

test('calculate aspect ratio', () => {
	expect(calcAspectRatio(1500, 3000)).toBe(7.5)
})

test('calculate mean airfoil chord', () => {
	expect(calcMeanAirfoilChord(1500, 3000)).toBe(200)
})

test('calculate wing loading', () => {
	expect(calcWingLoading(750, 3000)).toBe(0.25)
})

test('calculate wing cube loading', () => {
	expect(calcWingCubeLoading(750, 3000)).toBe(4.564354645876384)
})

test('renders name field', () => {
	render(<Router><Aircraft advanced={true}/></Router>);
	const element = screen.getByLabelText(/name/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

test('renders type field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/type/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field')
})

test('renders status field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/status/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field')
})

test('renders make field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/manufacturer/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders model field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/model/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders wingspan field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/wing span/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders length field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/length/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders wingarea field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/wing area/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders weight field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/weight/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders night lights field', () => {
	render(<Router><Aircraft advanced={true}/></Router>)
	const element = screen.getByLabelText(/lights for night flying/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'checkbox')
})

test('renders update button', () => {
	render(<Router><Aircraft advanced={true}/></Router>);
	const element = screen.getByText('Update');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

test('renders save button', () => {
	render(
		<Router initialEntries={[AppPath.AIRCRAFT + '/new']}>
			<Routes>
				<Route path={AppPath.AIRCRAFT + '/:id'} element={<Aircraft advanced={true}/>}/>
			</Routes>
		</Router>
	)

	const element = screen.getByText('Save');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

