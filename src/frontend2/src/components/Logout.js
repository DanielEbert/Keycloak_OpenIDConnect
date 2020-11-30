import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

// explained in ./nav.js
const Logout = () => {
  const { keycloak } = useKeycloak()
  
  // keycloak.logout() is invoked if the anchor element is clicked
  const logout = useCallback(() => {
    keycloak.logout()
  }, [keycloak])

  return (
    <li><a className="black-text" onClick={logout} href="#top">Logout</a></li>
  )
}

export default Logout 
