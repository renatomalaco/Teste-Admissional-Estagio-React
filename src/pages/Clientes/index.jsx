import { useState } from 'react';
import './style.scss';
import { Search, Filter } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import SearchInput from '../../components/SearchInput';
import SelectInput from '../../components/SelectInput';
import InfoCard from '../../components/InfoCard';
import DataTable from '../../components/Data';

const mockClients = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(16) 99999-1111', address: 'Rua A, 123' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(16) 99999-2222', address: 'Rua B, 456' },
    { id: 3, name: 'Isabela Souza', email: 'isabela@email.com', phone: '(16) 99999-4444', address: 'Rua D, 345' },
    { id: 4, name: 'Pedro Costa', email: 'pedro@email.com', phone: '(16) 99999-3333', address: 'Rua C, 789' },
];

const Clientes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('');

    const handleNewClient = () => alert('Abrir formulário de novo cliente...');
    const handleDeleteClient = (id) => alert(`Deletar cliente ID: ${id}`);

    const filteredClients = mockClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Telefone' },
        { key: 'address', label: 'Endereço' },
    ];

    const orderOptions = [
        { value: 'name_asc', label: 'Nome (A-Z)' },
        { value: 'name_desc', label: 'Nome (Z-A)' },
    ];

    return (
        <div className="page-container">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie os clientes do seu mercado"
                buttonText="Novo Cliente"
                onButtonClick={handleNewClient}
            />

            <div className="controls-bar">
                <div className="filters">
                    <SearchInput
                        icon={Search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Pesquisar clientes..."
                    />
                    <SelectInput
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}
                        options={orderOptions}
                        placeholder="Ordenar por:"
                    />
                </div>
                <div className="info">
                    <InfoCard
                        label="Total de Clientes"
                        value={filteredClients.length}
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredClients}
                onDelete={handleDeleteClient}
            />
        </div>
    );
};

export default Clientes;