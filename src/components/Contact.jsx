import React from 'react';
import './Contact.css';
import ArgentinaFlag from '../assets/argentina.png'; 

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <p>
        <strong>Email:</strong> bibliolights@gmail.com
      </p>
      <p>
        <strong>País:</strong> Argentina <img src={ArgentinaFlag} alt="Bandera de Argentina" className="flag-icon" />
      </p>
      <p>
        <strong>Ciudad:</strong> Resistencia
      </p>
      <p>
        <strong>Calle:</strong> Av Castelli 350
      </p>
    </div>
  );
};

export default Contact;
