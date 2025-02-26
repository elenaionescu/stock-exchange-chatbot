import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chatbot from '../ChatBot';

describe('Chatbot Component', () => {
    test('initial render shows welcome message', () => {
        render(<Chatbot />);
        expect(screen.getByText(/Hello! Welcome to LSEG/i)).toBeInTheDocument();
    });

    test('shows exchange options', () => {
        render(<Chatbot />);
        expect(screen.getByText('London Stock Exchange')).toBeInTheDocument();
        expect(screen.getByText('New York Stock Exchange')).toBeInTheDocument();
        expect(screen.getByText('NASDAQ Stock Exchange')).toBeInTheDocument();
    });

    test('selecting exchange shows stocks', () => {
        render(<Chatbot />);

        // Find and click London Stock Exchange
        const buttons = screen.getAllByRole('button');
        const lseButton = Array.from(buttons).find(b => b.textContent === 'London Stock Exchange');

        if (lseButton) {
             fireEvent.click(lseButton);

            // Check for a stock
            expect(screen.getByText('CRODA INTERNATIONAL PLC')).toBeInTheDocument();
        } else {
            throw new Error('London Stock Exchange button not found');
        }
    });

    test('can view stock price', () => {
        render(<Chatbot />);

        // First navigate to stocks view
        const exchangeButtons = screen.getAllByRole('button');
        const lseButton = Array.from(exchangeButtons).find(b => b.textContent === 'London Stock Exchange');

        if (lseButton) {
            fireEvent.click(lseButton);

            // Now find and click on a stock
            const stockButtons = screen.getAllByRole('button');
            const stockButton = Array.from(stockButtons).find(b => b.textContent === 'CRODA INTERNATIONAL PLC');

            if (stockButton) {
                fireEvent.click(stockButton);

                // Check that price information is shown
                expect(screen.getByText(/Stock Price of CRODA INTERNATIONAL PLC is/)).toBeInTheDocument();
            } else {
                throw new Error('Stock button not found');
            }
        }
    });
});