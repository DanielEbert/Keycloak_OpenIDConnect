import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

const Login = () => {
  const { keycloak } = useKeycloak()
  
  const login = useCallback(() => {
    keycloak.login()
  }, [keycloak])

  return (
    <li><a className="black-text" onClick={login} href="#top">Login</a></li>
  )
}

export default Login