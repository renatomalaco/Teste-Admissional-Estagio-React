import StatCard from '../../components/StatCard';
import { Users, Package, ShoppingCart } from 'lucide-react';
import './style.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <StatCard title="Total de Clientes" value="3" icon={Users} />
      <StatCard title="Produtos em Estoque" value="6" icon={Package} />
      <StatCard title="Pedidos Ativos" value="3" icon={ShoppingCart} />
    </div>
  );
};

export default Dashboard;