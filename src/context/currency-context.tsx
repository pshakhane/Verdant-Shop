"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const CURRENCY_STORAGE_KEY = 'mega-shop-currency';

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface ConversionRates {
    [key: string]: number;
}

const availableCurrencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
];

const conversionRates: ConversionRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 157.74,
};

type CurrencyContextType = {
    currency: Currency;
    setCurrency: (code: string) => void;
    formatPrice: (price: number) => string;
    availableCurrencies: Currency[];
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrencyState] = useState<Currency>(availableCurrencies[0]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedCurrencyCode = localStorage.getItem(CURRENCY_STORAGE_KEY);
            if (storedCurrencyCode) {
                const foundCurrency = availableCurrencies.find(c => c.code === storedCurrencyCode);
                if (foundCurrency) {
                    setCurrencyState(foundCurrency);
                }
            }
        } catch (error) {
            console.error("Failed to read currency from localStorage", error);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(CURRENCY_STORAGE_KEY, currency.code);
            } catch (error) {
                console.error("Failed to write currency to localStorage", error);
            }
        }
    }, [currency, isInitialized]);

    const setCurrency = (code: string) => {
        const newCurrency = availableCurrencies.find(c => c.code === code);
        if (newCurrency) {
            setCurrencyState(newCurrency);
        }
    };

    const formatPrice = (price: number) => {
        const rate = conversionRates[currency.code] || 1;
        const convertedPrice = price * rate;
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency.code,
        }).format(convertedPrice);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, availableCurrencies }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
