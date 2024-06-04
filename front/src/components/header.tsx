import React from 'react';
import { useFilter } from '../context/FilterContext';

function Header() {
    const { immediateSearch, setImmediateSearch, category, setCategory, year, setYear } = useFilter();

    const years = new Array(100).fill(0).map((_, i) => new Date().getFullYear() - i);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== category) {
            setCategory(e.target.value);
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== year) {
            setYear(e.target.value);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-left">Hupso</h1>
            <div className='mt-4 flex w-full gap-4 flex-col md:flex-row'>
                <input
                    value={immediateSearch}
                    onChange={(e) => setImmediateSearch(e.target.value)}
                    className='flex h-10 w-full md:w-2/3 rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foregrund focus:outline-none'
                    type="text"
                    id='search'
                    placeholder="Rechercher un livre..."
                />
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className='flex h-10 w-full md:w-1/3 rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foregrund focus:outline-none'>
                    <option value="all">Filtrer par categorie</option>
                    <option value="biography">Biographie</option>
                    <option value="drama">Drame</option>
                    <option value="dystopia">Dystopie</option>
                    <option value="romance">Romance</option>
                    <option value="science">Science fiction</option>
                    <option value="thriller">Thriller</option>
                </select>
                <select
                    value={year}
                    onChange={handleYearChange}
                    className='flex h-10 w-full md:w-1/3 rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foregrund focus:outline-none'
                >
                    <option value="">Filtrer par année</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default Header;
