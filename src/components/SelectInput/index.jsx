import { ChevronDown } from 'lucide-react'; 
import './style.scss';

const SelectInput = ({ value, onChange, options, placeholder, icon }) => {

  const IconComponent = icon || ChevronDown;

  return (
    <div className="select-input-wrapper">
      <select className="select-input" value={value} onChange={onChange}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    
      <IconComponent className="select-icon" size={20} />
    </div>
  );
};

export default SelectInput;