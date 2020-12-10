import * as React from "react";
import { useCallback } from "react";

import { useKeycloak } from "@react-keycloak/web";

/**
 * Logout component.
 * Explained in ./nav.js.
 */
const Logout = () => {
  /**
   * Component requires access to Keycloak.
   */
  const { keycloak } = useKeycloak();

  /**
   * On click keycloak.logout() is invoked.
   */
  const logout = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  /**
   * Returns a button with the logout event handler.
   */
  return (
    <li>
      <a className="black-text" onClick={logout} href="#top">
        Logout
      </a>
    </li>
  );
};

export default Logout;
