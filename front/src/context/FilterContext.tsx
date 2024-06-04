import { createContext, useState, useContext, ReactNode } from 'react';

interface FilterContextProps {
    search: string;
    setSearch: (search: string) => void;
    immediateSearch: string;
    setImmediateSearch: (search: string) => void;
    category: string;
    setCategory: (category: string) => void;
    year: string;
    setYear: (year: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState('');
    const [immediateSearch, setImmediateSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [year, setYear] = useState('');

    return (
        <FilterContext.Provider value={{ search, setSearch, immediateSearch, setImmediateSearch, category, setCategory, year, setYear }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
