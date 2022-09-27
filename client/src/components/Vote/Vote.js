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
    mode: 'no-cors'
    // headers: {
    //   'Content-Type': 'application/json',
          'Client-ID': '3zgt5j9ljrim561y47g3n6vz1j29s8',
          'Authorization': 'Bearer 0u4rhob7ua6cvl6nnynd3ra5i03bju' }
  };
  let game1 = await fetch(`https://api.igdb.com/v4/games`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    return result})
  .catch(error => console.log('error', error));


  const handleVote = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <>
              <Button
          type='submit'

          variant='success'
          size="lg">
          {game1.name}
        </Button>
        <Button
          type='submit'
          variant='primary'
          size="lg">
          {game2.name}
        </Button>
        <Instructions />

    </>
  );
};

export default Vote;
