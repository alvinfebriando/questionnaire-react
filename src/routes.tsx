import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/appLayout';
import ErrorPage from './page/error';
import Home from './page/home';
import Question from './page/question';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/question',
        element: <Question />,
      },
    ],
  },
]);

export default router;
