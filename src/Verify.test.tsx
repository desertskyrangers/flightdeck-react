import React from 'react';
import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import Verify from "./Verify";

test('renders verify field', () => {
	render(<Router><Verify/></Router>);
	const element = screen.getByLabelText(/verification code/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

test('renders verify button', () => {
	render(<Router><Verify/></Router>);
	const element = screen.getByText(/verify/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

test('renders resend button', () => {
	render(<Router><Verify/></Router>);
	const element = screen.getByText(/resend/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

test('renders messages', () => {
	render(<Router><Verify messages={["HELLO"]}/></Router>);
	const element = screen.getByText(/hello/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
	expect(element).toHaveClass('notice-message');
});

