import { useEffect } from "react";
import Header from "../../components/header";
import { useSearchParams } from "react-router-dom";
import { useFilter } from "../../context/FilterContext";
import { useDebounce } from 'use-debounce';
import BookList from "../../components/book-list";
import { useQuery } from "react-query";
import axios from "axios";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { category, setCategory, immediateSearch, setImmediateSearch, setSearch, year, setYear } = useFilter();
    const [debouncedSearch] = useDebounce(immediateSearch, 1000);

    useEffect(() => {
        const categoryParam = searchParams.get('category') || 'all';
        const searchParam = searchParams.get('s') || '';
        const yearParam = searchParams.get('year') || '';
        setCategory(categoryParam);
        setImmediateSearch(searchParam);
        setYear(yearParam);
    }, [searchParams, setCategory, setImmediateSearch, setYear]);

    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch, setSearch]);

    useEffect(() => {
        setSearchParams({ category, s: debouncedSearch, year });
    }, [category, debouncedSearch, year, setSearchParams]);

    const { isLoading, error, data } = useQuery(['getBooks', category, debouncedSearch, year], () => {
        const params = new URLSearchParams();
        if (category !== 'all') {
            params.append('category', category);
        }
        if (debouncedSearch !== '') {
            params.append('search', debouncedSearch);
        }
        if (year !== '') {
            params.append('year', year);
        }
        const url = `http://localhost:8000/books?${params.toString()}`
        return axios.get(url).then(res => res.data);
    }, {
        refetchOnWindowFocus: false
    });

    if (error) {
        throw error;
    }

    return (
        <div className='container mx-auto'>
            <Header />
            <BookList isLoading={isLoading} data={data} />
        </div>
    );
}

export default Home;
