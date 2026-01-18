/**
 * Alert Component
 * Displays an alert message with an icon based on the alert type.
 * Responsible for rendering the alert UI (icon styling, message).
 */

import type { AlertType, AlertProps } from "../types";

const styles: Record<AlertType, string> = {
    success: "bg-green-200 border-green-500 text-green-700",
    info: "bg-blue-200 border-blue-500 text-blue-700",
    warning: "bg-yellow-200 border-yellow-500 text-yellow-700",
    error: "bg-red-200 border-red-500 text-red-700",
};

const icons: Record<AlertType, string> = {
    success: "fa-circle-check",
    info: "fa-circle-info",
    warning: "fa-triangle-exclamation",
    error: "fa-circle-exclamation",
};

export default function Alert({ type, message }: AlertProps) {
    return (
        <div className={`flex flex-col justify-center items-center gap-3 px-4 py-3 rounded-md shadow ${styles[type]}`}>
            <i className={`fa-solid ${icons[type]} text-4xl`}></i>
            <p className="font-semibold text-lg">{message}</p>
        </div>
    )
}