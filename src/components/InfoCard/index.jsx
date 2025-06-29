import React from 'react';
import './style.scss';

const InfoCard = ({ label, value }) => {
  return (
    <div className="info-card">
      <span className="info-card-label">{label}</span>
      <span className="info-card-value">{value}</span>
    </div>
  );
};

export default InfoCard;