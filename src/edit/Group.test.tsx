import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import Group from "./Group";

test('renders name field', () => {
	render(<Router><Group/></Router>);
	const element = screen.getByLabelText(/name/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

test('renders type field', () => {
	render(<Router><Group/></Router>);
	const element = screen.getByLabelText(/type/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field');
});

