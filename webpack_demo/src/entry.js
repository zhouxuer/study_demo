// document.getElementById("title").innerHTML="Hello rourou!";
// import React,{Component} from 'react'
// import ReactDom from 'react-dom'
// ReactDOM.render(
//   <h2>我是react</h2>,
//   document.querySelector('#root2')
// )

import './css/index.css'
import './less/a.less'
import './scss/a.scss'

// import {a} from './js/a.js';

import imgSrc from './images/rourou.jpg';
let oImg = new Image();
oImg.onload = function () {
  document.body.appendChild(oImg);
};
oImg.src = imgSrc;
let title = document.getElementsByTagName("div")[0];
title.innerHTML="rour111ou011";
// console.log(a);

alert('rourou');
