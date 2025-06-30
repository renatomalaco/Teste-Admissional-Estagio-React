import { useState, useEffect, useMemo } from 'react';
import { Search, SquarePen, Trash, Package, Plus } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import OrderForm from '../../components/OrderForm';
import './style.scss';

const initialOrders = [
  { id: 3, client: 'Pedro Costa', date: '15/01/2024', total: 67.80, status: 'pendente' },
  { id: 2, client: 'Maria Santos', date: '15/01/2024', total: 142.30, status: 'processando' },
  { id: 1, client: 'José Silva', date: '14/01/2024', total: 85.50, status: 'concluido' },
  { id: 4, client: 'Ana Pereira', date: '16/01/2024', total: 25.00, status: 'pendente' },
];

const statusColors = {
  pendente: 'warning',
  processando: 'primary',
  concluido: 'success',
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(year, month - 1, day);
};

const Pedidos = () => {
  const [orders, setOrders] = useState(() => {
    try {
      const storedOrders = localStorage.getItem('orders');
      return storedOrders ? JSON.parse(storedOrders) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('id-desc');

  const displayedOrders = useMemo(() => {
    let filteredOrders = orders.filter(order =>
      order.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedOrders = [...filteredOrders];
    
    switch (sortOrder) {
      case 'id-desc':
        sortedOrders.sort((a, b) => b.id - a.id);
        break;
      case 'id-asc':
        sortedOrders.sort((a, b) => a.id - b.id);
        break;
      case 'total-desc':
        sortedOrders.sort((a, b) => b.total - a.total);
        break;
      case 'total-asc':
        sortedOrders.sort((a, b) => a.total - b.total);
        break;
      case 'status':
        const statusOrder = { 'pendente': 1, 'processando': 2, 'concluido': 3 };
        sortedOrders.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      case 'date-desc':
        sortedOrders.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
      default:
        break;
    }

    return sortedOrders;
  }, [orders, searchTerm, sortOrder]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrder(null);
  };

  const handleShowModal = (order = null) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      setOrders(orders.filter(p => p.id !== orderId));
    }
  };

  const handleSubmitForm = (formData) => {
    const processedData = {
      ...formData,
      total: parseFloat(formData.total),
    };

    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...processedData } : o));
    } else {
      const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
      const newOrder = { 
        id: newId, 
        date: new Date().toLocaleDateString('pt-BR'), 
        ...processedData 
      };
      setOrders([newOrder, ...orders]);
    }
    handleCloseModal();
  };

  const totalPedidos = displayedOrders.length;

  return (
    <div className="container-fluid p-3 p-lg-4">
      <PageHeader
        title="Pedidos"
        subtitle="Gerencie os pedidos do seu mercado"
        buttonText="Novo Pedido"
        onButtonClick={() => handleShowModal()}
        buttonClassName="d-none d-lg-flex"
      />

      <div className="mt-4">
        <div className="row mb-4 g-3 align-items-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3 h-100">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0"><Search size={18} className="text-muted"/></span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Pesquisar pedidos por nome do cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="id-desc">Mais Recentes</option>
                <option value="id-asc">Mais Antigos</option>
                <option value="total-desc">Total (Maior para Menor)</option>
                <option value="total-asc">Total (Menor para Maior)</option>
                <option value="status">Status (Pendente &gt; Concluído)</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card text-center h-100">
              <div className="card-body py-3 d-flex flex-column justify-content-center">
                <h6 className="card-subtitle mb-1 text-muted">Total de Pedidos</h6>
                <p className="card-text h2 fw-bold text-primary mb-0">{totalPedidos}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card shadow-sm d-none d-lg-block">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th># Pedido</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {displayedOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Package size={18} color="#1976D2" />
                        <strong>#{order.id}</strong>
                      </div>
                    </td>
                    <td>{order.client}</td>
                    <td>{order.date}</td>
                    <td>R$ {order.total.toFixed(2).replace('.', ',')}</td>
                    <td>
                      <span className={`badge text-dark bg-${statusColors[order.status]}-subtle`}>{order.status}</span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm border-0 btn-icon" onClick={() => handleShowModal(order)}>
                          <SquarePen size={18} color="#1976D2" />
                        </button>
                        <button className="btn btn-sm border-0 btn-icon" onClick={() => handleDelete(order.id)}>
                          <Trash size={18} color="#FB3737" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-lg-none">
          {displayedOrders.map(order => (
            <div key={order.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <Package size={18} color="#1976D2" />
                    <strong className="card-title">Pedido #{order.id}</strong>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm border-0 btn-icon" onClick={() => handleShowModal(order)}>
                      <SquarePen size={18} color="#1976D2" />
                    </button>
                    <button className="btn btn-sm border-0 btn-icon" onClick={() => handleDelete(order.id)}>
                      <Trash size={18} color="#FB3737" />
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column text-muted small gap-1">
                  <span>Cliente: {order.client}</span>
                  <span>Data: {order.date}</span>
                  <span className="fw-bold">Total: R$ {order.total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="mt-3">
                  <span className={`badge text-dark bg-${statusColors[order.status]}-subtle`}>{order.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderForm 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitForm}
        initialData={editingOrder}
      />

      <button 
        className="btn btn-primary btn-lg rounded-circle d-lg-none fab-mobile"
        onClick={() => handleShowModal()}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Pedidos;