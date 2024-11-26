// src/components/ExhibitionsTable.jsx
import React, { useState } from 'react';
import ModalForm from './ModalForm';
import '../Styles/ExhibitionsTable.css';

const initialExhibitions = [
  { id: 1, name: "El Cuerpo Humano", startDate: "2023-04-01", endDate: "2023-08-31", image: "/placeholder.svg" },
  { id: 2, name: "Explorando el Espacio", startDate: "2023-05-15", endDate: "2023-09-15", image: "/placeholder.svg" },
  { id: 3, name: "Mundo Submarino", startDate: "2023-06-01", endDate: "2023-10-31", image: "/placeholder.svg" },
];

export default function ExhibitionsTable() {
  const [exhibitions, setExhibitions] = useState(initialExhibitions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExhibition, setCurrentExhibition] = useState(null);

  const handleAdd = () => {
    setCurrentExhibition(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const exhibitionToEdit = exhibitions.find((item) => item.id === id);
    setCurrentExhibition(exhibitionToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setExhibitions(exhibitions.filter((item) => item.id !== id));
  };

  const handleSubmit = (data) => {
    if (currentExhibition) {
      setExhibitions(exhibitions.map((item) => (item.id === currentExhibition.id ? data : item)));
    } else {
      setExhibitions([...exhibitions, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="exhibitions-table">
      <div className="exhibitions-header">
        <h2 className="section-title">Exposiciones</h2>
        <button className="btn-add" onClick={handleAdd}>
          Añadir Exposición
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {exhibitions.map((item) => (
            <tr key={item.id}>
              <td><img src={item.image} alt={item.name} className="table-image" /></td>
              <td>{item.name}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(item.id)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentExhibition ? "Editar Exposición" : "Añadir Exposición"} onSubmit={handleSubmit}>
        <form>
          <label>
            Nombre:
            <input type="text" defaultValue={currentExhibition ? currentExhibition.name : ''} />
          </label>
          <label>
            Inicio:
            <input type="date" defaultValue={currentExhibition ? currentExhibition.startDate : ''} />
          </label>
          <label>
            Fin:
            <input type="date" defaultValue={currentExhibition ? currentExhibition.endDate : ''} />
          </label>
          <label>
            Imagen:
            <input type="text" defaultValue={currentExhibition ? currentExhibition.image : ''} />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </ModalForm>}
    </div>
  );
}