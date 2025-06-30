import { useContext } from 'react';
import { DataContext } from '../../services/DataContext';
import StatCard from '../../components/StatCard';
import { Users, Package, ShoppingCart } from 'lucide-react';
import './style.scss';

const Dashboard = () => {

  const { clients, products, orders } = useContext(DataContext);

  const activeOrders = orders.filter(order => order.status !== 'concluido').length;

  return (
    <div className="dashboard-page">
      <StatCard title="Total de Clientes" value={clients.length} icon={Users} />
      <StatCard title="Produtos em Estoque" value={products.length} icon={Package} />
      <StatCard title="Pedidos Ativos" value={activeOrders} icon={ShoppingCart} />
    </div>
  );
};

export default Dashboard;