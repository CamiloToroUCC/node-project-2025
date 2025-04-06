import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renderiza título principal', () => {
  render(<App />);
  const titleElement = screen.getByText(/Random People/i);
  expect(titleElement).toBeInTheDocument();
});

test('el botón "Ficha Personal" se renderiza y funciona correctamente', () => {
  render(<App />);
  
  // Verificar que el botón de ficha personal existe
  const fichaButton = screen.getByText(/Ficha Personal/i);
  expect(fichaButton).toBeInTheDocument();
  
  // Simular un clic en el botón sin seleccionar usuario, se debería mostrar una alerta
  // Nota: Para testear alert(), necesitarás hacer un mock de window.alert:
  window.alert = jest.fn();
  fireEvent.click(fichaButton);
  expect(window.alert).toHaveBeenCalledWith('Por favor, selecciona un usuario primero.');
});
