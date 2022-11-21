import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './CreateDog.module.css';

export const CreateDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //Defino los errores del Form
  const [formError, setFormError] = useState({});
  //Bloqueo de boton de submit
  const [isSubmit, setisSubmit] = useState(true);
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
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de la url
  function validImage(str) {
    if (str.length < 1 || str.length > 400) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion del breed Group
  function validBreedGroup(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion del peso
  function validWeight(str) {
    if (str.length < 1 || str.length > 100) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de la altura
  function validHeight(str) {
    if (str.length < 1 || str.length > 100) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de existencia de life span
  function validLife(str) {
    if (str.length < 1 || typeof str !== 'string') return true;
    return false;
  }
  //Validacion del largo del string de life span
  function longLife(str) {
    if (str.length > 15) return true;
    return false;
  }
  //La validacion de todos los campos
  function validation(data) {
    //Seteo un objeto que contenga todos los errores por encontrar
    let errors = {};

    //Validacion de campo name
    if (!data.name) {
      if (exists(data.name) === true) errors.name = 'Provide a name';
    }
    if (data.name && validName(data.name) === true)
      errors.name = 'The name is not valid';
    //Validacion de campo reference_image_id
    if (!data.reference_image_id) {
      if (exists(data.reference_image_id) === true)
        errors.reference_image_id = 'Provide a image url';
    }
    if (data.reference_image_id && validImage(data.reference_image_id) === true)
      errors.reference_image_id = 'You need to provide a valid image url';
    //Validacion de campo breed_group
    if (!data.breed_group) {
      if (exists(data.breed_group) === true)
        errors.breed_group = 'Provide a breed group';
    }
    if (data.breed_group && validBreedGroup(data.breed_group) === true)
      errors.breed_group = 'You need to provide a breed group';

    //Validacion de campos weight
    if (!data.weight_min) {
      if (exists(data.weight_min) === true)
        errors.weight = 'You need to provide a minimum weight';
    }
    if (data.weight_min && validWeight(data.weight_min) === true)
      errors.weight = 'The weight is not valid';
    if (!data.weight_max) {
      if (exists(data.weight_max) === true)
        errors.weight = 'You need to provide a maximum weight';
    }
    if (data.weight_max && validWeight(data.weight_max) === true)
      errors.weight = 'The weight is not valid';

    //Validacion de campo height
    if (!data.height_min) {
      if (exists(data.height_min) === true)
        errors.height = 'You need to provide a minimum height';
    }
    if (data.height_min && validHeight(data.height_min) === true)
      errors.height = 'The height is not valid';
    if (!data.height_max) {
      if (exists(data.height_max) === true)
        errors.height = 'You need to provide a maximum height';
    }
    if (data.height_max && validHeight(data.height_max) === true)
      errors.height = 'The height is not valid';

    if (parseInt(data.height_min, 10) > parseInt(data.height_max, 10))
      errors.height =
        'The maximum height cannot be minor than the minimum height';

    if (parseInt(data.weight_min, 10) > parseInt(data.weight_max, 10))
      errors.weight =
        'The maximum weight cannot be minor than the minimum weight';
    //Validacion de campo life_span
    if (!data.life_span) {
      if (exists(data.life_span) === true)
        errors.life_span = 'Provide a life span';
    }
    if (validLife(data.life_span) === true)
      errors.life_span = 'The life span is not valid';
    if (longLife(data.life_span) === true)
      errors.life_span =
        'We wish they live forever, but we need a valid life span';
    //Disabled
    if (Object.keys(errors).length === 0) {
      setisSubmit(false);
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
      temps: input.temps.filter((temp) => temp !== el),
    });
  }

  //SELECT
  const handleSelect = (e) => {
    setInput({
      ...input,
      temps: [...input.temps, e.target.value],
    });
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formError.name &&
      !formError.reference_image_id &&
      !formError.weight_min &&
      !formError.height_min &&
      !formError.weight_max &&
      !formError.height_max &&
      !formError.breed_group &&
      !formError.bred_for &&
      !formError.origin &&
      !formError.life_span
    ) {
      alert('Your dog has been created successfully');
      dispatch(postDog(input));
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
      history.push('/home');
    } else {
      return alert('Something went wrong. Please try again.');
    }
  };
  console.log(useSelector((state) => state.temperaments));

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
            {formError.name && <p className='error'>{formError.name}</p>}
          </div>
          <div>
            <label>Altura Minima: </label>
            <input
              type='number'
              value={input.min_height}
              name='min_height'
              onChange={(e) => handleChange(e)}
            />
            {formError.min_height && (
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
            {formError.max_height && (
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
            {formError.min_weight && (
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
            {formError.max_weight && (
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
          </div>

          <button className={style.botonCrear} type='submit'>
            Crear Perro
          </button>
        </form>
      </div>
    </div>
  );
};
