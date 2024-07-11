import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import nofoto from "./../assets/images/nofoto.jpg";

function EmpleadosSeleccionados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const datosEmpleados = JSON.parse(
      sessionStorage.getItem("empleadosseleccionados")
    );
    setListaEmpleados(datosEmpleados);
    console.log(datosEmpleados);
  };

  const DibujarGridCards = () => {
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4 py-2 px-5">
        {listaEmpleados !== null ? (
          listaEmpleados.map((item) => (
            <div className="col-4" key={item.idempleado}>
              <div
                className="card text-center h-100"
                style={{ alignItems: "center" }}
              >
                <img
                  style={{ width: "50%" }}
                  src={
                    item.foto === null
                      ? nofoto
                      : ApiWebURL + "fotos/" + item.foto
                  }
                  className="card-img-top"
                  alt="..."
                />
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            No se ha seleccionado ningún empleado
          </div>
        )}
      </div>
    );
  };
  const vaciarEmpleados = () => {
    setListaEmpleados([]);
    sessionStorage.removeItem("empleadosseleccionados");
  };

  return (
    <section className="padded">
      <div className="container">
        <h2>Detalle Empleados</h2>
        <h5>
          N° Empleados Seleccionados:{" "}
          <span className="badge text-bg-secondary">
            {listaEmpleados !== null ? listaEmpleados.length : 0}
          </span>
        </h5>
        {DibujarGridCards()}
        <button className="btn btn-danger" onClick={() => vaciarEmpleados()}>
          Vaciar empleados
        </button>
      </div>
    </section>
  );
}

export default EmpleadosSeleccionados;
