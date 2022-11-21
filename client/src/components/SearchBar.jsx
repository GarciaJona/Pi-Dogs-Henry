import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDog } from '../actions';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  //estado local
  const [name, setName] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchDog(name));
  }

  return (
    <div className={styles.searchBar}>
      <input
        id='SearchBar'
        type='text'
        placeholder='   Tipe a dog name...'
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={styles.btn}
        type='submit'
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
