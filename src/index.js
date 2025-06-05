import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import MainPage from './Pages/MainPage/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';
import GamesPage from './Pages/GamesPage/index.jsx';
import CrosswordPage from './Pages/GamesPage/CrosswordPage/index.jsx';

import HistoricalPage from './Pages/HistoricalPage/index.jsx';

import RudolfPage from './Pages/HistoricalPage/RudolfPage/index.jsx';
import QuietPage from './Pages/HistoricalPage/QuietPage/index.jsx';
import BallPage from './Pages/HistoricalPage/BallPage/index.jsx';
import WhitePage from './Pages/HistoricalPage/WhitePage/index.jsx';
import CheluskinPage from './Pages/HistoricalPage/CheluskinPage/index.jsx';
import NorthPage from './Pages/HistoricalPage/NorthPage/index.jsx';
import SchmidtPage from './Pages/HistoricalPage/SchmidtPage/index.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Preview />,
    },
    {
        path: '/main',
        element: <MainPage />,
    },
    {
        path: '/history',
        element: <HistoricalPage />,
    },

    {
        path: '/games',
        element: <GamesPage />,
    },
    {
        path: '/crossword',
        element: <CrosswordPage />,
    },
    {
        path: '/rudolf',
        element: <RudolfPage />,
    },
    {
        path: '/quiet',
        element: <QuietPage />,
    },
    {
        path: '/ball',
        element: <BallPage />,
    },
    {
        path: '/white',
        element: <WhitePage />,
    },
    {
        path: '/cheluskin',
        element: <CheluskinPage />,
    },
    {
        path: '/north',
        element: <NorthPage />,
    },
    {
        path: '/schmidt',
        element: <SchmidtPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
