import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, LogOut } from 'lucide-react';
import logo from '../../../public/images/logoPrincipal.png';
import './style.scss';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('products');
      localStorage.removeItem('clients');
      localStorage.removeItem('orders');
      navigate('/');
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Sistema de Mercado" className="sidebar-logo" />
        <span className="sidebar-title">Sistema de Mercado</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes">
              <Users size={20} />
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/produtos">
              <Package size={20} />
              <span>Produtos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/pedidos">
              <ShoppingCart size={20} />
              <span>Pedidos</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;