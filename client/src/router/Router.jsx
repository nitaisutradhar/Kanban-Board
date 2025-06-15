import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/SignIn/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
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
            }
        ]
    }
])
export default router;