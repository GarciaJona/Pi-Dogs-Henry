import React from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';
import icon from '../imgs/logo-orange.png';

export default function Nav() {
  return (
    <nav className={style.nav}>
       <img src={icon} alt='nav' className={style.icon} />
      <Link to='/home' className={style.link}>
        Home
      </Link>
      <Link to='/createDog' className={style.link}>
        New dog
      </Link>
      <Link to='/' className={style.link}>
        Exit
      </Link>
    </nav>
  );
}
