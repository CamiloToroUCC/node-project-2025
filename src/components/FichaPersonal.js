import React from "react";
import './FichaPersonal.css';

export default function FichaPersonal({ user }) {
  if (!user) return null; // No renderiza nada si no hay usuario seleccionado

  return (
    <div className="ficha-personal" data-testid="ficha-personal">
      <h1>Ficha de Usuario</h1>
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
      <p>Nombre: {user.name.first} {user.name.last}</p>
      <p>Email: {user.email}</p>
      <p>País: {user.location.country}</p>
    </div>
  );
}
