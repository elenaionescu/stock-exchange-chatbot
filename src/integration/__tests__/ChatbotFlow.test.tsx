import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

describe('Chatbot Flow Integration', () => {
    test('complete user flow works correctly', async () => {
        render(<App />);

        expect(screen.getByRole('heading', { name: 'LSEG chatbot' })).toBeInTheDocument();

        const exchangeButtons = await screen.findAllByRole('button');
        const nasdaqButton = exchangeButtons.find(btn => btn.textContent === 'NASDAQ Stock Exchange');
        if (!nasdaqButton) throw new Error('NASDAQ button not found');
        fireEvent.click(nasdaqButton);

        // Wait a moment for UI to update
        const stockButtons = await screen.findAllByRole('button');
        const appleButton = stockButtons.find(btn => btn.textContent === 'Advanced Micro Devices, Inc.');
        if (!appleButton) throw new Error('Advanced Micro Devices button not found');
        fireEvent.click(appleButton);

        const navigationButtons = await screen.findAllByRole('button');
        const goBackButton = navigationButtons.find(btn => btn.textContent === 'Go Back');
        if (!goBackButton) throw new Error('Go Back button not found');

        fireEvent.click(goBackButton);

        const updatedStockButtons = await screen.findAllByRole('button');
        const microsoftButtons = updatedStockButtons.filter(btn => btn.textContent === 'Tesla, Inc.');
        if (microsoftButtons.length === 0) throw new Error('Tesla button not found');
        // Click the first Microsoft button
        fireEvent.click(microsoftButtons[0]);

        const menuButtons = await screen.findAllByRole('button');
        const mainMenuButton = menuButtons.find(btn => btn.textContent === 'Main menu');
        if (!mainMenuButton) throw new Error('Main menu button not found');
        fireEvent.click(mainMenuButton);

        const finalButtons = await screen.findAllByRole('button');
        const hasLSE = finalButtons.some(btn => btn.textContent === 'London Stock Exchange');
        expect(hasLSE).toBe(true);
    });
});