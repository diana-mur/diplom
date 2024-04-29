import { Outlet, Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux"
import { Header } from "./components/Header.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { Auth } from "./pages/Auth.jsx"
import { Reg } from "./pages/Reg.jsx"
import { MainAdmin } from "./pages/Admin/MainAdmin.jsx"
import { Footer } from "./components/Footer.jsx"
import Lesson from "./pages/Lesson.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <Outlet />
            <Footer />
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
                element: <>finish</>
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
                element: <MainAdmin />
            },
            {
                path: "/lessons/:idLesson",
                element: <Lesson />
            },
            {
                path: "/redLesson/:idLesson",
                element: <>redLesson/:idLessonAdmin</>
            },
            {
                path: "/newLesson",
                element: <>newAdmin</>
            },
            {
                path: "/profile",
                element: <>profileAdmin</>
            },
            {
                path: "/redProfile",
                element: <>redProfileAdmin</>
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
