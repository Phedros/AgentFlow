/* label.jsx */
import React from "react"

export function Label({ children, htmlFor, ...props }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900" {...props}>
      {children}
    </label>
  )
}