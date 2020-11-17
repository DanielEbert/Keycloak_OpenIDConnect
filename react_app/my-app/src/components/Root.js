import React, { Component } from 'react';
import axios from 'axios';

import { useKeycloak } from '@react-keycloak/web'

const Root = () => {
  const { keycloak } = useKeycloak()

  const service1Data = () => {
    axios.post('http://localhost:5000', {
      'blablabla': 'aaaa'
    }, {
      headers: { Authorization: "Bearer " + keycloak.token }
    })
    .then(res => console.log(res))
    .catch(res => {
      console.log("Error posting to service 1")
    })
  }

  return(
    <div className="Root container">
        <div className="container">
          <div className="row" style={{marginTop:'25px'}}>
            <h3 className="center">Request Resources</h3>
            <div className="divider"></div>
            <div className='center' style={{marginTop:'25px'}}>
              <button onClick={service1Data}>Service 1</button>
              <button>Service 2</button>
            </div>
          </div>
        </div>
        {keycloak.authenticated ? 
          <div className="container">
            <div className="row" style={{marginTop:'25px'}}>
              <h3 className="center">Token</h3>
              <div className="divider"></div>
              <pre style={{marginTop:'20px'}}>{JSON.stringify(keycloak.tokenParsed, null, 2)}</pre>
            </div>
          </div>
          : ""}
    </div>
  )
}

export default Root;