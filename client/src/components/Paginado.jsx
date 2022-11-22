import React from 'react';
import { useDispatch } from 'react-redux';

import style from './Paginado.module.css';

export default function Paginado({
  dogsPerPage,
  allDogs,
  paginado,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const dispatch = useDispatch();

  const handlePrev = () => {
    if (currentPage - 1 <= pageNumbers.length) {
      setCurrentPage(currentPage - 1);
      dispatch(pageNumbers(currentPage));
      // setRender(!render);
    } else {
      return null;
    }
  };

  const handleNext = () => {
    if (currentPage + 1 <= pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      dispatch(pageNumbers(currentPage));
      // setRender(!render);
    } else {
      return null;
    }
  };
  // return (
  //   <div className={style.paginado}>
  //     {pageNumbers &&
  //       pageNumbers.map((number) => (
  //         <div className='number' key={number}>
  //           <button className='boton1' onClick={() => paginado(number)}>
  //             {number}
  //           </button>
  //         </div>
  //       ))}
  //   </div>
  // );
  return (
    <nav className={style.paginado}>
      <button className='backButton' onClick={handlePrev}>
        Back
      </button>
      {pageNumbers?.map((number) => (
        <button
          key={number}
          onClick={() => paginado(number)}
          className='Pagination__Button'
        >
          {number}
        </button>
      ))}

      <div className='paginationButtons'>
        <button className='nextButton' onClick={handleNext}>
          Next
        </button>
      </div>
    </nav>
  );
}
