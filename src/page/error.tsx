import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Content from '../layout/content';
import Navbar from '../layout/navbar';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status == 404) {
    }
    return (
      <>
        <Navbar />
        <Content>
          <div id='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText}</i>
            </p>
          </div>
        </Content>
      </>
    );
  } else {
    return (
      <div>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }
}
