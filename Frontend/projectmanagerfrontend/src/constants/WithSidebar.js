import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
const WithSidebar = ({ children }) => {
  const location = useLocation();
  const pathsWithoutSidebar = ['/login', '/signup'];

  if (pathsWithoutSidebar.includes(location.pathname)) {
    return children;
  }

  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default WithSidebar;