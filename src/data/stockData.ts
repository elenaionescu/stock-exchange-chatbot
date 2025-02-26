import { StockData } from "../models/StockData";

export const stockData: StockData = [
    {
        name: "London Stock Exchange",
        stocks: [
            { name: "CRODA INTERNATIONAL PLC", price: 45.67 },
            { name: "GSK PLC", price: 32.18 },
            { name: "ANTOFAGASTA PLC", price: 21.45 },
            { name: "FLUTTER ENTERTAINMENT PLC", price: 39.33 },
            { name: "BARRATT DEVELOPMENTS PLC", price: 18.92 }
        ]
    },
    {
        name: "New York Stock Exchange",
        stocks: [
            { name: "WALMART INC", price: 152.74 },
            { name: "COCA-COLA CO", price: 59.21 },
            { name: "PFIZER INC", price: 28.34 },
            { name: "EXXON MOBIL CORP", price: 117.96 },
            { name: "AT&T INC", price: 16.52 }
        ]
    },
    {
        name: "NASDAQ Stock Exchange",
        stocks: [
            { name: "APPLE INC", price: 175.84 },
            { name: "MICROSOFT CORP", price: 341.27 },
            { name: "AMAZON.COM INC", price: 129.96 },
            { name: "NVIDIA CORP", price: 423.85 },
            { name: "META PLATFORMS INC", price: 313.63 }
        ]
    }
];