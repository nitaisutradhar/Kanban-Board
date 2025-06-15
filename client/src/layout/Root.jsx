import React from 'react';
import Navbar from '../pages/shared/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Root;