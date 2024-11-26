import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchBookDetails } from "../utils/api"; 
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetailsData = async () => {
      try {
        const data = await fetchBookDetails(id); // Utiliza la función correcta
        setBook(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchBookDetailsData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    alert(`${book.title} añadido al carrito.`);
  };

  if (!book) {
    return <p>Cargando detalles del libro...</p>;
  }

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <div className="book-image-section">
          <img
            src={book.coverImage || "/placeholder.png"} /* La imagen cargada desde la API */
            alt={book.title}
            className="book-image" /* Aplicamos la clase para tamaño */
          />
          <p className="book-price">
            <strong>Precio:</strong> ${book.price}
          </p>
        </div>
        <div className="book-info-section">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-text">
            <strong>Autor:</strong> {book.author}
          </p>
          <p className="book-description">{book.description}</p>
        </div>
      </div>
      <div className="book-action-section">
        <p className="book-text">
          <strong>Cantidad disponible:</strong> {book.currentRequests}
        </p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
