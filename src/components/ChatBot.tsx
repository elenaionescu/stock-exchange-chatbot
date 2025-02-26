import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { stockData } from "../data/stockData";
import { Stock, Exchange } from "../models/StockData";

type ChatStep = 'welcome' | 'exchange-selection' | 'stock-selection' | 'stock-info';

interface ChatMessage {
    text: string;
    isUser: boolean;
    options?: string[];
}

const ChatbotContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 600px;
  `;

const ChatHeader = styled.div`
  background-color: #1e3a8a;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BotMessage = styled.div`
  background-color: #e9f0fe;
  padding: 12px 16px;
  border-radius: 18px;
  border-top-left-radius: 4px;
  max-width: 80%;
  align-self: flex-start;
`;

const BotAvatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3563dc;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const UserMessage = styled.div`
  background-color: #e2e8f0;
  padding: 12px 16px;
  border-radius: 18px;
  border-top-right-radius: 4px;
  max-width: 80%;
  align-self: flex-end;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 700px;
  align-self: flex-start;
`;

export const OptionButton = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
`;

const SendButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { text: "Hello! Welcome to LSEG. I'm here to help you.", isUser: false },
        {
            text: "Please select a Stock Exchange.",
            isUser: false,
            options: stockData.map(exchange => exchange.name)
        }
    ]);

    const [dataLoaded, setDataLoaded] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!stockData || stockData.length === 0) {
            setDataLoaded(false);
            setError("Unable to load stock data. Please try again later.");
        }
    }, []);
    const [currentStep, setCurrentStep] = useState<ChatStep>('exchange-selection');
    const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [userInput, setUserInput] = useState('');

    const handleExchangeSelection = (exchangeName: string) => {
        const exchange = stockData.find(ex => ex.name === exchangeName) || null;
        setSelectedExchange(exchange);

        setMessages([
            ...messages,
            { text: exchangeName, isUser : true },
            {
                text: `Please select a stock.`,
                isUser: false,
                options: exchange?.stocks.map(stock => stock.name) || []
            }
        ]);

        setCurrentStep('stock-selection');
    };

    const handleStockSelection = (stockName: string) => {
        if (!selectedExchange) return;

        const stock = selectedExchange.stocks.find(s => s.name === stockName) || null;
        setSelectedStock(stock);

        setMessages([
            ...messages,
            { text: stockName, isUser: false },
            {
                text: `Stock Price of ${stockName} is ${stock?.price.toFixed(2)}. Please select an option.`,
                isUser: false,
                options: ["Main menu", "Go Back"]
            }
        ]);

        setCurrentStep('stock-info');
    };

    const handleNavigation = (option: string) => {
        if (option === "Main menu") {
            setSelectedExchange(null);
            setSelectedStock(null);

            setMessages([
                ...messages,
                { text: option, isUser: true },
                {
                    text: "Please select a Stock Exchange.",
                    isUser: false,
                    options: stockData.map(exchange => exchange.name)
                },
            ]);

            setCurrentStep('exchange-selection');
        } else if (option === "Go Back") {
            setSelectedStock(null);

            setMessages([
                ...messages,
                { text: option, isUser: true },
                {
                    text: `Please select a stock.`,
                    isUser: false,
                    options: selectedExchange?.stocks.map(stock => stock.name) || []
                }
            ]);

            setCurrentStep('stock-selection');
        }
    };

    const handleOptionClick = (option: string) => {
         switch (currentStep) {
             case 'exchange-selection':
                 handleExchangeSelection(option);
                 break;
             case 'stock-selection':
                 handleStockSelection(option);
                 break;
             case 'stock-info':
                 handleNavigation(option);
                 break;
             default:
                 break;
         }
    };

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        setMessages([
            ...messages,
            { text: userInput, isUser: true }
        ]);

        setUserInput('');
    };

    if (!dataLoaded) {
        return (
            <ChatbotContainer>
                <ChatHeader>
                    <BotAvatar>🤖</BotAvatar>
                    <h2>LSEG chatbot</h2>
                </ChatHeader>
                <ChatBody>
                    <BotMessage>
                        {error || "An error occurred while loading the chatbot. Please refresh the page."}
                    </BotMessage>
                </ChatBody>
            </ChatbotContainer>
        );
    }

    return (
        <ChatbotContainer>
            <ChatHeader>
                <BotAvatar>🤖</BotAvatar>
                <h2>LSEG chatbot</h2>
            </ChatHeader>

            <ChatBody>
                {messages.map((message, index) => (
                    message.isUser ? (
                        <UserMessage key={index}>{message.text}</UserMessage>
                    ) : (
                        <React.Fragment key={index}>
                            <BotMessage>{message.text}</BotMessage>
                            {message.options && (
                                <OptionsContainer>
                                    {message.options.map((option, optIndex) => (
                                        <OptionButton
                                            key={optIndex}
                                            onClick={() => handleOptionClick(option)}
                                            data-testid={`option-${option.replace(/\s+/g, '-').toLowerCase()}`}
                                        >
                                            {option}
                                        </OptionButton>
                                    ))}
                                </OptionsContainer>
                            )}
                        </React.Fragment>
                    )
                ))}
            </ChatBody>

            <InputContainer>
                <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendButton onClick={handleSendMessage}>Send</SendButton>
            </InputContainer>
        </ChatbotContainer>
    );
};

export default Chatbot;
