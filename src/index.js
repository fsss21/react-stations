import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import { Provider } from 'react-redux';
import store from './store/store';
import AccessibilityHandler from './components/AccessibilityHandler';
import { LanguageProvider } from './LanguageContext';

import GamesPage from './Pages/GamesPage/index.jsx';
import CrosswordPage from './Pages/GamesPage/CrosswordPage/index.jsx';
import PuzzlePage from './Pages/GamesPage/PuzzlePage/index.jsx';
import QuizPage from './Pages/GamesPage/QuizPage/index.jsx';
import CongratsPage from './Pages/GamesPage/CongratsPage/index.jsx';
import CertificateFormPage from './Pages/GamesPage/CertificateFormPage/index.jsx';
import ThanksPage from './Pages/GamesPage/ThanksPage/index.jsx';

import PersonaliPage from './Pages/PersonaliPage/index.jsx';
import PersonDetail from './Pages/PersonaliPage/PersonDetail/index.jsx';

import FilmsPage from './Pages/FilmsPage/index.jsx';

import MainPage from './Pages/MainPage/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';

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
        path: 'personali',
        children: [
            {
                index: true,
                element: <PersonaliPage />,
            },
            {
                path: ':id',
                element: <PersonDetail />,
            },
        ],
    },
    {
        path: 'films',
        element: <FilmsPage />,
    },
    {
        path: 'puzzle',
        element: <PuzzlePage />,
    },
    {
        path: 'quiz',
        element: <QuizPage />,
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

    {
        path: 'congrats',
        element: <CongratsPage />,
    },
    {
        path: 'certificate-form',
        element: <CertificateFormPage />,
    },
    {
        path: 'thanks',
        element: <ThanksPage />,
    },
    {
        path: '*',
        element: <div>Страница не найдена</div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LanguageProvider>
        <Provider store={store}>
            <AccessibilityHandler />
            <RouterProvider router={router} />
        </Provider>
    </LanguageProvider>
);
