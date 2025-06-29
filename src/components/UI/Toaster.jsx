import { useToast } from '../../Hooks/useToast';
import { X } from 'lucide-react';

const toasterStyles = {
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const toastStyles = {
  background: '#1f2937', 
  color: '#f9fafb', 
  padding: '1rem',
  borderRadius: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
};

const toastDestructiveStyles = {
  ...toastStyles,
  background: '#dc2626', // bg-red-600
  color: 'white',
};

const closeButtonStyles = {
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
};


export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div style={toasterStyles}>
      {toasts.map(function ({ id, title, description, variant, ...props }) {
        const isDestructive = variant === 'destructive';
        return (
          <div key={id} style={isDestructive ? toastDestructiveStyles : toastStyles}>
            <div style={{ flexGrow: 1 }}>
              {title && <h3 style={{ fontWeight: '600' }}>{title}</h3>}
              {description && <p style={{ fontSize: '0.875rem' }}>{description}</p>}
            </div>
            <button onClick={() => dismiss(id)} style={closeButtonStyles}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}