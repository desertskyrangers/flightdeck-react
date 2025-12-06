import React from 'react';
import {render, screen} from '@testing-library/react';
import Footer from './Footer';
import {MemoryRouter as Router} from "react-router";

test('renders copyright notice with current year', () => {
	render(<Router><Footer/></Router>);

	const year = new Date().getFullYear();
	const element = screen.getByText(/\u00A9/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveTextContent('\u00A9 ' + year + ' Desert Sky Rangers')
});
