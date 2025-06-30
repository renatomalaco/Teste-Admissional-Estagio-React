import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import ProductCard from '../../components/ProductCard';
import ProductForm from '../../components/ProductForm';
import './style.scss';

const initialProducts = [
  { id: 1, name: 'Leite Integral 1L', price: 4.99, category: 'Alimentos', stock: 50, description: 'Leite integral pasteurizado' },
  { id: 2, name: 'Pão Francês', price: 0.50, category: 'Padaria', stock: 150, description: 'Pão francês fresquinho' },
  { id: 3, name: 'Refrigerante Cola 2L', price: 8.90, category: 'Bebidas', stock: 30, description: 'Refrigerante sabor cola' },
  { id: 4, name: 'Detergente 500ml', price: 3.50, category: 'Limpeza', stock: 80, description: 'Detergente líquido para louças' },
  { id: 5, name: 'Arroz Agulhinha 5kg', price: 24.90, category: 'Alimentos', stock: 40, description: 'Arroz branco tipo 1' },
  { id: 6, name: 'Sabão em Pó 1kg', price: 15.75, category: 'Limpeza', stock: 60, description: 'Sabão em pó para roupas' },
];

const Produtos = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const displayedProducts = useMemo(() => {
    let filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filteredProducts;
  }, [products, searchTerm, sortOrder]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleShowModal = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSubmitForm = (formData) => {
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...processedData } : p));
    } else {
      const newProduct = { id: Date.now(), ...processedData };
      setProducts([...products, newProduct]);
    }
    handleCloseModal();
  };

  const totalProdutos = displayedProducts.length;

  return (
    <div className="container-fluid p-3 p-md-4">
      <PageHeader
        title="Produtos"
        subtitle="Gerencie seus produtos"
        buttonText="Novo Produto"
        onButtonClick={() => handleShowModal()}
        buttonClassName="d-none d-md-flex"
      />

      <div className="mt-4">
        <div className="row mb-4 g-3">
          <div className="col-md-8">
            <div className="d-flex flex-column gap-3 h-100">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0"><Search size={18} className="text-muted"/></span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Pesquisar produtos..."
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
                <option value="price-asc">Preço (Menor para Maior)</option>
                <option value="price-desc">Preço (Maior para Menor)</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body py-3 d-flex flex-column justify-content-center">
                <h6 className="card-subtitle mb-1 text-muted">Total de Produtos</h6>
                <p className="card-text h2 fw-bold text-primary mb-0">{totalProdutos}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row g-4">
          {displayedProducts.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <ProductCard 
                product={product} 
                onEdit={handleShowModal}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>

      <ProductForm 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitForm}
        initialData={editingProduct}
      />

      <button 
        className="btn btn-primary btn-lg rounded-circle d-md-none fab-mobile"
        onClick={() => handleShowModal()}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Produtos;