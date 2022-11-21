import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Landing.module.css';

function Landing() {
  return (
    <div className={style.background}>
      <h1 className={style.h1}>Dogs Api - Henry</h1>

      <h2 className={style.h2}>
        “El perro, posee belleza sin vanidad, fuerza sin insolencia, valentía
        sin ferocidad, y todas las virtudes del hombre pero ninguno de sus
        vicios”{' '}
      </h2>

      <span className={style.span}>Lord Byron.</span>

      <div className={style.divBtn}>
        <NavLink exact to='/home'>
          <button className='landing'>
            <span className={style.box}>Ingresar</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;
