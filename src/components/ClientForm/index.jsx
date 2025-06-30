import { useState, useEffect } from 'react';
import './style.scss'; // Criaremos este arquivo a seguir

const ClientForm = ({ show, handleClose, handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Se 'initialData' existir (modo de edição), preenche o formulário.
    // Senão, reseta para os valores iniciais (modo de criação).
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', email: '', phone: '', address: '' });
    }
  }, [initialData, show]);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <button onClick={handleClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={onFormSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Endereço</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={handleClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;