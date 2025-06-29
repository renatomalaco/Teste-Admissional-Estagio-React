import Button from '../Button';
import { Plus } from 'lucide-react';
import './style.scss';

const PageHeader = ({ title, subtitle, buttonText, onButtonClick, buttonClassName = '' }) => {
  return (
    <div className="page-header">
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-action">
        <Button onClick={onButtonClick} size="medium" icon={Plus}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;