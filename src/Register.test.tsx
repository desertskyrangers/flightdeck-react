import React from 'react';
import {render, screen} from '@testing-library/react';
import Register from './Register';
import {MemoryRouter as Router} from "react-router";

test('renders username field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Username');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

test('renders password field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
	expect(element).toHaveClass('page-field');
});

test('renders verify password field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Verify Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
	expect(element).toHaveClass('page-field');
});

test('renders email field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Email Address');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

test('renders sign in button', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByText('Sign Up');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

test('renders messages', () => {
	render(<Router><Register email={'tia'}/></Router>);
	const element = screen.getByText(/invalid email address/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
	expect(element).toHaveClass('notice-message');
});
