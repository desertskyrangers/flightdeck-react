import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import Flight from "./Flight";

test('renders pilot field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByLabelText(/pilot/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field');
});

test('renders observer field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByLabelText(/observer/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field');
});

test('renders aircraft field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByLabelText(/aircraft/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field');
});

test('renders battery field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByLabelText(/battery/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field');
});

test('renders duration hour field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByTestId('durationHH')
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field');
});

test('renders duration minute field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByTestId('durationMM')
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field');
});

test('renders duration second field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByTestId('durationSS')
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field');
});

// NEXT Add some tests around new/timed/and existing flights
