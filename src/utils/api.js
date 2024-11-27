import { GetAuthToken, GetIsAdmin } from "../context/authContext"; // Asegúrate de que el import esté al inicio

const BASE_URL = "https://bibliolights-backend.onrender.com/api"; // URL actualizada

// Encabezados comunes (sin token de autenticación)
const headers = {
  "Content-Type": "application/json",
};

// Función para obtener todos los libros sin autenticación
export const fetchBooks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/books`, {
      method: 'GET',
      headers: headers, // Sin el encabezado de Authorization
    });

    if (!res.ok) {
      throw new Error("Error al obtener los libros");
    }

    const booksData = await res.json();
    return booksData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Función para obtener los detalles de un libro (esto sigue requeriendo autenticación)
export const fetchBookDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'GET',
      headers: headers, // Sin el encabezado de Authorization
    });

    if (!res.ok) {
      throw new Error("Error al obtener los detalles del libro");
    }

    const bookData = await res.json();
    return bookData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Función para agregar un libro (requiere autenticación)
export const addBook = async (bookData) => {
  try {
    const token = GetAuthToken();
    if (!token) {
      throw new Error("Se requiere autenticación");
    }

    // Solo los administradores pueden agregar libros
    if (!GetIsAdmin()) {
      throw new Error("Acción no permitida: Solo administradores pueden agregar libros");
    }

    const res = await fetch(`${BASE_URL}/admin/books`, {
      method: 'POST',
      headers: {
        ...headers,
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    if (!res.ok) {
      throw new Error("Error al agregar el libro");
    }

    const addedBook = await res.json();
    return addedBook;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Función para actualizar un libro (requiere autenticación)
export const updateBook = async (bookId, bookData) => {
  try {
    const token = GetAuthToken();
    if (!token) {
      throw new Error("Se requiere autenticación");
    }

    // Solo los administradores pueden actualizar libros
    if (!GetIsAdmin()) {
      throw new Error("Acción no permitida: Solo administradores pueden actualizar libros");
    }

    const res = await fetch(`${BASE_URL}/admin/books/${bookId}`, {
      method: 'PUT',
      headers: {
        ...headers,
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar el libro");
    }

    const updatedBook = await res.json();
    return updatedBook;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Función para eliminar un libro (requiere autenticación)
export const deleteBook = async (bookId) => {
  try {
    const token = GetAuthToken();
    if (!token) {
      throw new Error("Se requiere autenticación");
    }

    // Solo los administradores pueden eliminar libros
    if (!GetIsAdmin()) {
      throw new Error("Acción no permitida: Solo administradores pueden eliminar libros");
    }

    const res = await fetch(`${BASE_URL}/admin/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al eliminar el libro");
    }

    return true;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Función para obtener los pedidos (requiere autenticación)
export const fetchOrders = async () => {
  try {
    const token = GetAuthToken();
    if (!token) {
      throw new Error("Se requiere autenticación");
    }

    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        ...headers,
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los pedidos");
    }

    const ordersData = await res.json();
    return ordersData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Función para solicitar un libro (requiere autenticación)
export const requestBook = async (bookId, deliveryTime, notes) => {
  try {
    const token = GetAuthToken();
    if (!token) {
      throw new Error("Se requiere autenticación");
    }

    const res = await fetch(`${BASE_URL}/books/${bookId}/request`, {
      method: 'POST',
      headers: {
        ...headers,
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        selectedDeliveryTime: deliveryTime, 
        notes: notes,
      }),
    });

    if (!res.ok) {
      throw new Error("Error al solicitar el libro");
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
