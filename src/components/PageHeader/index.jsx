import React from 'react';
import Button from '../Button'; // Importa nosso botão customizado
import { Plus } from 'lucide-react'; // 1. Importa o ícone necessário
import './style.scss';

const PageHeader = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="page-header">
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-action">
        {/* 2. Passa o componente 'Plus' para a prop 'icon' do Button */}
        <Button 
          onClick={onButtonClick} 
          variant="primary" 
          size="add" // Usando o tamanho que definimos
          icon={Plus} // Passando o ícone aqui
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;