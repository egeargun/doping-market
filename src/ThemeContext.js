import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Başlangıç teması

    // LocalStorage'dan temayı yükle
    useEffect(() => {
        const savedTheme = localStorage.getItem('appTheme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    // Tema değiştiğinde LocalStorage'a kaydet ve body sınıfını güncelle
    useEffect(() => {
        localStorage.setItem('appTheme', theme);
        document.body.className = theme; // body etiketine tema sınıfını uygula
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);