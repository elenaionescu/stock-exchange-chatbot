import { StockData } from "../models/StockData";

export const stockData: StockData = [
    {
        name: "London Stock Exchange",
        stocks: [
            { name: "CRODA INTERNATIONAL PLC", price: 4807 },
            { name: "GSK PLC", price: 1574 },
            { name: "ANTOFAGASTA PLC", price: 1746 },
            { name: "FLUTTER ENTERTAINMENT PLC", price: 16340 },
            { name: "BARRATT DEVELOPMENTS PLC", price: 542.60 }
        ]
    },
    {
        name: "New York Stock Exchange",
        stocks: [
            { name: "Ashford Hospitality TrustC", price: 1.72 },
            { name: "Kuke Music Holding Ltd", price: 1.20 },
            { name: "Ashland Inc.", price: 93.42 },
            { name: "Nomura Holdings Inc.", price: 5.84 },
            { name: "LendingClub Corp", price: 9.71 }
        ]
    },
    {
        name: "NASDAQ Stock Exchange",
        stocks: [
            { name: "Advanced Micro Devices, Inc.", price: 164.21 },
            { name: "Tesla, Inc.", price: 190.35 },
            { name: "SoFi Technologies, Inc.", price: 8.24 },
            { name: "Paramount Global", price: 14.92 },
            { name: "Alphabet Inc.", price: 141.91 }
        ]
    }
];