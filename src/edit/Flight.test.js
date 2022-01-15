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

test('renders batter field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByLabelText(/batter/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field');
});

// NEXT Add some tests around new/timed/and existing flights
