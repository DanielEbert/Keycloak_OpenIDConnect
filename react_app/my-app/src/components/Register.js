import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

const Register = () => {
  const { keycloak } = useKeycloak()
  
  const register = useCallback(() => {
    keycloak.register()
  }, [keycloak])

  return (
    <li><a className="black-text" onClick={register} href="#top">Register</a></li>
  )
}

export default Register 