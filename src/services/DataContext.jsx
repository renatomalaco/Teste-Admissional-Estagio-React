import { createContext, useState, useEffect } from 'react';

// Dados iniciais que estavam nas páginas (se o localStorage estiver vazio)
const mockClients = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(16) 99999-1111', address: 'Rua A, 123' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(16) 99999-2222', address: 'Rua B, 456' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', phone: '(16) 99999-3333', address: 'Rua C, 789' },
    { id: 4, name: 'Isabela Souza', email: 'isabela@email.com', phone: '(16) 99999-4444', address: 'Rua D, 345' },
];

const mockProducts = [
  { id: 1, name: 'Leite Integral 1L', price: 4.99, category: 'Alimentos', stock: 50, description: 'Leite integral pasteurizado' },
  { id: 2, name: 'Pão Francês', price: 0.50, category: 'Padaria', stock: 150, description: 'Pão francês fresquinho' },
  { id: 3, name: 'Refrigerante Cola 2L', price: 8.90, category: 'Bebidas', stock: 30, description: 'Refrigerante sabor cola' },
  { id: 4, name: 'Detergente 500ml', price: 3.50, category: 'Limpeza', stock: 80, description: 'Detergente líquido para louças' },
  { id: 5, name: 'Arroz Agulhinha 5kg', price: 24.90, category: 'Alimentos', stock: 40, description: 'Arroz branco tipo 1' },
  { id: 6, name: 'Sabão em Pó 1kg', price: 15.75, category: 'Limpeza', stock: 60, description: 'Sabão em pó para roupas' },
];

const mockOrders = [
  { id: 3, client: 'Pedro Costa', date: '15/01/2024', total: 67.80, status: 'pendente' },
  { id: 2, client: 'Maria Santos', date: '15/01/2024', total: 142.30, status: 'processando' },
  { id: 1, client: 'José Silva', date: '14/01/2024', total: 85.50, status: 'concluido' },
];


export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    
    // Estado para Clientes
    const [clients, setClients] = useState(() => {
        try {
            const stored = localStorage.getItem('clients');
            return stored ? JSON.parse(stored) : mockClients;
        } catch { return mockClients; }
    });
    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
    }, [clients]);

    // Estado para Produtos
    const [products, setProducts] = useState(() => {
        try {
            const stored = localStorage.getItem('products');
            return stored ? JSON.parse(stored) : mockProducts;
        } catch { return mockProducts; }
    });
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Estado para Pedidos
    const [orders, setOrders] = useState(() => {
        try {
            const stored = localStorage.getItem('orders');
            return stored ? JSON.parse(stored) : mockOrders;
        } catch { return mockOrders; }
    });
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const contextValue = {
        clients,
        setClients,
        products,
        setProducts,
        orders,
        setOrders,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};