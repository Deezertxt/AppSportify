import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const ResultsPage = ({ data }) => {
  const [filter, setFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  // Cargar el valor de búsqueda desde localStorage al montar el componente
  useEffect(() => {
    const query = localStorage.getItem('searchQuery') || '';
    setSearchQuery(query);

    // Si tienes una función para filtrar los datos iniciales con el valor de búsqueda
    if (query) {
      const initialFilteredData = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(initialFilteredData);
    }
  }, [data]);

  const handleFilter = (type) => {
    setFilter(type);
    switch (type) {
      case 'Title':
        setFilteredData([...filteredData].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'Author':
        setFilteredData([...filteredData].sort((a, b) => a.author.localeCompare(b.author)));
        break;
      case 'Category':
        setFilteredData(data.filter(item => item.category === 'Chess')); // Ejemplo de filtro por categoría
        break;
      default:
        setFilteredData(data);
    }
  };

  const handleCardClick = (title) => {
    alert(`Clicked on ${title}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar por título, autor o categoría"
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="filter-buttons flex gap-4 mb-4">
        <button onClick={() => handleFilter('All')}>All</button>
        <button onClick={() => handleFilter('Title')}>Title</button>
        <button onClick={() => handleFilter('Author')}>Author</button>
        <button onClick={() => handleFilter('Category')}>Category</button>
      </div>
      
      <div className="results-list flex flex-wrap -m-4">
        {filteredData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            author={item.author}
            description={item.description}
            coverUrl={item.coverUrl}
            duration={`${item.time} min`}
            rating={item.rating}
            onClick={() => handleCardClick(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
