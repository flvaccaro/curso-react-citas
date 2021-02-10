import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
  // Crear state de citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  const [error, actualizarError] = useState(false);

  // Función que s ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const checkEmpty = (value) => {
    return Boolean(value.trim() === '');
  };

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (e) => {
    e.preventDefault();

    // validar
    let formInvalid = false;
    Object.keys(cita).map((key) => {
      if (checkEmpty(cita[key])) {
        formInvalid = true;
      }
      return formInvalid;
    });

    actualizarError(formInvalid);

    // asignar un id
    cita.id = uuidv4();

    // crear la cita
    if (!formInvalid) {
      crearCita(cita);
    }
    // reiniciar el form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    });
  };

  return (
    <>
      <h2>Crear cita</h2>
      {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
      <form onSubmit={submitCita}>
        <label htmlFor="mascota">
          Nombre mascota
          <input
            className="u-full-width"
            id="mascota"
            name="mascota"
            type="text"
            placeholder="Nombre mascota"
            onChange={handleChange}
            value={mascota}
          />
        </label>
        <label htmlFor="propietario">
          Nombre del dueño
          <input
            className="u-full-width"
            id="propietario"
            name="propietario"
            type="text"
            placeholder="Nombre del propietario"
            onChange={handleChange}
            value={propietario}
          />
        </label>
        <label htmlFor="fecha">
          Fecha
          <input className="u-full-width" id="fecha" name="fecha" type="date" onChange={handleChange} value={fecha} />
        </label>
        <label htmlFor="hora">
          Hora
          <input className="u-full-width" id="hora" name="hora" type="time" onChange={handleChange} value={hora} />
        </label>
        <label htmlFor="sintomas">
          Sintomas
          <textarea
            className="u-full-width"
            id="sintomas"
            name="sintomas"
            type="text"
            placeholder="Ingrese que sintomas tiene el animal"
            onChange={handleChange}
            value={sintomas}
          />
        </label>
        <button className="u-full-width button-primary" type="submit">
          Agregar cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};
export default Formulario;
