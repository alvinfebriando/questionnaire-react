import { Outlet } from 'react-router-dom';
import Content from './content';
import Navbar from './navbar';

const AppLayout = () => (
  <>
    <Navbar />
    <Content>
      <Outlet />
    </Content>
  </>
);

export default AppLayout;
