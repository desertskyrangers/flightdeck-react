import React from 'react';
import {render, screen} from '@testing-library/react';
import Login from './Login';
import {MemoryRouter as Router} from "react-router";

test('renders username field', () => {
	render(<Router><Login/></Router>);
	const element = screen.getByLabelText(/username/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

test('renders password field', () => {
	render(<Router><Login/></Router>);
	const element = screen.getByLabelText(/password/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
	expect(element).toHaveClass('page-field');
});

test('renders forgot password link', () => {
	render(<Router><Login/></Router>);
	const element = screen.getByText(/forgot password/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('A');
});

test('renders sign in button', () => {
	render(<Router><Login/></Router>);
	const element = screen.getByText(/sign in/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

test('renders register link', () => {
	render(<Router><Login/></Router>);
	const element = screen.getByText(/need an account/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('A');
});

test('renders messages', () => {
	render(<Router><Login messages={["HELLO"]}/></Router>);
	const element = screen.getByText(/hello/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
	expect(element).toHaveClass('notice-message');
});
