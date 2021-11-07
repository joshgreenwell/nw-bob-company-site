import { useQuery } from 'react-query'
import axios from 'axios'

const fetchWarDetails = async () => {
  const { status, data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/war/details`
  )

  return data
}

export const useWarDetails = () =>
  useQuery('warDetails', fetchWarDetails, { staleTime: 5 * 60_000 })
