import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter as Router} from "react-router";
import Legal from "./Legal";

test('renders copyright header', () => {
	render(<Router><Legal/></Router>);
	const element = screen.getByText('Copyright');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('H1');
});

test('renders copyright notice', () => {
	render(<Router><Legal/></Router>);
	const element = screen.getByText(/all content on this website/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
});
