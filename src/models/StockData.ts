export interface Stock {
    name: string;
    price: number;
}

export interface Exchange {
    name: string;
    stocks: Stock[];
}

export type StockData = Exchange[];
