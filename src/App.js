// App.js
import ExhibitionsTable from './Components/ExhibitionsTable';
import NewsTable from './Components/NewsTable';
import './App.css'; // Importamos los estilos puros en CSS

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="container">
        <h1 className="title">Museo Papalote</h1>
        <div className="grid">
          <div className="grid-item">
            <NewsTable />
          </div>
          <div className="grid-item">
            <ExhibitionsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
