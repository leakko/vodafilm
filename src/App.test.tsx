import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
	it('renders the correct text', () => {
		const { getByText } = render(<App />);
		const textElement = getByText(/Hello, world!/i);
		expect(textElement).toBeInTheDocument();
	});
});
