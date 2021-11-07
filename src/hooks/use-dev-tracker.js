import { useQuery } from 'react-query'
import axios from 'axios'

const fetchDevNotes = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/world/dev`)
  return data
}

export const useDevTracker = () =>
  useQuery('devTracker', fetchDevNotes, { staleTime: 10 * 60_000 })
