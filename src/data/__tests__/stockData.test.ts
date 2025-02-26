import { stockData } from "../stockData";

describe('Stock Data', () => {
    test('stockData structure is valid', () => {
        expect(stockData).toBeDefined();
        expect(Array.isArray(stockData)).toBe(true);
        expect(stockData.length).toBe(3); // We expect 3 exchanges

        // Check each exchange
        stockData.forEach(exchange => {
            expect(exchange).toHaveProperty('name');
            expect(exchange).toHaveProperty('stocks');
            expect(Array.isArray(exchange.stocks)).toBe(true);
            expect(exchange.stocks.length).toBe(5); // We expect 5 stocks per exchange

            // Check each stock
            exchange.stocks.forEach(stock => {
                expect(stock).toHaveProperty('name');
                expect(stock).toHaveProperty('price');
                expect(typeof stock.name).toBe('string');
                expect(typeof stock.price).toBe('number');
            });
        });
    });

    test('exchange names are correct', () => {
        const exchangeNames = stockData.map(exchange => exchange.name);
        expect(exchangeNames).toContain('London Stock Exchange');
        expect(exchangeNames).toContain('New York Stock Exchange');
        expect(exchangeNames).toContain('NASDAQ Stock Exchange');
    });

    test('stock prices are positive numbers', () => {
        stockData.forEach(exchange => {
            exchange.stocks.forEach(stock => {
                expect(stock.price).toBeGreaterThan(0);
            });
        });
    });
});