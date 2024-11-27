import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js'; // Importa tu configuración de Firebase
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

export default function ExhibitionsTable() {
  const [obras, setObras] = useState([]); // Almacenar documentos de "Obras"
  const [currentObra, setCurrentObra] = useState(null); // Obra seleccionada para editar
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para cargar las obras desde Firestore
  const fetchObras = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Obras'));
      const data = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const imagesSnapshot = await getDocs(collection(doc.ref, 'Images')); // Carga subcolección "Images"
          const images = imagesSnapshot.docs.map((imgDoc) => ({
            id: imgDoc.id,
            ...imgDoc.data(),
          }));
          return { id: doc.id, ...doc.data(), images };
        })
      );
      setObras(data);
    } catch (error) {
      console.error('Error al cargar las obras:', error);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  const handleAdd = () => {
    setCurrentObra(null); // Resetea la obra actual al agregar una nueva
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const obraToEdit = obras.find((item) => item.id === id);
    setCurrentObra(obraToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Obras', id)); // Elimina el documento
      fetchObras(); // Recargar datos
    } catch (error) {
      console.error('Error al eliminar la obra:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (currentObra) {
        // Actualiza la obra existente
        await updateDoc(doc(db, 'Obras', currentObra.id), data);
      } else {
        // Agrega una nueva obra
        await addDoc(collection(db, 'Obras'), data);
      }
      setIsModalOpen(false);
      fetchObras();
    } catch (error) {
      console.error('Error al guardar la obra:', error);
    }
  };

  return (
    <div className="exhibitions-table">
      <div className="exhibitions-header">
        <h2 className="section-title">Obras</h2>
        <button className="btn-add" onClick={handleAdd}>
          Añadir Obra
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id}>
              <td>
                <img
                  src={obra.thumbnailImageRes} // Imagen principal
                  alt={obra.title}
                  className="table-image"
                />
              </td>
              <td>{obra.title}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(obra.id)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(obra.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentObra ? 'Editar Obra' : 'Añadir Obra'}
          onSubmit={handleSubmit}
          obra={currentObra}
        />
      )}
    </div>
  );
}
