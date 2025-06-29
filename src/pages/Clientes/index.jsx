import './style.scss';
import PageHeader from '../../components/PageHeader';


const Clientes = () => {
    
    return (
        <div className="page-container">
            <PageHeader
                title="Clientes"
                subtitle="Gerencie os clientes do seu mercado"
                buttonText="Novo Cliente"
            />

            
        </div>
    );
};

export default Clientes;