import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import Password from "./Password";

test('renders current password field', () => {
	render(<Router><Password/></Router>);
	const element = screen.getByLabelText(/current password/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field');
});

test('renders password field', () => {
	render(<Router><Password/></Router>);
	const element = screen.getByLabelText(/^new password$/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field');
});

test('renders verify password field', () => {
	render(<Router><Password/></Router>);
	const element = screen.getByLabelText(/verify password/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveClass('page-field');
});

