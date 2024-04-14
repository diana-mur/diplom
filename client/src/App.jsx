import { Outlet, Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux"
import { Header } from "./components/Header.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { Auth } from "./components/Modals/Auth.jsx"
import { Reg } from "./components/Modals/Reg.jsx"

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
            },
            {
                path: "/auth",
                element: <Auth />
            },
            {
                path: "/reg",
                element: <Reg />
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to={'/'} />
    },
])

const userRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            {
                path: "/",
                element: <>Home</>
            },
            {
                path: "/profile",
                element: <>profile</>
            },
            {
                path: "/redProfile",
                element: <>redProfile</>
            },
            {
                path: "/profile",
                element: <>profile</>
            },
            {
                path: "/lessons/:idLesson",
                element: <>idLesson</>
            },
            {
                path: "/lessons/:idLesson/test",
                element: <>test</>
            },
            {
                path: "/lessons/:idLesson/finish",
                element: <>profile</>
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to={'/'} />
    },
])

const adminRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            {
                path: "/",
                element: <>MainAdmin</>
            },
            {
                path: "/lessons/:idLesson",
                element: <>idLessonAdmin</>
            },
            {
                path: "/redLesson/:idLesson",
                element: <>redLesson/:idLessonAdmin</>
            },
            {
                path: "/newLesson",
                element: <>newAdmin</>
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to={'/'} />
    },
])

function App() {
    const token = useSelector((state) => state.auth.token)
    let jwt
    token ? jwt = jwtDecode(token) : null
    console.log(jwt);

    return (
        token ?
            jwt?.roleId == "ADMIN" ? <RouterProvider router={adminRouter} /> :
                <RouterProvider router={userRouter} /> :
            <RouterProvider router={router} />
    )
}

export default App