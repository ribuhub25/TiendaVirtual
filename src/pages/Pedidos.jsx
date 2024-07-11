import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import { useNavigate } from "react-router-dom";
import "./Pedidos.css"

function Pedidos() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "pedidos.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaPedidos(data);
      });
  };

  const seleccionarPedido = (item) => {
    console.log(item);
    navigate("/pedidodetalle/" + item.idpedido);
  };
 const convertirFecha = (fechaString) => {
   // ... (código de validación opcional)

   // Convertir la cadena a un objeto Date
   const fecha = new Date(Date.parse(fechaString));

   // Extraer día, mes y año
   const dia = fecha.getDate();
   const mes = fecha.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
   const año = fecha.getFullYear();

   // Formatear la fecha al formato deseado
   const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
     .toString()
     .padStart(2, "0")}/${año}`;

   return fechaFormateada;
 };

  const dibujarTabla = () => {
    return (
      <table className="table table-hover" style={{ cursor: "pointer"}}>
        <thead className="table-dark">
          <tr>
            <th>fecha pedido</th>
            <th>nombres</th>
            <th>total</th>
            <th>usuario</th>
          </tr>
        </thead>
        <tbody>
          {listaPedidos.map((item) => (
            <tr key={item.idpedido} onClick={() => seleccionarPedido(item)}>
              <td>{convertirFecha(item.fechapedido)}</td>
              <td>{item.nombres}</td>
              <td>S/. {parseFloat(item.total).toFixed(2)}</td>
              <td>{item.usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {dibujarTabla()}
    </>
  );
}

export default Pedidos;
