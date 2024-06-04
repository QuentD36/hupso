import { useQuery } from "react-query";
import { Book as BookInterface } from "../interfaces/book.interface";
import Book from "./book";
import BookLoading from "./book-loading";
import axios from "axios";

function BookList({ isLoading, data }: { isLoading: boolean, data?: BookInterface[] }) {

    

    if (isLoading) {
        return (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                <BookLoading />
                <BookLoading />
                <BookLoading />
                <BookLoading />
                <BookLoading />
                <BookLoading />
            </div>
        )
    }

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {data && data.map((book, index) => {
                // Just to display an img for the first book
                if (index === 0) {
                    book.img = '/cover.png'
                }
                return <Book key={index} data={book} />
            })}
        </div>
    )
}

export default BookList;
