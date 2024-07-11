import amedida from "./../assets/images/amedida.jpeg";
import baño from "./../assets/images/baño.jpeg";
import cocina from "./../assets/images/cocina.jpeg";
function ProductosMelamina() {
  return (
    <div className="container">
      <h2>Productos hechos en Melamina</h2>
      <div className="card-group gap-4">
        <div className="card">
          <img
            src={baño}
            alt="..."
            width={400}
            height={300}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">Muebles para entretenimiento</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div className="card">
          <img
            src={cocina}
            alt="..."
            width={400}
            height={300}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">Muebles de cocina</h5>
            <p className="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div className="card">
          <img
            src={amedida}
            alt="..."
            width={400}
            height={300}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">Muebles para Sala</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductosMelamina;
