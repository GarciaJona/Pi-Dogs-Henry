import React from "react";

import html from "../imgs/html-svgrepo-com.svg"
import css from "../imgs/css-svgrepo-com.svg"
import js from "../imgs/js-svgrepo-com.svg"
import react from "../imgs/react-svgrepo-com.svg"
import redux from "../imgs/redux-svgrepo-com.svg"
import node from "../imgs/node-svgrepo-com.svg"
import express from "../imgs/express-svgrepo-com.svg"
import postgres from "../imgs/pgsql-svgrepo-com.svg"
import sequelize from "../imgs/sequelize-svgrepo-com.svg"
import style from "./Footer.module.css"

export default function Footer(){
    return(
   
        <footer className={style.footer}>
         
          <div className={style.skills}>
        <img src={html} alt='html'/>
        <img src={css} alt='css'/>
        <img src={js} alt='js'/>
        <img src={react} alt='react'/>
        <img src={redux} alt='redux'/>
        <img src={node} alt='node'/>
        <img src={express} alt='express'/>
        <img src={postgres} alt='postgres'/>
        <img src={sequelize} alt='sequelize'/>
      </div>
        </footer>


    )
        
    

}