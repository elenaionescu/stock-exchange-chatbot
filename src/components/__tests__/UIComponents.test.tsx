import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BotMessage, UserMessage, OptionButton } from '../ChatBot';

describe('UI Components', () => {
    test('BotMessage renders correctly', () => {
        render(<BotMessage>Test Message</BotMessage>);
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    test('UserMessage renders correctly', () => {
        render(<UserMessage>User Test Message</UserMessage>);
        expect(screen.getByText('User Test Message')).toBeInTheDocument();
    });

    test('OptionButton calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<OptionButton onClick={handleClick}>Option 1</OptionButton>);

        fireEvent.click(screen.getByText('Option 1'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});