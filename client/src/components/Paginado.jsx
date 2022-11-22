import React from 'react';

import style from './Paginado.module.css';

export default function Paginado({
  dogsPerPage,
  allDogs,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={style.paginado}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div className='number' key={number}>
            <button className='boton1' onClick={() => paginado(number)}>
              {number}
            </button>
          </div>
        ))}
    </div>
  );
}
