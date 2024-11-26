// api.js

const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQzYTdkZWFhYzFlOTU1MzVmOWZjY2IiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzI1Nzk3MzksImV4cCI6MTczMjY2NjEzOX0.fBSVGcb6N89vP-wOLf-cH-yE6Mjq7qPNODHUl36-AiM";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${adminToken}`,
};

// Función para obtener los detalles de un libro
export const fetchBookDetails = async (id) => {
  try {
    const res = await fetch(`https://bibliolights-backend-production.up.railway.app/api/books/${id}`, {
      method: 'GET',
      headers: headers,
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

// Función para obtener todos los libros
export const fetchBooks = async () => {
  try {
    const res = await fetch('https://bibliolights-backend-production.up.railway.app/api/books', {
      method: 'GET',
      headers: headers,
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

// Función para agregar un libro
export const addBook = async (bookData) => {
  try {
    const res = await fetch('https://bibliolights-backend-production.up.railway.app/api/admin/books', {
      method: 'POST',
      headers: headers,
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

// Función para actualizar un libro
export const updateBook = async (bookId, bookData) => {
  try {
    const res = await fetch(`https://bibliolights-backend-production.up.railway.app/api/admin/books/${bookId}`, {
      method: 'PUT',
      headers: headers,
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

// Función para eliminar un libro
export const deleteBook = async (bookId) => {
  try {
    const res = await fetch(`https://bibliolights-backend-production.up.railway.app/api/admin/books/${bookId}`, {
      method: 'DELETE',
      headers: headers,
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

// Función para obtener los pedidos
export const fetchOrders = async () => {
  try {
    const res = await fetch('https://bibliolights-backend-production.up.railway.app/api/orders', {
      method: 'GET',
      headers: headers,
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

// Si `requestBook` es necesario, lo agregamos de la siguiente manera:
export const requestBook = async (bookId, deliveryTime, notes) => {
  try {
    const res = await fetch(`https://bibliolights-backend-production.up.railway.app/api/books/${bookId}/request`, {
      method: 'POST',
      headers: headers,
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

