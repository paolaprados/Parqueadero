import React, { useRef, useState } from "react";
import { ButtonComponent } from "../ButtonComponent";

export const ParkingInfoComponent = ({ fetchPlaca }) => {
  const inputEl = useRef(null);

  const [totalCeldasOcupadas, setTotalCeldasOcupadas] = useState(0);
  const [todaLasPlacas, setTodasLasPlacas] = useState([]);

  const handleBuscar = e => {
    e.preventDefault();
    console.log(e);
    fetchPlaca("", "", "GET").then(res => {
      const traerPlaca = res.filter(currentValue => {
        if (currentValue.placa === inputEl.current.value) {
          return currentValue;
        }
      })[0];

      console.log("traerPlaca", traerPlaca);
      const date = new Date(traerPlaca.hora_entrada);
      alert("la placa es: " + traerPlaca.placa + date);
    });
  };

  const handleTotal = () => {
    console.log("traer total de carros");
    fetchPlaca("", "", "GET").then(res => {
      console.log(res.length);
      setTotalCeldasOcupadas(res.length);
      setTodasLasPlacas(res);
    });
  };

  return (
    <section style={{ backgroundColor: "azure" }}>
      <p>Total de celdas ocupadas {totalCeldasOcupadas}</p>
      <p>Total de celdas disponibles{30 - totalCeldasOcupadas}</p>
      <ButtonComponent hamdFuntion={handleTotal}>
        total de carros
      </ButtonComponent>

      <ul>
        {todaLasPlacas.length > 0
          ? todaLasPlacas.map(currentValue => {
              const date = new Date(currentValue.hora_entrada).toString();
              console.log(date);
              return (
                <li key={currentValue.placa}>
                  placa: {currentValue.placa} hora: {date}
                </li>
              );
            })
          : null}
      </ul>

      <input
        name="placa"
        type="search"
        placeholder="copie la placa"
        ref={inputEl}
        maxLength="6"
      />
      <ButtonComponent hamdFuntion={handleBuscar}>
        buscar por placa
      </ButtonComponent>
    </section>
  );
};
