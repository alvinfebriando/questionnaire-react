import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/appLayout';
import AnswerSimulator from './page/answerSimulator';
import ErrorPage from './page/error';
import Home from './page/home';
import Survey from './page/survey';

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
        path: '/survey',
        element: <Survey />,
      },
      {
        path: '/simulate',
        element: <AnswerSimulator />,
      },
    ],
  },
]);

export default router;
