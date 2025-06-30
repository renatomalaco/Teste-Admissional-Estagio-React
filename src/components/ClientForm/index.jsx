import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function ClientForm({ show, handleClose, handleSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
      });
    } else {
      setFormData({ name: '', email: '', phone: '', address: '' });
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
        <Modal.Title>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do cliente" required />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="exemplo@email.com" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="(99) 99999-9999" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Rua, Número, Bairro" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Atualizar Cliente' : 'Criar Cliente'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}