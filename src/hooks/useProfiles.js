import { useQuery } from 'react-query'
import axios from 'axios'

const fetchProfile = async () => {
  const { status, data } = await axios.get(
    'https://w16w8d2yzb.execute-api.us-east-2.amazonaws.com/prod/v1/company/profiles'
    //'http://localhost:3333/dev/v1/war/check-in'
  )

  return data
}

export const useProfiles = () => useQuery(
  'profiles',
  fetchProfile,
  { staleTime: 5 * 60000 }
)