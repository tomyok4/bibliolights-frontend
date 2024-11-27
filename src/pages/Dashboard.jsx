import React, { useState, useEffect } from 'react';
import Carrusel from '../components/Carrusel';  // Asegúrate de importar el Carrusel
import { fetchBooks } from '../utils/api'; 
import './Dashboard.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('priceAsc');

  // Imágenes del carrusel
  const carouselImages = [
    require('../assets/imagen1dashboard.jpg'),
    require('../assets/imagen2dashboard.jpg'),
    require('../assets/imagen3dashboard.jpg')
  ];

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksData = await fetchBooks();  // Llamada a la API para obtener los libros
        setBooks(booksData);
        setTotalPages(Math.ceil(booksData.length / booksPerPage));
      } catch (error) {
        console.error('Error al obtener los libros:', error.message);
      }
    };

    fetchBooksData();
  }, [booksPerPage]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = filteredBooks.sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'dateAsc':
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      case 'dateDesc':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'availabilityAsc':
        return a.quantity - b.quantity;
      case 'availabilityDesc':
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="container">
      {/* Carrusel de imágenes */}
      <Carrusel images={carouselImages} />

      <div className="headerContainer">
        <h2 className="header">Catálogo de Libros</h2>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchBar"
          />
        </div>
      </div>

      <div className="sortingContainer">
        <label className="sortLabel">Ordenar por:</label>
        <select onChange={handleSortChange} value={sortOption} className="sortSelect">
          <option value="priceAsc">Precio: de menor a mayor</option>
          <option value="priceDesc">Precio: de mayor a menor</option>
          <option value="dateAsc">Fecha: más antigua a más reciente</option>
          <option value="dateDesc">Fecha: más reciente a más antigua</option>
          <option value="availabilityAsc">Disponibilidad: menos disponible primero</option>
          <option value="availabilityDesc">Disponibilidad: más disponible primero</option>
        </select>
      </div>

      <div className="grid">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div key={book._id} className="card">
              <img
                src={book.coverImage || "default-image.jpg"}
                alt={book.title}
                className="image"
              />
              <div className="cardTextContainer">
                <h3 className="cardTitle">{book.title}</h3>
                <p className="cardText">Autor: {book.author}</p>
                <p className="cardText">Precio: ${book.price}</p>
                <p className="cardText">Cantidad: {book.quantity}</p>
              </div>
              <button
                className="detailsButton"
                onClick={() => (window.location.href = `/books/${book._id}`)}
              >
                Más detalles
              </button>
            </div>
          ))
        ) : (
          <p className="noResultsMessage">No se encontraron libros con ese título.</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="paginationButton"
        >
          Anterior
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`paginationButton ${
              currentPage === index + 1 ? "activePaginationButton" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="paginationButton"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
