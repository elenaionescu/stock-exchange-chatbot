import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chatbot from '../ChatBot';

jest.mock('../../data/stockData', () => ({
    stockData: []
}));

describe('Error Handling', () => {
    test('shows error message when stockData is empty', () => {
        render(<Chatbot />);

        expect(screen.getByText(/Unable to load stock data/i)).toBeInTheDocument();
    });
});