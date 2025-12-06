import {render, screen} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router";
import UserActions from "./UserActions";

test('renders profile button', () => {
	render(<Router><UserActions/></Router>);
	const element = screen.getByText(/profile/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

test('renders security button', () => {
	render(<Router><UserActions/></Router>);
	const element = screen.getByText(/security/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

test('renders about button', () => {
	render(<Router><UserActions/></Router>);
	const element = screen.getByText(/about/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

test('renders log out button', () => {
	render(<Router><UserActions/></Router>);
	const element = screen.getByText(/logout/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

