import { toast } from 'react-toastify'

export const axiosErrorHandler = (err) => {
  if (err.response) {
    toast.error(err.response.data.message)
  } else {
    toast.error('Internal server error.')
  }
}
