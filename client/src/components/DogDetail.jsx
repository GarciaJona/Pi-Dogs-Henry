import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import style from './DogDetail.module.css';
import Nav from './Nav';
import loader from '../imgs/loading-thinking.gif';


export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const dogDetail = useSelector((state) => state.dogDetail);
  console.log(dogDetail);
  function renderDog(dogDetail) {
    if (Object.keys(dogDetail).length > 0) {
      return (
        <div className={style.main}>
          <div className={style.card}>
            <h1>Name: {dogDetail?.name}</h1>
            <img src={dogDetail?.image} alt='dog' className={style.img} />
            <p>Height: {dogDetail?.height}"</p>
            <p>Weight: {dogDetail?.weight} pounds.</p>
            <p>Life span: {dogDetail?.lifetime}.</p>
            <p>Temperaments: {dogDetail?.temperaments}</p>
          </div>
          
        </div>
      );
    } else {
      return (
        <div className={style.load}>
          <img src={loader} alt='loader' className={style.loader}></img>
        </div>
      );
    }
  }
  console.log(dogDetail);
  return (
    <React.Fragment>
      <Nav></Nav>
      <div>{renderDog(dogDetail)}</div>
    </React.Fragment>
  );
}
