import React from 'react';

import style from './Paginado.module.css';

export default function Paginado({
  dogsPerPage,
  allDogs,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <button
        onClick={() => paginado(currentPage > 1 ? currentPage - 1 : 22)}
        className={style.buttonNumber}
      >
        Prev
      </button>
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
      <button
        onClick={() =>
          paginado(
            currentPage < pageNumbers.length
              ? currentPage + 1
              : pageNumbers.length,
          )
        }
        className={style.buttonNumber}
      >
        Next
      </button>
    </div>
  );
}
