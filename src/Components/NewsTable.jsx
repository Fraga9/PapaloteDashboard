// src/components/NewsTable.jsx
import React, { useState } from 'react';
import ModalForm from './ModalForm';
import '../Styles/NewsTable.css';

const initialNews = [
  { id: 1, title: 'Nueva exposición de dinosaurios', date: '2023-05-15', image: '/placeholder.svg' },
  { id: 2, title: 'Taller de ciencias para niños', date: '2023-06-01', image: '/placeholder.svg' },
  { id: 3, title: 'Visita especial de astronauta', date: '2023-06-15', image: '/placeholder.svg' },
];

export default function NewsTable() {
  const [news, setNews] = useState(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);

  const handleAdd = () => {
    setCurrentNews(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const newsToEdit = news.find((item) => item.id === id);
    setCurrentNews(newsToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setNews(news.filter((item) => item.id !== id));
  };

  const handleSubmit = (data) => {
    if (currentNews) {
      setNews(news.map((item) => (item.id === currentNews.id ? data : item)));
    } else {
      setNews([...news, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="news-table">
      <div className="news-header">
        <h2>Noticias</h2>
        <button className="btn-add" onClick={handleAdd}>
          Añadir Noticia
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.title} className="table-image" />
              </td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(item.id)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentNews ? "Editar Noticia" : "Añadir Noticia"} onSubmit={handleSubmit}>
        <form>
          <label>
            Título:
            <input type="text" defaultValue={currentNews ? currentNews.title : ''} />
          </label>
          <label>
            Fecha:
            <input type="date" defaultValue={currentNews ? currentNews.date : ''} />
          </label>
          <label>
            Imagen:
            <input type="text" defaultValue={currentNews ? currentNews.image : ''} />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </ModalForm>}
    </div>
  );
}