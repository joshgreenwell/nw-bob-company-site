import { useQuery } from 'react-query'
import axios from 'axios'

export const fetchProfile = async (sub) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/company/${sub}`
  )

  return data
}

export const useMe = (sub) =>
  useQuery('me', () => fetchProfile(sub), {
    staleTime: 360_000,
    retry: false,
    enabled: !!sub
  })
