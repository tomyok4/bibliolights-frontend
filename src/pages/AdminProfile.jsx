import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBook, fetchBooks, fetchOrders, updateBook, deleteBook } from '../utils/api'; // Importamos las funciones de la API
import "./AdminProfile.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isEditingBook, setIsEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
    coverImage: "",
  });
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await fetchBooks(); // Fetch books using the API
        setBooks(booksData);

        const ordersData = await fetchOrders(); // Fetch orders using the API
        setOrders(ordersData);
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleSaveBookChanges = async () => {
    if (isEditingBook) {
      try {
        const updatedBook = await updateBook(isEditingBook._id, isEditingBook);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === updatedBook._id ? updatedBook : book
          )
        );
        alert("Libro actualizado con éxito.");
        setIsEditingBook(null);
      } catch (error) {
        console.error("Error al actualizar el libro:", error.message);
      }
    }
  };

  const handleBookDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este libro?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId); // Delete book using the API
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      alert("Libro eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el libro:", error.message);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const bookData = {
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      coverImage: newBook.coverImage,
      price: parseFloat(newBook.price),
      deliveryTimes: ["3 días", "5 días", "7 días", "10 días"],
    };

    try {
      const addedBook = await addBook(bookData); // Add book using the API
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      alert("Libro agregado con éxito.");
      setNewBook({
        title: "",
        author: "",
        description: "",
        price: "",
        quantity: "",
        coverImage: "",
      });
    } catch (error) {
      console.error("Error al agregar el libro:", error.message);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "manageBooks":
        return (
          <div className="admin-books">
            <h3>Gestionar Libros</h3>
            <div className="books-container">
              {books.map((book) => (
                <div key={book._id} className="book-card">
                  <img
                    src={book.coverImage || "/placeholder.png"}
                    alt={book.title}
                    className="book-image"
                  />
                  {isEditingBook?._id === book._id ? (
                    <div className="book-details">
                      <input
                        type="text"
                        value={isEditingBook.title}
                        onChange={(e) =>
                          setIsEditingBook({
                            ...isEditingBook,
                            title: e.target.value,
                          })
                        }
                        className="edit-input"
                      />
                      <textarea
                        value={isEditingBook.description}
                        onChange={(e) =>
                          setIsEditingBook({
                            ...isEditingBook,
                            description: e.target.value,
                          })
                        }
                        className="edit-input"
                      />
                      <input
                        type="number"
                        value={isEditingBook.price}
                        onChange={(e) =>
                          setIsEditingBook({
                            ...isEditingBook,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="edit-input"
                      />
                      <input
                        type="number"
                        value={isEditingBook.quantity}
                        onChange={(e) =>
                          setIsEditingBook({
                            ...isEditingBook,
                            quantity: parseInt(e.target.value, 10),
                          })
                        }
                        className="edit-input"
                      />
                      <button
                        className="save-button"
                        onClick={handleSaveBookChanges}
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  ) : (
                    <div className="book-details">
                      <h4>{book.title}</h4>
                      <p>{book.description}</p>
                      <p>Precio: ${book.price}</p>
                      <p>Cantidad: {book.quantity}</p>
                      <button
                        className="edit-button"
                        onClick={() => setIsEditingBook(book)}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleBookDelete(book._id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "addBook":
        return (
          <div className="add-book-form">
            <h3>Agregar Libro</h3>
            <form onSubmit={handleAddBook}>
              <input
                type="text"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                placeholder="Título"
                required
              />
              <input
                type="text"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                placeholder="Autor"
                required
              />
              <textarea
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
                placeholder="Descripción"
                required
              />
              <input
                type="number"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
                placeholder="Precio"
                required
              />
              <input
                type="number"
                value={newBook.quantity}
                onChange={(e) =>
                  setNewBook({ ...newBook, quantity: e.target.value })
                }
                placeholder="Cantidad"
                required
              />
              <input
                type="text"
                value={newBook.coverImage}
                onChange={(e) =>
                  setNewBook({ ...newBook, coverImage: e.target.value })
                }
                placeholder="URL de la imagen"
                required
              />
              <button type="submit" className="add-book-button">
                Agregar Libro
              </button>
            </form>
          </div>
        );
      case "orders":
        return (
          <div className="admin-orders">
            <h3>Historial de Pedidos</h3>
            {orders.length === 0 ? (
              <p>No hay pedidos</p>
            ) : (
              <ul>
                {orders.map((order) => (
                  <li key={order._id}>
                    <p>Libro: {order.book.title}</p>
                    <p>Precio: ${order.price}</p>
                    <p>Usuario: {order.user}</p>
                    <p>
                      Fecha: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return <div>Seleccione una opción de gestión.</div>;
    }
  };

  return (
    <div className="admin-profile-container">
      <div className="profile-header">
        <h2>Admin</h2>
        <button onClick={() => navigate("/dashboard")}>Cerrar Sesión</button>
      </div>
      <div className="admin-actions">
        <button onClick={() => setActiveSection("manageBooks")}>
          Gestionar Libros
        </button>
        <button onClick={() => setActiveSection("addBook")}>Agregar Libro</button>
        <button onClick={() => setActiveSection("orders")}>Historial de Pedidos</button>
      </div>
      {renderSection()}
    </div>
  );
};

export default AdminProfile;
