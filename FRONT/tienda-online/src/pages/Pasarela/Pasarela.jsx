import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { peticion, peticion2 } from './index.js';

const Home = () => {
    return (<>
        <div className={styles.container}>
            <h1 className={styles.title}>APRENDIENDO PASARELAS DE PAGO</h1>
        </div>
        <div className={styles.container}>
            <p className={styles.title}>Selecciona la pasarela de Stripe para continuar</p>
            <br/>
            <div className={styles.buttonsContainer}>
                <Link to="/stripe"><button className={styles.genericButton}>Stripe</button></Link>
            </div>
            <div> <button onClick={peticion}>COnsultar Productos</button>
    <button onClick={peticion2}>COnsultar Tickets</button>
    <div id="mostrar"></div></div>
        </div>
    </>)
}

export default Home;