import { useState, useMemo } from 'react';
import './style.scss';
import { useToast } from '../../Hooks/useToast';
import { Search, Edit, Trash2, User } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import SearchInput from '../../components/SearchInput';
import SelectInput from '../../components/SelectInput';
import InfoCard from '../../components/InfoCard';
import DataTable from '../../components/Data';

const Clientes = () => {

    const { toast } = useToast();

    const [clients, setClients] = useState([
        { 
            id: 1, 
            name: 'João Silva', 
            email: 'joao@email.com', 
            phone: '(11) 99999-1111', 
            address: 'Rua A, 123' 
        },
        { 
            id: 2, 
            name: 'Maria Santos', 
            email: 'maria@email.com', 
            phone: '(11) 99999-2222', 
            address: 'Rua B, 456' 
        },
        { 
            id: 3, 
            name: 'Pedro Costa', 
            email: 'pedro@email.com', 
            phone: '(11) 99999-3333', 
            address: 'Rua C, 789' 
        },
        { 
            id: 4, 
            name: 'Isabela Souza', 
            email: 'isabela@email.com', 
            phone: '(11) 99999-4444', 
            address: 'Rua D, 345' 
        }
    ]);

        const [searchTerm, setSearchTerm] = useState('');
        const [showForm, setShowForm] = useState(false);
        const [editingClient, setEditingClient] = useState(null);
        const [orderBy, setOrderBy] = useState('name_asc');

    const filteredAndSortedClients = useMemo(() => {
        const filtered = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const [field, direction] = orderBy.split('_');

        return filtered.sort((a, b) => {
        if (a[field] < b[field]) {
            return direction === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
        });
    }, [clients, searchTerm, orderBy]);

    const handleCreateClient = (clientData) => {
        const newClient = {
        ...clientData,
        id: Math.max(...clients.map(c => c.id), 0) + 1
        };
        setClients(prev => [...prev, newClient]);
        setShowForm(false);
        toast({
        title: "Cliente criado com sucesso!",
        description: `${newClient.name} foi adicionado ao sistema.`,
        });
    };

    const handleEditClient = (clientData) => {
        if (!editingClient) return;
        setClients(prev => prev.map(c => 
        c.id === editingClient.id ? { ...clientData, id: editingClient.id } : c
        ));
        setEditingClient(null);
        setShowForm(false);
        toast({
        title: "Cliente atualizado com sucesso!",
        description: `${clientData.name} foi atualizado.`,
        });
    };

    const handleDeleteClient = (id) => {
        const client = clients.find(c => c.id === id);
        setClients(prev => prev.filter(c => c.id !== id));
        toast({
        title: "Cliente removido",
        description: `${client?.name} foi removido do sistema.`,
        variant: "destructive",
        });
    };

    const startEdit = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };
    
    const startCreate = () => {
        setEditingClient(null);
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingClient(null);
    };

    const columns = [
        { key: 'name', label: 'Nome', render: (client) => (
        <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span>{client.name}</span>
        </div>
        )},
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Telefone' },
        { key: 'address', label: 'Endereço' },
        { key: 'actions', label: 'Ações', render: (client) => (
        <div className="flex space-x-1">
            <button onClick={() => startEdit(client)} className="action-button edit-button">
            <Edit className="w-4 h-4" />
            </button>
            <button onClick={() => handleDeleteClient(client.id)} className="action-button delete-button">
            <Trash2 className="w-4 h-4" />
            </button>
        </div>
        )}
    ];

    const orderOptions = [
        { value: 'name_asc', label: 'Nome (A-Z)' },
        { value: 'name_desc', label: 'Nome (Z-A)' },
        { value: 'email_asc', label: 'Email (A-Z)' },
        { value: 'email_desc', label: 'Email (Z-A)' },
    ];

    if (showForm) {
        return (
        <div className="page-container">
            <ClientForm
            client={editingClient || undefined}
            onSubmit={editingClient ? handleEditClient : handleCreateClient}
            onCancel={cancelForm}
            />
        </div>
        );
    }
  

    return (
        <div className="page-container">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie os clientes do seu mercado"
                buttonText="Novo Cliente"
                onButtonClick={startCreate}
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
                        value={filteredAndSortedClients.length}
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredAndSortedClients}
            />

            {filteredAndSortedClients.length === 0 && (
                <div className="empty-state">
                <p>
                    {searchTerm ? 'Nenhum cliente encontrado para sua pesquisa.' : 'Nenhum cliente cadastrado.'}
                </p>
                </div>
            )}
        </div>
    );
};

export default Clientes;