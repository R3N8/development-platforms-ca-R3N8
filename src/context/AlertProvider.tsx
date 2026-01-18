/**
 * Alert Context Provider = logic + state management for alerts.
 * Controls when an alert shows, what type, what message, and for how long.
 */

import { useState, useCallback } from "react";
import Alert from "../components/Alert";
import { AlertContext } from "./AlertContext";
import type { AlertState, AlertType } from "../types";


export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertState>(null);

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
}