import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{ width: '220px', background: '#a8d5a0', padding: '1rem' }}>
      <h2>Sistema de Mercado</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/pedidos">Pedidos</Link></li>
          <li><Link to="/login">Sair</Link></li>
        </ul>
      </nav>
    </aside>
  );
}