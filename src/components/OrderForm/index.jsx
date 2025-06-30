import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function OrderForm({ show, handleClose, handleSubmit, initialData }) {
  const [formData, setFormData] = useState({
    client: '',
    total: '',
    status: 'pendente',
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        client: initialData.client,
        total: initialData.total,
        status: initialData.status,
      });
    } else {
      setFormData({ client: '', total: '', status: 'pendente' });
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Editar Pedido' : 'Novo Pedido'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Cliente</Form.Label>
            <Form.Control type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Digite o nome do cliente" required />
          </Form.Group>
          
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Total (R$)</Form.Label>
                <Form.Control type="number" name="total" value={formData.total} onChange={handleChange} placeholder="0.00" step="0.01" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="pendente">Pendente</option>
                  <option value="processando">Processando</option>
                  <option value="concluido">Concluído</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Atualizar Pedido' : 'Criar Pedido'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}