import React, { useState, useEffect } from 'react';
import ModalForm from './ModalForm';
import { db } from '../firebase.js'; // Ensure Firebase config is properly imported
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function NewsTable() {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);

  // Fetch news from Firebase
  const fetchNews = async () => {
    const querySnapshot = await getDocs(collection(db, "news"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAdd = () => {
    setCurrentNews(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const newsToEdit = news.find((item) => item.id === id);
    setCurrentNews(newsToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "news", id));
    fetchNews();
  };

  const handleSubmit = async (data) => {
    if (currentNews) {
      const docRef = doc(db, "news", currentNews.id);
      await updateDoc(docRef, data);
    } else {
      await addDoc(collection(db, "news"), data);
    }
    setIsModalOpen(false);
    fetchNews();
  };

  return (
    <div className="news-table">
      <div className="news-header">
        <h2>Noticias</h2>
        <button className="btn-add" onClick={handleAdd}>Añadir Noticia</button>
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
              <td><img src={item.image} alt={item.title} className="table-image" /></td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(item.id)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentNews ? "Editar Noticia" : "Añadir Noticia"}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
