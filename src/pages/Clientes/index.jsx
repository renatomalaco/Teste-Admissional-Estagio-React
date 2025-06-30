import { useState, useEffect, useMemo } from 'react';
import { Search, SquarePen, Trash, User, Plus, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import PageHeader from '../../components/PageHeader';
import ClientForm from '../../components/ClientForm';
import './style.scss';

const mockClients = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(16) 99999-1111', address: 'Rua A, 123' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(16) 99999-2222', address: 'Rua B, 456' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', phone: '(16) 99999-3333', address: 'Rua C, 789' },
    { id: 4, name: 'Isabela Souza', email: 'isabela@email.com', phone: '(16) 99999-4444', address: 'Rua D, 345' },
];

const Clientes = () => {
  const [clients, setClients] = useState(() => {
    try {
        const storedClients = localStorage.getItem('clients');
        return storedClients ? JSON.parse(storedClients) : mockClients;
    } catch { return mockClients; }
  });

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');

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
      case 'phone-asc':
        filtered.sort((a, b) => a.phone.localeCompare(b.phone));
        break;
      case 'address-asc':
        filtered.sort((a, b) => a.address.localeCompare(b.address));
        break;
      default:
        break;
    }
    return filtered;
  }, [clients, searchTerm, sortOrder]);

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
    if (displayedClients.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const dataToExport = displayedClients.map(client => ({
      'Nome': client.name,
      'Email': client.email,
      'Telefone': client.phone,
      'Endereço': client.address,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    XLSX.writeFile(workbook, "ListaDeClientes.xlsx");
  };

  return (
    <div className="container-fluid p-3 p-md-4">
      <PageHeader
        title="Clientes"
        subtitle="Gerencie os clientes do seu mercado"
        buttonText="Novo Cliente"
        onButtonClick={() => handleShowModal()}
        buttonClassName="d-none d-lg-flex"
      />

      <div className="mt-4">
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
                <option value="name-asc">Ordenar por: Nome (A-Z)</option>
                <option value="name-desc">Ordenar por: Nome (Z-A)</option>
                <option value="email-asc">Ordenar por: Email</option>
                <option value="phone-asc">Ordenar por: Telefone</option>
                <option value="address-asc">Ordenar por: Endereço</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card text-center h-100">
              <div className="card-body py-2 d-flex flex-column justify-content-center">
                <h6 className="card-subtitle mb-1 text-muted">Total de Clientes</h6>
                <p className="card-text h2 fw-bold text-primary mb-0">{displayedClients.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card shadow-sm d-none d-lg-block">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {displayedClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <User size={18} className="text-muted" />
                        <strong>{client.name}</strong>
                      </div>
                    </td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn btn-sm border-0 btn-icon" onClick={() => handleShowModal(client)}>
                          <SquarePen size={18} color="#1976D2" />
                        </button>
                        <button className="btn btn-sm border-0 btn-icon" onClick={() => handleDelete(client.id)}>
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

        <div className="text-end mt-3 d-none d-lg-block">
          <button className="btn btn-success" onClick={handleExportClick}>
            <Download size={16} className="me-2" />
            Exportar para Excel
          </button>
        </div>

        <div className="d-lg-none">
          {displayedClients.map(client => (
            <div key={client.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <User size={18} className="text-primary" />
                    <strong className="card-title">{client.name}</strong>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm border-0 btn-icon" onClick={() => handleShowModal(client)}>
                      <SquarePen size={18} color="#1976D2" />
                    </button>
                    <button className="btn btn-sm border-0 btn-icon" onClick={() => handleDelete(client.id)}>
                      <Trash size={18} color="#FB3737" />
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column text-muted small gap-1">
                  <span>{client.email}</span>
                  <span>{client.phone}</span>
                  <span>{client.address}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="text-end mt-3">
            <button className="btn btn-success btn-sm" onClick={handleExportClick}>
              <Download size={16} className="me-2" />
              Exportar para Excel
            </button>
          </div>
        </div>
      </div>

      <ClientForm 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitForm}
        initialData={editingClient}
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

export default Clientes;