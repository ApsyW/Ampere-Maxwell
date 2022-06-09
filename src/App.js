import React, {useState, useEffect} from 'react';
import './App.css';
import { Lightbulb, LightbulbFill } from 'react-bootstrap-icons';
import StcB from './img/Blanco.jpg';
import StcN from './img/Negro.jpg';
import GifM from './img/Morado.gif';
import GifA from './img/Amarillo.gif';
import LeyAM from './img/leyAM.svg';
import LeyAMB from './img/leyAMB.svg';
import LeyAmpere from './img/leyAmpere.svg';
import LeyAmpereMaxwell from './img/leyAmpereMaxell.svg';

function App() {

  const valoresi = {
    inten: 1,
    rad: 1
  }

  const [encendido, setEncendido] = useState(false);
  const [amperMax, setAmperMax] = useState(true);
  const [valores, setValores] = useState(valoresi);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  const onAmperMax = () => {
    setAmperMax(!amperMax);
    setResult1(null);
    setResult2(null);
    setValores(valoresi);
    setEncendido(false);

    const body = document.getElementById('bodyy');
    const h1 = document.getElementById('h11');
    const span = document.getElementById('spann');
    const seccion1 = document.getElementById('seccion1');
    const seccion2 = document.getElementById('seccion2');

    if (amperMax) {
      body.className = 'abody';
      h1.className = 'ah1';
      span.className = 'aspan';
      seccion1.className = 'aseccion1';
      seccion2.className = 'aseccion2';
    }else{
      body.className = 'ambody';
      h1.className = 'amh1';
      span.className = 'amspan';
      seccion1.className = 'amseccion1';
      seccion2.className = 'amseccion2';
    }
  }

  const cambios = (e) => {
    const {name, value} = e.target; 
    setValores({...valores, [name]: value});
    setEncendido(false);
  }

  const encender = () => {
    setEncendido(!encendido);
    const i = valores.inten;
    const r = valores.rad;

    if (amperMax) {
      const R1 = (i * (8.8541 * (10 ** -12)))/(2 * 3.1416 * r);
      setResult1(R1);
      const R2 = (i * (8.8541 * (10 ** -12)))/(2 * 3.1416 * r);
      setResult2(R2);
    }else{
      const R1 = (i * (8.8541 * (10 ** -12)));
      setResult1(R1);
      const R2 = (0 * (8.8541 * (10 ** -12)));
      setResult2(R2);
    }
  }

  return (
    <>
      <container>
        <section><h1 id='h11' className='amh1' onClick={onAmperMax}>Ley de Ampere <span id='spann' className='amspan'>Maxwell</span></h1></section>
        {/* <section><p>Esta págian busca ilustrar la ley de Ampere-Maxwell e ilustrar las inconsistencias de la ley de Ampere</p></section> */}
        <section id='seccion1' className='amseccion1'>
          <div>
            <p>
              Esta págian busca ilustrar la ley de Ampere-Maxwell e ilustrar las inconsistencias de la ley de Ampere. Presiona el título para ver la ley de 
              {amperMax 
                ? <span> Ampere</span>
                : <span> Ampere-Maxwell</span>
              }
            </p>
          </div>
            <img 
              src={amperMax
                ? encendido ? GifA : StcB
                : encendido ? GifM : StcN
              } 
              alt="capacitor" 
            />
          <div>
            <div>
              <label htmlFor="inten">Intensidad de corriente en A:</label>
              <input 
                id='inten'
                name='inten'
                type="number" 
                min='1' 
                max='100' 
                value={valores.inten}
                onChange={cambios}
              />
              <label htmlFor="rad">Radio en m:</label>
              <input 
                id='rad'
                name='rad'
                type="number" 
                min='1' 
                max='100' 
                value={valores.rad}
                onChange={cambios}
              />
              
              <button onClick={encender}>
                {encendido
                ? <LightbulbFill />
                : <Lightbulb />}
              </button>
            </div>
            <div >
            {encendido 
              ? 
                <table>
                  <th>En el cable</th>
                  <th>Entre las placas</th>
                  <tr>
                    <td>
                      <img src= {amperMax ? LeyAmpereMaxwell : LeyAmpere }/>
                    </td>
                    <td>
                      <img src= {amperMax ? LeyAmpereMaxwell : LeyAmpere }/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src= {amperMax ? LeyAM : LeyAMB }/><p>{result1}</p>
                    </td>
                    <td>
                      <img src= {amperMax ? LeyAM : LeyAMB }/><p>{result2}</p>
                    </td>
                  </tr>
                </table>
              : ''}
            
          </div>
          </div>
        </section>
      </container>
    </>
  );
}

export default App;
