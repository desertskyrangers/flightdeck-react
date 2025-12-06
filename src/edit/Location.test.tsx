import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import Location from "./Location";

test('renders name field', () => {
	render(<Router><Location/></Router>);
	const element = screen.getByLabelText(/name/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

