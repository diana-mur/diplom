import {Outlet, RouterProvider, createBrowserRouter} from "react-router-dom"
import { Header } from "./components/Header.jsx"
import { HomePage } from "./pages/HomePage.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            {
                path: "/",
                element: <HomePage />
            }
        ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
