import './style.scss';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { Search, Download, SquarePen, Trash, User } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    
    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState(() => {
        try {
            const storedClients = localStorage.getItem('clients');
            return storedClients ? JSON.parse(storedClients) : mockClients;
        } catch {
            return mockClients;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('clients', JSON.stringify(clients));
        } catch (error) {
            console.error("Falha ao salvar no localStorage", error);
        }
    }, [clients]);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExportClick = () => {
        alert('Lógica de exportação seria chamada aqui!');
    };


    return (
        <div className="page-container">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie os clientes do seu mercado"
                buttonText="Novo Cliente"
                onButtonClick={() => alert('Abrir modal de novo cliente')}
            />
        
        <main className="content-area">
                {/* SEÇÃO DE FILTROS E STATS */}
                <div className="filters-and-stats">
                    <div className="filter-controls">
                        <div className="search-input-wrapper">
                            <Search className="icon" />
                            <input
                                type="text"
                                placeholder="Pesquisar clientes"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select className="sort-dropdown">
                            <option value="name">Ordenar por: Nome</option>
                            <option value="date">Ordenar por: Email</option>
                            <option value="date">Ordenar por: Endereço</option>
                        </select>
                    </div>
                    <div className="stats-container">
                        <StatCard title="Total de Clientes" value={filteredClients.length} />
                    </div>
                </div>

                {/* TABELA DE DADOS */}
                <div className="table-container">
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th className="actions-header">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td data-label="Nome"><User className="icon-cell" /> {client.name}</td>
                                    <td data-label="Email">{client.email}</td>
                                    <td data-label="Telefone">{client.phone}</td>
                                    <td data-label="Endereço">{client.address}</td>
                                    <td data-label="Ações" className="actions-cell">
                                        <button className="icon-button edit" title="Editar"><SquarePen /></button>
                                        <button className="icon-button delete" title="Excluir"><Trash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* BOTÃO DE EXPORTAR */}
                <div className="export-action">
                    <button className="export-button" onClick={handleExportClick}>
                        <Download />
                        Exportar para excel
                    </button>
                </div>
            </main>
        </div>
        
    );
};

export default Clientes;