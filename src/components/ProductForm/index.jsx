import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function ProductForm({ show, handleClose, handleSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: initialData.name,
        price: initialData.price,
        stock: initialData.stock,
        category: initialData.category,
        description: initialData.description,
      });
    } else {
      setFormData({ name: '', price: '', stock: '', category: '', description: '' });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Editar Produto' : 'Novo Produto'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do produto" required />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Preço (R$)</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" step="0.01" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estoque</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Selecione uma categoria</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Padaria">Padaria</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição (opcional)</Form.Label>
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Digite uma descrição do produto" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Atualizar Produto' : 'Criar Produto'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}