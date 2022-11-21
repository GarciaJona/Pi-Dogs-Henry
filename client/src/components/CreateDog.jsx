import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import  style from './CreateDog.module.css';

//validasion
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Se requiere un Nombre';
  } else if (!input.min_height) {
    errors.min_height = 'Debe ingresar una altura minima de 20 a 80 cm';
  } else if (!input.max_height) {
    errors.max_height = 'Debe ingresar una altura maxima de 30 a 100 cm';
  } else if (!input.min_weight) {
    errors.min_weight = 'Debe ingresar un peso minimo de 3 a 50 kilos';
  } else if (!input.max_weight) {
    errors.max_weight = 'Debe ingresar un peso maximo de 60 a 100 kilos';
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogs);
  const history = useHistory();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    min_years: '',
    max_years: '',
    temper: [],
    image: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      }),
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temper: input.temper.includes(e.target.value)
        ? input.temper
        : [...input.temper, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name.trim() !== '') {
      let patt = new RegExp(/^[A-Za-z\s]+$/g);
      let res = patt.test(input.name);
      if (res) {
        if (
          dogs && !dogs.find(
            (el) =>
              el.name.trim().toLowerCase() === input.name.trim().toLowerCase(),
          )
        ) {
          if (input.min_height !== '') {
            if (input.min_height >= 20 && input.min_height <= 80) {
              if (input.max_height !== '') {
                if (input.max_height >= 30 && input.max_height <= 100) {
                  if (input.min_height <= input.max_height) {
                    if (input.min_weight !== '') {
                      if (input.min_weight >= 3 && input.min_weight <= 50) {
                        if (input.max_weight !== '') {
                          if (
                            input.max_weight >= 60 &&
                            input.max_weight <= 100
                          ) {
                            if (input.min_weight <= input.max_weight) {
                              if (input.min_years !== '') {
                                if (
                                  input.min_years >= 1 &&
                                  input.min_years <= 3
                                ) {
                                  if (input.max_years !== '') {
                                    if (
                                      input.max_years >= 3 &&
                                      input.max_years <= 20
                                    ) {
                                      if (input.min_years <= input.max_years) {
                                        if (input.temper.length > 0) {
                                          dispatch(postDog(input));
                                          alert(
                                            'Tu Perro Fue Creado Con Exito !! 🤗',
                                          );
                                          setInput({
                                            name: '',
                                            min_height: '',
                                            max_height: '',
                                            min_weight: '',
                                            max_weight: '',
                                            min_years: '',
                                            max_years: '',
                                            temper: [],
                                            image: '',
                                          });
                                          history.push('/home');
                                          return;
                                        } else {
                                          alert(
                                            'Temperamento no fue cargado. Por favor Seleccione algun/os Temperamento/s',
                                          );
                                          return;
                                        }
                                      } else {
                                        alert(
                                          'el año minimo debe ser menor o igual al año maximo',
                                        );
                                        return;
                                      }
                                    } else {
                                      alert(
                                        'el año de vida maximo debe ser mayor o igual a 3 y menor igual a 20',
                                      );
                                      return;
                                    }
                                  }
                                } else {
                                  alert(
                                    'el año de vida minimo debe ser mayor o igual a 1 y menor igual a 3',
                                  );
                                  return;
                                }
                              }
                            } else {
                              alert(
                                'el peso minimo debe ser menor o igual al peso maximo',
                              );
                              return;
                            }
                          } else {
                            alert(
                              'el peso maximo debe ser mayor o igual a 60 y menor o igual a 100',
                            );
                            return;
                          }
                        }
                      } else {
                        alert(
                          'el peso minimo debe ser mayor o igual a 3 y menor o igual a 50',
                        );
                        return;
                      }
                    }
                  } else {
                    alert(
                      'la altura minima debe ser menor o igual a la altura maxima',
                    );
                    return;
                  }
                } else {
                  alert(
                    'el valor maximo de altura debe ser mayor o igual a 30 o menor o igual a 100',
                  );
                  return;
                }
              }
            } else {
              alert(
                'El valor minimo de la altura debe ser mayor o igual a 20 y menor o igual a 80',
              );
              return;
            }
          }
        } else {
          alert('Ya existe la raza con ese nombre');
          return;
        }
      } else {
        alert('La raza debe ser solamente completado con letras');
        return;
      }
    }
    alert(
      'Los campos Nombre Altura Peso y Temperamentos deben estar completados 😪',
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temper: input.temper.filter((occ) => occ !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.formCreate}>
      <Link to='/home'>
        <button className={style.botonVolver}>volver</button>
      </Link>
      <div className={style.formulario2}>
        <h1>Creá a tu Perro!</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Raza: </label>
            <input
              type='text'
              value={input.name}
              name='name'
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className='error'>{errors.name}</p>}
          </div>
          <div>
            <label>Altura Minima: </label>
            <input
              type='number'
              value={input.min_height}
              name='min_height'
              onChange={(e) => handleChange(e)}
            />
            {errors.min_height && <p className='error'>{errors.min_height}</p>}
          </div>
          <div>
            <label>Altura Maxima: </label>
            <input
              type='number'
              value={input.max_height}
              name='max_height'
              onChange={(e) => handleChange(e)}
            />
            {errors.max_height && <p className='error'>{errors.max_height}</p>}
          </div>
          <div>
            <label>Peso Minimo: </label>
            <input
              type='number'
              value={input.min_weight}
              name='min_weight'
              onChange={(e) => handleChange(e)}
            />
            {errors.min_weight && <p className='error'>{errors.min_weight}</p>}
          </div>
          <div>
            <label>Peso Maximo: </label>
            <input
              type='number'
              value={input.max_weight}
              name='max_weight'
              onChange={(e) => handleChange(e)}
            />
            {errors.max_weight && <p className='error'>{errors.max_weight}</p>}
          </div>
          <div>
            <label>Imagen: </label>
            <input
              type='text'
              value={input.image}
              name='image'
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Años de vida Minimo: </label>
            <input
              type='number'
              value={input.min_years}
              name='min_years'
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Años de vida Maximo: </label>
            <input
              type='number'
              value={input.max_years}
              name='max_years'
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Temperamento: </label>

            <select onChange={(e) => handleSelect(e)}>
              <option disabled selected>
                Seleccione el temperamento
              </option>
              {temperaments.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <div className={style.teper}>
              <ul>
                {input.temper.map((el) => (
                  <li className={style.lista}>
                    {el}
                    <button className= {style.botonX} onClick={() => handleDelete(el)}>
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button className={style.botonCrear} type='submit'>
            Crear Perro
          </button>
        </form>
      </div>
    </div>
  );
}
