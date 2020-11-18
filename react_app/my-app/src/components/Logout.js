import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

const Logout = () => {
  const { keycloak } = useKeycloak()
  
  const logout = useCallback(() => {
    keycloak.logout()
  }, [keycloak])

  return (
    <li><a className="black-text" onClick={logout} href="#top">Logout</a></li>
  )
}

export default Logout 