import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

type ThemeContextProps = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const getInitialTheme = (): ThemeMode => {
        const stored = global.window.localStorage.getItem('theme') as ThemeMode | null;
        if (stored) return stored;

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    const [theme, setTheme] = useState<ThemeMode>('dark');
    
    useEffect(() => {
        setTheme(getInitialTheme());
        localStorage.setItem('theme', theme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.localStorage.setItem('theme', theme);
        document.body.classList.toggle('light-mode', theme === 'light');
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    return <ThemeContext.Provider value={{ theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext);
}
