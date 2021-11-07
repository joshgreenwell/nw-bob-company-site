import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import { queryClient } from '..'

const fetchProfile = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/company/profiles`
  )

  return data
}

export const useProfiles = () =>
  useQuery('profiles', fetchProfile, { staleTime: 5 * 60_000 })

const upcertProfile = async (profile) => {
  console.log(profile)
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/company/${profile.sub}`,
    profile
  )

  return data
}

export const useProfileMutation = () =>
  useMutation(upcertProfile, {
    onSuccess: (prof) => {
      queryClient.setQueryData('profiles', (old) => [
        ...old.filter((o) => o.sub !== prof.sub),
        prof
      ])
    },
    onSettled: () => {
      queryClient.invalidateQueries('profiles')
    }
  })
