import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

// explained in ./nav.js
const Register = () => {
  const { keycloak } = useKeycloak()
  
  // keycloak.register() is invoked if the anchor element is clicked
  const register = useCallback(() => {
    keycloak.register()
  }, [keycloak])

  return (
    <li><a className="black-text" onClick={register} href="#top">Register</a></li>
  )
}

export default Register 
