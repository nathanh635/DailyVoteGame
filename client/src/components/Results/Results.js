import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Instructions from './components/Instructions';

// import { LOGIN } from '../../utils/mutations';
// import Auth from '../../utils/auth';


const Vote = () => {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  var requestOptions2 = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
          'Client-ID': '3zgt5j9ljrim561y47g3n6vz1j29s8',
          'Authorization': 'Bearer 0u4rhob7ua6cvl6nnynd3ra5i03bju' }
  };
  let game1 = await fetch(`https://api.igdb.com/v4/games`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    return result})
  .catch(error => console.log('error', error));



  var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(100, 75, 100, 0, 2 * Math.PI);
ctx.stroke();

  return (
    <>
               <canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>

    </>
  );
};

export default Results;
