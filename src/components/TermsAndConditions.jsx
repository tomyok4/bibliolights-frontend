import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Términos y Condiciones</h1>
      <p>
        Bienvenido a Bibliolights. Al acceder y utilizar nuestra plataforma, aceptas los siguientes términos y condiciones:
      </p>
      <ol>
        <li>
          <strong>Uso de la Plataforma:</strong> El uso de nuestra plataforma está destinado exclusivamente para fines personales y no comerciales.
        </li>
        <li>
          <strong>Privacidad:</strong> Tus datos personales serán tratados de acuerdo con nuestra política de privacidad.
        </li>
        <li>
          <strong>Disponibilidad de Productos:</strong> La disponibilidad de libros puede variar y está sujeta a cambios sin previo aviso.
        </li>
        <li>
          <strong>Pagos:</strong> Todas las compras deben realizarse a través de los métodos de pago autorizados en la plataforma.
        </li>
        <li>
          <strong>Derechos de Autor:</strong> Los contenidos y libros disponibles en nuestra plataforma están protegidos por derechos de autor. Está prohibida su reproducción o distribución sin autorización previa.
        </li>
        <li>
          <strong>Modificaciones:</strong> Bibliolights se reserva el derecho de modificar estos términos en cualquier momento. Las actualizaciones serán notificadas en la plataforma.
        </li>
      </ol>
      <p>Gracias por elegir Bibliolights. ¡Disfruta de la lectura!</p>
    </div>
  );
};

export default TermsAndConditions;
