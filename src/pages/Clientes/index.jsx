import './style.scss';
import PageHeader from '../../components/PageHeader';
import { Search, Download, SquarePen, Trash, User, Plus } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import ClientForm from '../../components/ClientForm';

const mockClients = [
    { 
        id: 1, 
        name: 'João Silva', 
        email: 'joao@email.com', 
        phone: '(16) 99999-1111', 
        address: 'Rua A, 123' 
    },
    { 
        id: 2, 
        name: 'Maria Santos', 
        email: 'maria@email.com', 
        phone: '(16) 99999-2222', 
        address: 'Rua B, 456' 
    },
    { 
        id: 3, 
        name: 'Pedro Costa', 
        email: 'pedro@email.com', 
        phone: '(16) 99999-3333', 
        address: 'Rua C, 789' 
    },
    { 
        id: 4, 
        name: 'Isabela Souza', 
        email: 'isabela@email.com', 
        phone: '(16) 99999-4444', 
        address: 'Rua D, 345' 
    },
];

const Clientes = () => {
  // Lógica de estado e localStorage
  const [clients, setClients] = useState(() => {
    try {
        const storedClients = localStorage.getItem('clients');
        return storedClients ? JSON.parse(storedClients) : mockClients;
    } catch { return mockClients; }
  });
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  // Estados para UI e dados
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Filtra e ordena os clientes com useMemo para otimização
  const displayedClients = useMemo(() => {
    let filtered = [...clients].filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'email-asc':
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'address-asc':
        filtered.sort((a, b) => a.address.localeCompare(b.address));
        break;
      default:
        break;
    }
    return filtered;
  }, [clients, searchTerm, sortOrder]);

  // Handlers para o Modal e CRUD
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  const handleShowModal = (client = null) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleDelete = (clientId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(c => c.id !== clientId));
    }
  };

  const handleSubmitForm = (formData) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...formData } : c));
    } else {
      const newClient = { id: Date.now(), ...formData };
      setClients([...clients, newClient]);
    }
    handleCloseModal();
  };
  
  const handleExportClick = () => {
    alert('Lógica de exportação para Excel seria chamada aqui!');
  };

  return (
    // Estrutura de layout inspirada em Bootstrap, como na página de Produtos
    <div className="container-fluid p-3 p-md-4">
      <PageHeader
        title="Clientes"
        subtitle="Gerencie os clientes do seu mercado"
        buttonText="Novo Cliente"
        onButtonClick={() => handleShowModal()}
      />

      <div className="mt-4">
        {/* Filtros e Card de Stats */}
        <div className="row mb-4 g-3">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3 h-100">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0"><Search size={18} className="text-muted"/></span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Pesquisar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Ordenar por...</option>
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="email-asc">Ordenar por: Email</option>
                <option value="address-asc">Ordenar por: Endereço</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card text-center h-100">
              <div className="card-body py-3 d-flex flex-column justify-content-center">
                <h6 className="card-subtitle mb-1 text-muted">Total de Clientes</h6>
                <p className="card-text h2 fw-bold text-primary mb-0">{displayedClients.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabela de Clientes */}
        {/* <div className="table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Nome</th><th>Email</th><th>Telefone</th><th>Endereço</th><th className="actions-header">Ações</th>
              </tr>
            </thead>
            <tbody>
              {displayedClients.map((client) => (
                <tr key={client.id}>
                  <td data-label="Nome"><User className="icon-cell" /> {client.name}</td>
                  <td data-label="Email">{client.email}</td>
                  <td data-label="Telefone">{client.phone}</td>
                  <td data-label="Endereço">{client.address}</td>
                  <td data-label="Ações" className="actions-cell">
                    <button onClick={() => handleShowModal(client)} className="icon-button edit" title="Editar"><SquarePen /></button>
                    <button onClick={() => handleDelete(client.id)} className="icon-button delete" title="Excluir"><Trash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Endereço</th>
                  <th scope="col" className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {displayedClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {/* Mantendo o ícone de User como pedido */}
                        <User size={18} className="text" />
                        <strong>{client.name}</strong>
                      </div>
                    </td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn btn-sm border-0 btn-icon" onClick={() => handleShowModal(client)} title="Editar">
                          <SquarePen size={18} className="text-primary" />
                        </button>
                        <button className="btn btn-sm border-0 btn-icon" onClick={() => handleDelete(client.id)} title="Excluir">
                          <Trash size={18} className="text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        
        {/* Botão Exportar */}
        <div className="export-action">
            <button className="export-button" onClick={handleExportClick}><Download /> Exportar para excel</button>
        </div>
      </div>

      {/* Modal de Formulário */}
      <ClientForm 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitForm}
        initialData={editingClient}
      />

      {/* Botão Flutuante para Mobile (FAB) */}
      <button 
        className="btn btn-primary btn-lg rounded-circle d-lg-none fab-mobile"
        onClick={() => handleShowModal()}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Clientes;