export const requestBook = async (bookId, selectedDeliveryTime, notes = '') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`, // Usa el token del localStorage si está disponible
        },
        body: JSON.stringify({
          selectedDeliveryTime,
          notes,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al realizar la solicitud del libro.');
      }
  
      const data = await response.json();
      return data; // Retorna los datos si la solicitud fue exitosa
    } catch (error) {
      console.error('Error al realizar la solicitud del libro:', error);
      throw error; // Lanza el error para que el componente pueda manejarlo
    }
  };