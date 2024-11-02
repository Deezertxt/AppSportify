import React, { useState } from 'react';
import Card from '../components/Card';

const ResultsPage = ({ data }) => {
  const [filter, setFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (type) => {
    setFilter(type);
    switch (type) {
      case 'Title':
        setFilteredData([...data].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'Author':
        setFilteredData([...data].sort((a, b) => a.author.localeCompare(b.author)));
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
