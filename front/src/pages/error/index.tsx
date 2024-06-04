import { ChevronLeft } from "lucide-react";
import { useRouteError } from "react-router-dom";

function Error() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className='container mx-auto flex justify-center flex-col items-center gap-4'>
            <h2 className="text-3xl font-bold">Oups !</h2>
            <img src="/error.svg" alt="Error" width={500} height={500} />
            <p className="mt-4 text-gray-500">Quelque chose s'est mal passé</p>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" onClick={() => window.history.back()}><ChevronLeft className="w-4 h-4 mr-2"/> Retour</button>
        </div>
    )
}

export default Error;