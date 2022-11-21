import React from 'react';
import { Link } from 'react-router-dom';

import style from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={style.mainNotFound}>
      
      <div className={style.message}>
        <h1>Dog not Found.</h1>
        <Link to={`/home`} className={style.button}>
          <button className={style.button}>Back to home</button>
        </Link>
      </div>
    </div>
  );
}
