import { ChevronRight, CircleChevronRight, LoaderCircle, Star } from "lucide-react";
import { syncCategories } from "../utils/category";
import { useNavigate } from "react-router-dom";
import { Book as BookInterface } from "../interfaces/book.interface";
import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
 
interface BookProps {
    data: BookInterface
}

function Book({ data }: BookProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleWishlist = (book: BookInterface) => {
        console.log(book);
    }

    const handleBooking = (book: BookInterface) => {

        setLoading(true);

        // We should validate the form
        const data = {
            email: 'test@rent.com',
            startDate: new Date(),
            endDate: new Date(),
            book: book.id
        }

        axios.post('http://localhost:8000/booking', data)
            .then((response) => {
                toast.success('Livre réservé avec succès');
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

    }

    return (
        <div className="group max-w-sm min-h-[523px] rounded overflow-hidden shadow-lg relative hover:cursor-pointer" onClick={() => navigate(`/books/${data.id}`)}>
            <img className="w-full h-full object-cover" src={data.img || '/placeholder.svg'} alt={data.title} />
            <div className="w-full h-full absolute top-0 right-0 flex flex-col justify-between">
                {/* Header */}
                <div className="w-full flex justify-end p-4">
                    <Star onClick={(e) => { e.stopPropagation(); handleWishlist(data) }} className="w-10 h-10 text-white fill-current hover:cursor-pointer hover:text-yellow-500 transition duration-300 " />
                </div>

                {/* Content */}
                <div onClick={(e) => e.stopPropagation()} className="group-hover:cursor-default flex-col gap-2 text-left hidden group-hover:flex w-full p-4 bg-white rounded-t-xl transition duration-300 animate-slide-up">
                    <h2 className="hover:cursor-pointer text-xl font-bold truncate whitespace-nowrap overflow-hidden" onClick={() => navigate(`/books/${data.id}`)}>
                        {data.title} - {data.author}
                    </h2>
                    <div className="flex gap-2">
                        {
                            data.category.split(',').map((category, index) => {
                                const dataCategory = syncCategories(category);

                                return (
                                    <span
                                        key={index}
                                        style={{ backgroundColor: dataCategory?.color }}
                                        className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white"
                                    >
                                        {dataCategory?.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                    <p className="">{data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description} <button className="font-bold underline hover:cursor-pointer flex gap-2 items-center" onClick={(e) => { navigate(`/books/${data.id}`); e.stopPropagation(); }}>Voir plus<ChevronRight className="w-4 h-4 bg-black rounded-full text-white" /></button></p>
                    <button className="bg-black text-white p-2 rounded mt-4 font-bold flex gap-2 items-center justify-center" onClick={() => handleBooking(data)}>
                        {
                            loading && <LoaderCircle className="w-4 h-4 text-white animate-spin" />
                        }
                        Louer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Book;
