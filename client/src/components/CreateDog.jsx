import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './CreateDog.module.css';

export const CreateDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //Defino los errores del form
  const [formError, setFormError] = useState({});
  //Bloqueo de boton de submit
  const [isSubmit, setisSubmit] = useState(true);
  //display error on submit button
  const [displayError, setDisplayError] = useState(false);
  //Defino el body del request
  const [input, setInput] = useState({
    name: '',
    image: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    min_years: '',
    max_years: '',
    temperaments: [],
  });

  //Traigo los temps para el select
  useEffect(() => {
    // dispatch(getTemperaments());
    setFormError(validName(input));
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  //Validacion de existencia de dato
  function exists(str) {
    if (!str) return true;
    return false;
  }
  //Validacion del nombre
  function validName(str) {
    if (str && (str.length < 1 || str.length > 30)) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de la url
  function validImage(str) {
    if (str && (str.length < 1 || str.length > 400)) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  // //Validacion del breed Group
  // function validBreedGroup(str) {
  //   if (str && (str.length < 1 || str.length > 30)) return true;
  //   if (typeof str !== 'string') return true;
  //   return false;
  // }
  //Validacion del peso
  function validWeight(str) {
    if (str && (str.length < 1 || str.length > 100)) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de la altura
  function validHeight(str) {
    if (str && (str.length < 1 || str.length > 100)) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de existencia de life span
  function validLife(str) {
    if (str && (str.length < 1 || typeof str !== 'string')) return true;
    return false;
  }
  //Validacion del largo del string de life span
  function longLife(str) {
    if (str && str.length > 15) return true;
    return false;
  }
  //La validacion de todos los campos
  function validation(data) {
    //Seteo un objeto que contenga todos los errores por encontrar
    let errors = {};
    errors.hasError = false;
    //Validacion de campo name
    if (!data.name) {
      if (exists(data.name) === true) errors.name = 'Provide a name';
    }
    if (data.name && validName(data.name) === true)
      errors.name = 'The name is not valid';

    //Validacion de campo image
    if (!data.image) {
      if (exists(data.image) === true) errors.image = 'Provide a image url';
    }

    if (data.image && validImage(data.image) === true)
      errors.image = 'You need to provide a valid image url';

    //Validacion de campos weight
    //min
    if (!data.min_weight) {
      if (exists(data.min_weight) === true)
        errors.min_weight = 'You need to provide a minimum weight';
    }
    if (data.min_weight && validWeight(data.min_weight) === true)
      errors.min_weight = 'The minimum weight is not valid';

    //max
    if (!data.max_weight) {
      if (exists(data.max_weight) === true)
        errors.max_weight = 'You need to provide a maximum weight';
    }
    if (data.max_weight && validWeight(data.max_weight) === true)
      errors.max_weight = 'The maximun weight is not valid';

    if (parseInt(data.min_weight, 10) > parseInt(data.max_weight, 10))
      errors.max_height =
        'The maximum weight cannot be minor than the minimum weight';

    if (parseInt(data.min_weight, 10) > parseInt(data.max_weight, 10))
      errors.max_height =
        'The maximum weight cannot be minor than the minimum weight';

    //Validacion de campos height
    //min
    if (!data.min_height) {
      if (exists(data.min_height) === true)
        errors.min_height = 'You need to provide a minimum height';
    }

    if (data.min_height && validHeight(data.min_height) === true)
      errors.min_height = 'The minimum height is not valid';

    //max
    if (!data.max_height) {
      if (exists(data.max_height) === true)
        errors.max_height = 'You need to provide a maximum height';
    }
    if (data.max_height && validHeight(data.max_height) === true)
      errors.max_height = 'The maximun height is not valid';

    if (parseInt(data.min_height, 10) > parseInt(data.max_height, 10))
      errors.max_height =
        'The maximum height cannot be minor than the minimum height';

    if (parseInt(data.min_height, 10) > parseInt(data.max_height, 10))
      errors.max_height =
        'The maximum weight cannot be minor than the minimum weight';

    //min
    if (!data.min_years) {
      if (exists(data.min_years) === true)
        errors.min_years = 'You need to provide a minimum life value';
    }

    if (data.min_years && validLife(data.min_years) === true)
      errors.min_years = 'The minium life is not valid';

    //max
    if (!data.max_years) {
      if (exists(data.max_years) === true)
        errors.max_years = 'You need to provide a maximun life value';
    }
    if (data.max_years && validLife(data.max_years) === true)
      errors.max_years = 'The minium maximun is not valid';

    if (parseInt(data.min_years, 10) > parseInt(data.max_years, 10))
      errors.max_years =
        'The maximum life cannot be minor than the minimum life';

    if (parseInt(data.min_years, 10) > parseInt(data.max_years, 10))
      errors.max_years =
        'The maximum life cannot be minor than the minimum life';

    //temperaments
    if (!data.temperaments && data.temperaments?.length === 0) {
      errors.temperaments = 'You need to select a temperament';
    }
    console.log(data.temperaments);
    //Disabled
    if (Object.keys(errors).length === 0) {
      setisSubmit(false);
      errors.hasError = true;
    }

    return errors;
  }
  //CHANGE
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setFormError(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      }),
    );
  };

  //DELETE TEMPS
  function handleDelete(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== el),
    });
  }

  //SELECT
  const handleSelect = (e) => {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formError && !formError.hasError) {
      dispatch(
        postDog({
          name: input.name,
          height: `${input.min_height} - ${input.max_height}`,
          weight: `${input.min_weight} - ${input.max_weight}`,
          lifetime: `${input.min_years} - ${input.max_years}`,
          image: input.image,
          temperaments: input.temperaments,
        }),
      );
      console.log(input);
      setInput({
        name: '',
        image: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_years: '',
        max_years: '',
        temperaments: [],
      });
      alert('Your dog has been created successfully');
      history.push('/home');
    } else {
      setDisplayError(true);
      return alert('Something went wrong. Please take a look at the errors.');
    }
  };

  return (
    <div className={style.formCreate}>
      <Link to='/home'>
        <button className={style.botonVolver}>volver</button>
      </Link>
      <div className={style.formulario2}>
        <h1>Creá a tu Perro!</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Raza: </label>
            <input
              type='text'
              value={input.name}
              name='name'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.name && (
              <p className='error'>{formError.name}</p>
            )}
          </div>
          <div>
            <label>Altura Minima: </label>
            <input
              type='number'
              value={input.min_height}
              name='min_height'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.min_height && (
              <p className='error'>{formError.min_height}</p>
            )}
          </div>
          <div>
            <label>Altura Maxima: </label>
            <input
              type='number'
              value={input.max_height}
              name='max_height'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.max_height && (
              <p className='error'>{formError.max_height}</p>
            )}
          </div>
          <div>
            <label>Peso Minimo: </label>
            <input
              type='number'
              value={input.min_weight}
              name='min_weight'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.min_weight && (
              <p className='error'>{formError.min_weight}</p>
            )}
          </div>
          <div>
            <label>Peso Maximo: </label>
            <input
              type='number'
              value={input.max_weight}
              name='max_weight'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.max_weight && (
              <p className='error'>{formError.max_weight}</p>
            )}
          </div>
          <div>
            <label>Imagen: </label>
            <input
              type='text'
              value={input.image}
              name='image'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.image && (
              <p className='error'>{formError.image}</p>
            )}
          </div>
          <div>
            <label>Años de vida Minimo: </label>
            <input
              type='number'
              value={input.min_years}
              name='min_years'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.min_years && (
              <p className='error'>{formError.min_years}</p>
            )}
          </div>
          <div>
            <label>Años de vida Maximo: </label>
            <input
              type='number'
              value={input.max_years}
              name='max_years'
              onChange={(e) => handleChange(e)}
            />
            {displayError && formError.max_years && (
              <p className='error'>{formError.max_years}</p>
            )}
          </div>

          <div>
            <label>Temperamento: </label>

            <select onChange={(e) => handleSelect(e)}>
              <option disabled defaultValue>
                Seleccione el temperamento
              </option>
              {temperaments?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <div className={style.teper}>
              <ul>
                {input.temperaments.map((el) => (
                  <li className={style.lista}>
                    {el}
                    <button
                      className={style.botonX}
                      onClick={() => handleDelete(el)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {displayError && formError.temperaments && (
              <p className='error'>{formError.temperaments}</p>
            )}
          </div>

          <button className={style.botonCrear} type='submit'>
            Crear Perro
          </button>
        </form>
      </div>
    </div>
  );
};
