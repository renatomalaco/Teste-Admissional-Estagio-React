import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import Header from '../../components/Header';
import './style.scss';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="content-area">
          
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;