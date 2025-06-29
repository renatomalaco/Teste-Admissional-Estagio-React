import classNames from 'classnames';
import './style.scss';

const StatCard = ({ title, value, icon: Icon, active }) => {
  return (
    <div className={classNames('stat-card', { 'stat-card--active': active })}>
      <div className="card-info">
        <span className="card-title">{title}</span>
        <span className="card-value">{value}</span>
      </div>
      {Icon && (
        <div className="card-icon">
          <Icon size={28} />
        </div>
      )}
    </div>
  );
};

export default StatCard;