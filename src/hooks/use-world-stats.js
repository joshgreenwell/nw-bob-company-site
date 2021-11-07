import { useQuery } from 'react-query'
import axios from 'axios'

const fetchWorldStats = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/world/status`
  )

  return data
}

export const useWorldStats = () =>
  useQuery('worldStats', fetchWorldStats, { staleTime: 10 * 60_000 })
