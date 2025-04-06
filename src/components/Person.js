import React from 'react';
import './Person.css';

function Person({ person, onSelect, isSelected }) {
  // Estilos dinámicos basados en la prop isSelected
  const personStyle = {
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    border: isSelected ? '2px solid blue' : 'none',
    cursor: 'pointer',
  };

  return (
    <div className="Person" style={personStyle} onClick={() => onSelect(person)}>
      <div className="Person-image">
        <img
          alt={`${person.name.title} ${person.name.first}`}
          src={person.picture.medium}
        />
      </div>
      <div className="Person-name">
        {person.name.title} {person.name.first}
      </div>
      <div className="Person-location">
        {person.location.city} <br /> {person.location.state}
      </div>
    </div>
  );
}

export default Person;
