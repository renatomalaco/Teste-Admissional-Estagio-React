import { SquarePen, Trash } from 'lucide-react';
import './style.scss';

const categoryColors = {
  'Alimentos': 'primary',
  'Bebidas': 'info',
  'Limpeza': 'danger',
  'Padaria': 'warning',
};

export default function ProductCard({ product, onEdit, onDelete }) {
  const badgeColor = categoryColors[product.category] || 'secondary';

  return (
    <div className="card product-card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-1">{product.name}</h5>
            <h4 className="card-price">R$ {product.price.toFixed(2).replace('.', ',')}</h4>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm border-0 btn-icon" onClick={() => onEdit(product)}>
              <SquarePen size={18} color="#1976D2" />
            </button>
            <button className="btn btn-sm border-0 btn-icon" onClick={() => onDelete(product.id)}>
              <Trash size={18} color="#FB3737" />
            </button>
          </div>
        </div>

        <p className="card-text small flex-grow-1">{product.description}</p>
        
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
          <span className={`badge bg-${badgeColor}`}>{product.category}</span>
          <span className="fw-bold">{product.stock} unidades</span>
        </div>
      </div>
    </div>
  );
}