import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Item from "../pages/book";
import Error from "../pages/error";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error/>,
    },
    {
        path: "/books/:id",
        element: <Item />,
        errorElement: <Error/>,
    },
    {
        path: "*",
    }
]);