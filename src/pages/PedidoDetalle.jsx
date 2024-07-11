import { useParams } from "react-router-dom";
import { ApiWebURL } from "../utils";
import { useEffect, useState } from "react";
import nofoto from "./../assets/images/nofoto.jpg";

function PedidoDetalle() {
  const params = useParams();
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState([]);
  var montoTotal = 0
  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio =
      ApiWebURL + "pedidosdetalle.php?idpedido=" + params.idpedido;
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPedidoSeleccionado(data);
      });
  };
  const MontoTotalCalculado = () => {
    pedidoSeleccionado.forEach((element) => {
      montoTotal = montoTotal + parseInt(element.cantidad) * parseFloat(element.precio);
    });
    return montoTotal.toFixed(2);
  }
  const DibujarGridCards = () => {
    return (
      <div className="container">
        <h5>
          ID Pedido:{" "}
          <span className="badge text-bg-secondary">{params.idpedido}</span>
        </h5>
        <h5>
          N° Productos del pedido:{" "}
          <span className="badge text-bg-secondary">
            {pedidoSeleccionado.length}
          </span>
        </h5>
        <h5>
          Monto Total:{" "}
          <span className="badge text-bg-primary">
            S/. {MontoTotalCalculado()}
          </span>
        </h5>

        <div className="row row-cols-1 row-cols-md-3 g-4 py-5 px-5">
          {pedidoSeleccionado.map((item) => (
            <div className="col-4" key={item.idproducto}>
              <div
                className="card text-center h-100"
                style={{ alignItems: "center" }}
              >
                <img
                  style={{ width: "50%" }}
                  src={
                    item.imagenchica === null
                      ? nofoto
                      : ApiWebURL + item.imagenchica
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.nombre}</h5>
                  <p className="card-text">
                    <i>{item.detalle}</i>
                  </p>

                  <p className="card-text">
                    S/.{parseFloat(item.precio).toFixed(2)} - {item.cantidad}u
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <>{DibujarGridCards()}</>;
}

export default PedidoDetalle;
