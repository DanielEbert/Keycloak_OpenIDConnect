import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

// explained in ./nav.js
const Login = () => {
  const { keycloak } = useKeycloak()
  
  // keycloak.login() is invoked if the anchor element is clicked
  const login = useCallback(() => {
    keycloak.login()
  }, [keycloak])

  return (
    <li><a className="black-text" onClick={login} href="#top">Login</a></li>
  )
}

export default Login
