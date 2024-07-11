import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";

function Empleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // Track selected item ID
  const [empleados, setEmpleados] = useState([]);

  const SeleccionarEmpleados = (item) => {
    // Add or remove item ID from selectedItems based on its current selection state
    const updatedSelectedItems = [...selectedItems]; // Create a copy of the array
    const itemId = item.idempleado;
    if (selectedItems.includes(itemId)) {
      // Deselect
      updatedSelectedItems.splice(updatedSelectedItems.indexOf(itemId), 1);
    } else {
      // Select
      updatedSelectedItems.push(itemId);
    }
    setSelectedItems(updatedSelectedItems);
  };
  const AgregarEmpleados = (item) => {
    const empleadosSelected = [...empleados];
    if (selectedItems.includes(item.idempleado)) {
      empleadosSelected.splice(empleadosSelected.indexOf(item), 1);
    } else {
      //Agregar a Empleados Seleccionados
      empleadosSelected.push(item);
    }
    setEmpleados(empleadosSelected);
  };
  const handleClick = (item) => {
    SeleccionarEmpleados(item);
    AgregarEmpleados(item);
  }
  //Almacenar Empleados Seleccionados en Sesion Storage
  sessionStorage.setItem("empleadosseleccionados", JSON.stringify(empleados));

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "empleados.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaEmpleados(data);
      });
  };

  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2  g-4">
        {listaEmpleados.map((item) => (
          <div className="col" key={item.idempleado}>
            <div className="card">
              <img
                src={ApiWebURL + "fotos/" + item.foto}
                className="card-img-top"
                alt={item.nombres}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.nombres} {item.apellidos + "    "}
                  <i style={{cursor:"pointer"}}
                    className={`bi ${
                      selectedItems.includes(item.idempleado)
                        ? "bi-bookmark-check-fill"
                        : "bi-bookmark"
                    }`}
                    title="Añadir a Empleados Seleccionados"
                    onClick={() => handleClick(item)}
                  ></i>
                </h5>

                <p className="card-text">{item.cargo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="empleados" className="padded">
      <div className="container">
        <h2>Empleados</h2>
        {dibujarCuadricula()}
      </div>
    </section>
  );
}

export default Empleados;
