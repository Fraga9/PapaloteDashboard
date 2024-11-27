import React from 'react'; // Explicitly import React for JSX
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Museo Papalote title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Museo Papalote/i);
    expect(titleElement).toBeInTheDocument();
});

