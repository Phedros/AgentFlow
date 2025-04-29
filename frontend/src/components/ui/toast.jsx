import React from 'react'
import { Toaster } from 'react-hot-toast'

/**
 * Este componente monta el contenedor de toasts.
 * Lo puedes llamar ToasterContainer o simplemente Toaster, como prefieras.
 */
export function ToasterContainer() {
  return <Toaster position="top-right" />
}
