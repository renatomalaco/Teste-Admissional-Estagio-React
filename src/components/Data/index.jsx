import React from 'react';
import { Edit, Trash2, User } from 'lucide-react'; // Importe o ícone User
import './style.scss';

const DataTable = ({ columns, data, onDelete }) => {
  // A nova imagem não tem o ícone de lixeira, mas vamos mantê-lo por enquanto.
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col.key}>{col.label}</th>)}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {columns.map((col, index) => (
                <td key={`${row.id}-${col.key}`}>
                  {/* Se for a primeira coluna (Nome), adiciona o ícone */}
                  {index === 0 && <User size={16} className="row-icon" />}
                  {row[col.key]}
                </td>
              ))}
              <td className="actions">
                <button className="action-btn edit"><Edit size={16} /></button>
                <button className="action-btn delete" onClick={() => onDelete(row.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;