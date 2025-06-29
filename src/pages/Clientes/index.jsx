// import { useState } from 'react';
import './style.scss';
import { Search, Filter } from 'lucide-react';
import SearchInput from '../../components/SearchInput';
// import SelectInput from '../../components/SelectInput';

const Clientes = () => {

  // const [searchTerm, setSearchTerm] = useState('');
  // const [orderBy, setOrderBy] = useState('');

  // const orderOptions = [
  //       { value: 'name_asc', label: 'Nome (A-Z)' },
  //       { value: 'name_desc', label: 'Nome (Z-A)' },
  //   ];

  return(
    <div className="controls-bar">
      <div className="filters">
        <SearchInput
            icon={Search}
            value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar clientes..."
        />
        {/* <SelectInput
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            options={orderOptions}
            placeholder="Ordenar por:"
        /> */}
      </div>
    </div>
  );
};