import React from "react";
import {render, screen} from '@testing-library/react';
import {MemoryRouter as Router} from "react-router";
import FlightActions from "./FlightActions";

test('renders time a flight button', () => {
	render(<Router><FlightActions/></Router>);
	const element = screen.getByText('Time a Flight');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

test('renders plan a flight button', () => {
	render(<Router><FlightActions/></Router>);
	const element = screen.getByText('Log a Flight');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

test('renders my flight log button', () => {
	render(<Router><FlightActions/></Router>);
	const element = screen.getByText('My Flight Log');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

