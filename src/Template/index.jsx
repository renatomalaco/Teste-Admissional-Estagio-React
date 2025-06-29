import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import './style.scss';

const TemplateLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="content-area">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default TemplateLayout;