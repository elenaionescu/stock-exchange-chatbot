# Stock Exchange Chatbot

A React TypeScript chatbot application that allows users to browse stock exchanges and view stock prices.

## Features

- Browse through 3 major stock exchanges (London, NYSE, NASDAQ)
- View stocks available in each exchange
- Check current stock prices
- Navigate easily between exchanges and stocks

## Setup and Installation

1. Clone the repository
 
    `git clone https://github.com/yourusername/stock-exchange-chatbot.git`
    `cd stock-exchange-chatbot`

2. Install dependencies

    `npm install`

3. Run the application

    `npm start`

4. Open in browser
   The application will be available at http://localhost:3000

## Project Structure

- `/src/components` - React components
- `/src/models` - TypeScript interfaces
- `/src/data` - Mock data for the application

## Error Handling

The application handles several error scenarios:
- Missing or empty data files
- Network errors when loading data
- Invalid user selections

## Testing

This project includes comprehensive test coverage using Jest and React Testing Library.

To run tests:
    `npm test`

To run tests with coverage report:
    `npm run test:coverage`

The tests include:
- Unit tests for individual components
- Integration tests for user flows
- Data validation tests
- Error handling tests


## Future Enhancements

- Add real-time data fetching from stock APIs
- Implement search functionality for stocks
- Add historical stock data and charts
- Support for additional exchanges and stocks