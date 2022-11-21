import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../imgs/logo-orange.png';
import style from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={style.nav}>
      <img src={icon} alt='jaja' className={style.icon} />
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
