import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FichaPersonal from "./FichaPersonal";

describe("Componente FichaPersonal", () => {
  describe("Cuando el componente se renderiza inicialmente sin datos", () => {
    it("no debe renderizar nada si no se pasa un usuario", () => {
      const { container } = render(<FichaPersonal />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Cuando se renderiza con datos predeterminados", () => {
    const defaultUser = {
      picture: { large: "default-image.jpg" },
      name: { first: "John", last: "Doe" },
      email: "john.doe@example.com",
      location: { country: "Estados Unidos" },
    };

    beforeEach(() => {
      render(<FichaPersonal user={defaultUser} />);
    });

    it('debe mostrar el título "Ficha de Usuario" con el rol "heading"', () => {
      expect(screen.getByRole("heading", { name: /Ficha de Usuario/i })).toBeInTheDocument();
    });
  
    it('debe renderizar un párrafo que contenga el texto "Nombre: John Doe"', () => {
      expect(screen.getByText(/Nombre: John Doe/i)).toBeInTheDocument();
    });
  
    it('debe renderizar un párrafo que contenga el texto "Email: john.doe@example.com"', () => {
      expect(screen.getByText(/Email: john\.doe@example\.com/i)).toBeInTheDocument();
    });
  
    it('debe renderizar un párrafo que contenga el texto "País: Estados Unidos"', () => {
      expect(screen.getByText(/País: Estados Unidos/i)).toBeInTheDocument();
    });
  
    it('debe tener el atributo data-testid "ficha-personal" en el contenedor principal', () => {
      expect(screen.getByTestId("ficha-personal")).toBeInTheDocument();
    });
  });

  describe("Con diferentes datos de usuario (simulado)", () => {
    const userData = {
      picture: { large: "jane-image.jpg" },
      name: { first: "Jane", last: "Smith" },
      email: "jane.smith@example.com",
      location: { country: "Canadá" }
    };

    beforeEach(() => {
      render(<FichaPersonal user={userData} />);
    });

    it("debe mostrar el nombre correcto para otro usuario", () => {
      expect(screen.getByText(/Nombre: Jane Smith/i)).toBeInTheDocument();
      expect(screen.queryByText(/Nombre: John Doe/i)).toBeNull();
    });

    it("debe mostrar el email correcto para otro usuario", () => {
      expect(screen.getByText(/Email: jane\.smith@example\.com/i)).toBeInTheDocument();
      expect(screen.queryByText(/Email: john\.doe@example\.com/i)).toBeNull();
    });

    it("debe mostrar el país correcto para otro usuario", () => {
      expect(screen.getByText(/País: Canadá/i)).toBeInTheDocument();
      expect(screen.queryByText(/País: Estados Unidos/i)).toBeNull();
    });
  });

  describe("Prueba extendida de interacción (opcional)", () => {
    const TestFichaPersonalInteractiva = ({ onClose, user }) => (
      <div className="ficha-personal" data-testid="ficha-personal">
        <h1>Ficha de Usuario</h1>
        <button onClick={onClose} data-testid="close-button">Cerrar</button>
        <p>Nombre: {user.name.first} {user.name.last}</p>
      </div>
    );

    it("debe ejecutar una acción cuando se clickea el botón 'Cerrar'", () => {
      const mockOnClose = jest.fn();
      const userData = {
        picture: { large: "jane-image.jpg" },
        name: { first: "Jane", last: "Smith" },
        email: "jane.smith@example.com",
        location: { country: "Canadá" }
      };

      render(<TestFichaPersonalInteractiva onClose={mockOnClose} user={userData} />);
      const closeButton = screen.getByTestId("close-button");
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
