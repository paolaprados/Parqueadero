import React, { useRef } from "react";

import { ButtonComponent } from "../ButtonComponent";

export const MainComponent = () => {
  const inputEl = useRef(null);
  const baseURL = "http://localhost:3001/";

  const fetchPlaca = (typeOfRequest, params, method) => {
    const request = `${baseURL}${typeOfRequest}?${params}`;
    return fetch(request, { method }).then(response => response.json());
  };

  const handleCheckIn = e => {
    e.preventDefault();
    const fecha = new Date();
    const timestamp = fecha.getTime();
    console.log(inputEl.current.value, timestamp);
    const params = `placa=${inputEl.current.value}&hora_entrada=${timestamp}`;
    fetchPlaca("ingresar", params, "POST").then(resp =>
      console.log("holi", resp)
    );
  };

  const handlecheckOut = e => {
    e.preventDefault();
    console.log(inputEl.current.value);
    const params = `placa=${inputEl.current.value}`;
    fetchPlaca("salir", params, "DELETE").then(response => {
      const hora_entrada = response?.hora_entrada;
      const message = response?.message;
      console.log(hora_entrada, message);
      const hora_salida = new Date();
      const timestampSalida = hora_salida.getTime();
      const tiempoTotalEnMinutos = Math.ceil(
        (timestampSalida - hora_entrada) / 60000
      );

      console.log("tiempoTotal", tiempoTotalEnMinutos);
      const pagoTotal = tiempoTotalEnMinutos * 100;
      console.log(pagoTotal);

      alert("tu pago total es" + pagoTotal);
    });
  };

  return (
    <div>
      <header>
        <h1>Parqueadero Paola</h1>
      </header>
      <main>
        <section>
          <section>
            <h1>Ingresar placa</h1>
            <div>
              <div>
                <input
                  name="placa"
                  type="search"
                  placeholder="copie la placa"
                  ref={inputEl}
                  maxLength="6"
                />
              </div>
              <div>
                <ButtonComponent hamdFuntion={handleCheckIn}>
                  Ingresar
                </ButtonComponent>
                <ButtonComponent hamdFuntion={handlecheckOut}>
                  salir
                </ButtonComponent>
              </div>
            </div>
          </section>
        </section>
        <section></section>
      </main>
    </div>
  );
};
