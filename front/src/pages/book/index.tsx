import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Book } from "../../interfaces/book.interface";

function Item() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, error, data }: { isLoading: boolean, error: any, data?: Book } = useQuery(
        ['getBook', id],
        async () => {
            const url = `http://localhost:8000/books/${id}`;
            const response = await axios.get(url);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            enabled: !!id,
        }
    );

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'MMMM yyyy', { locale: fr });
    };

    if (isLoading) {
        return (
            <div className='container mx-auto text-left animate-pulse'>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2" ></button>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-4 md:p-8 max-w-5xl mx-auto">
                    <div className="w-full md:w-1/2">
                        <div
                            className="w-full h-64 bg-gray-200 rounded-lg shadow-lg"
                        ></div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4 text-left">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="w-full h-10 bg-gray-200 rounded mt-4"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        throw error;
    }

    return (
        <div className='container mx-auto text-left'>
            <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={() => navigate(-1)}
            >
                <ChevronLeft className="w-4 h-4 mr-2" /> Retour
            </button>
            <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-4 md:p-8 max-w-5xl mx-auto">
                <div className="w-full md:w-1/2">
                    <img
                        src="/placeholder.svg"
                        alt="Book Cover"
                        width={500}
                        height={700}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-4 text-left">
                    <h1 className="text-3xl font-bold">{data!.title}</h1>
                    <p className="text-gray-500 text-lg">Par {data!.author} - Publié en {formatDate(data!.publishedAt)}</p>
                    <p>{data!.description}</p>
                    <button className="w-full bg-black text-white p-2 rounded mt-4 font-bold">Louer</button>
                </div>
            </div>
        </div>
    );
}

export default Item;
