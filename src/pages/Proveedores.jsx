import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";

function Proveedores() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState(
    []
  );
  const [textoBuscar, setTextoBuscar] = useState("");
  const [filasPagina, setFilasPagina] = useState(5);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalFilas, setTotalFilas] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [estadoAscendente, setEstadoAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "proveedores.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaProveedores(data);
        setListaProveedoresFiltrados(data);
        setTotalFilas(data.length);
        setTotalPaginas(Math.ceil(data.length / filasPagina));
      });
  };

  const seleccionarColumna = (event, columna) => {
    console.log(columna);
    let iconosOrden = document.querySelectorAll("#tabla-proveedores th i");
    iconosOrden.forEach((item) => item.remove());

    let ascendente = estadoAscendente;
    if (columna !== columnaAnterior) {
      ascendente = 1;
    } else {
      ascendente = -ascendente;
    }
    const resultado = [...listaProveedoresFiltrados].sort((a, b) =>
      a[columna] > b[columna] ? ascendente : -ascendente
    );
    let icono =
      ascendente === 1
        ? '<i class="bi bi-caret-down-fill"></i>'
        : '<i class="bi bi-caret-up-fill"></i>';
    event.currentTarget.innerHTML += icono;

    setListaProveedoresFiltrados(resultado);
    setColumnaAnterior(columna);
    setEstadoAscendente(ascendente);
  };
  const ObtenerProveedorSeleccionado = (item) => {
    console.log(item);
    setProveedorSeleccionado(item);
  };

  const dibujarTabla = () => {
    return (
      <table className="table" id="tabla-proveedores">
        <thead>
          <tr>
            <th>Código</th>
            <th onClick={(event) => seleccionarColumna(event, "nombreempresa")}>
              Empresa
            </th>
            <th
              onClick={(event) => seleccionarColumna(event, "nombrecontacto")}
            >
              Contacto
            </th>
            <th onClick={(event) => seleccionarColumna(event, "ciudad")}>
              Ciudad
            </th>
            <th onClick={(event) => seleccionarColumna(event, "pais")}>País</th>
            <th>Visualizar</th>
          </tr>
        </thead>
        <tbody>
          {listaProveedoresFiltrados
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((item) => (
              <tr key={item.idproveedor}>
                <td>{item.idproveedor}</td>
                <td>{item.nombreempresa}</td>
                <td>{item.nombrecontacto}</td>
                <td>{item.ciudad}</td>
                <td>{item.pais}</td>
                <td>
                  <i
                    style={{cursor:"pointer"}}
                    className="bi bi-eye"
                    onClick={() => ObtenerProveedorSeleccionado(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#vistaRapidaModal"
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };
  const dibujarVistaRapidaModal = () => {
    return (
      <div
        className="modal fade"
        id="vistaRapidaModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fs-3" id="exampleModalLabel">
                <b>Datos del Proveedor N°.</b>{" "}
                <span className="badge text-bg-secondary">
                  {proveedorSeleccionado.idproveedor}
                </span>
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Empresa</th>
                        <td>{proveedorSeleccionado.nombreempresa}</td>
                      </tr>
                      <tr>
                        <th>Contacto</th>
                        <td>{proveedorSeleccionado.nombrecontacto}</td>
                      </tr>
                      <tr>
                        <th>Cargo Contacto</th>
                        <td>{proveedorSeleccionado.cargocontacto}</td>
                      </tr>
                      <tr>
                        <th>Telefono</th>
                        <td>{proveedorSeleccionado.telefono}</td>
                      </tr>
                      <tr>
                        <th>Ciudad</th>
                        <td>{proveedorSeleccionado.ciudad}</td>
                      </tr>
                      <tr>
                        <th>Pais</th>
                        <td>{proveedorSeleccionado.pais}</td>
                      </tr>
                      <tr>
                        <th>Direccion</th>
                        <td>{proveedorSeleccionado.direccion}</td>
                      </tr>
                      <tr>
                        <th>Codigo Postal</th>
                        <td>{proveedorSeleccionado.codigopostal}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const buscarTexto = (event) => {
    let texto = event.target.value;
    setTextoBuscar(texto);
    console.log(texto);
    const resultado = listaProveedores.filter(
      (item) =>
        item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
        item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
        item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
        item["ciudad"].toUpperCase().includes(texto.toUpperCase())
    );
    setListaProveedoresFiltrados(resultado);
  };

  const dibujarPaginacion = () => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => retroceder()}>
              Retroceder
            </a>
          </li>
          {dibujarNumerosPaginacion()}
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => avanzar()}>
              Avanzar
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  const dibujarNumerosPaginacion = () => {
    return (
      <>
        {Array.from({ length: totalPaginas }).map((item, index) => (
          <li
            className={index === pagina ? "page-item active" : "page-item"}
            key={index}
          >
            <a className="page-link" href="#" onClick={() => setPagina(index)}>
              {index + 1}
            </a>
          </li>
        ))}
      </>
    );
  };

  const retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };
  const avanzar = () => {
    if (pagina < totalPaginas - 1) {
      setPagina(pagina + 1);
    }
  };

  return (
    <section id="proveedores" className="padded">
      <div className="container">
        <h2>Proveedores</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Indique expresión a buscar"
            value={textoBuscar}
            onChange={(event) => buscarTexto(event)}
          />
        </div>
        {dibujarTabla()}
        {dibujarPaginacion()}
        {dibujarVistaRapidaModal()}
      </div>
    </section>
  );
}

export default Proveedores;
