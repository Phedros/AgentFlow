import { toast } from 'react-hot-toast'

/**
 * Hook simple que te devuelve la función `toast()`.
 * Lo usás en Flows.jsx con `const toast = useToast()`.
 */
export function useToast() {
  return toast
}
