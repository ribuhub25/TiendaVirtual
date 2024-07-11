import Envios from "../home/Envios"
import MainBanner from "../home/MainBanner"
import Nosotros from "../home/Nosotros"
import Noticias from "../home/Noticias"
import ProductosMelamina from "../home/ProductosMelamina"

function Inicio() {
    return (
        <>
            <MainBanner/>
            <Nosotros/>
            <Noticias />
            <ProductosMelamina/>
            <Envios/>
        </>
    )
}

export default Inicio