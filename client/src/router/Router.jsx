import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/SignIn/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: '/',
                element: <PrivateRoute><Home /></PrivateRoute>
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            }
        ]
    }
])
export default router;