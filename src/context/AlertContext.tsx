/**
 * Alert Context = context for alert management.
 * Provides a way to show alerts from anywhere in the app.
 */

import { createContext } from "react";
import type { AlertContextType } from "../types";

export const AlertContext = createContext<AlertContextType | null>(null);

