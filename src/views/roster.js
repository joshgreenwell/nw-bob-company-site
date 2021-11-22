import { useState, useEffect } from 'react'
import {
  Stack,
  Typography,
  Paper,
  Button,
  CircularProgress
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

import { useProfiles, useProfileMutation } from '../hooks/use-profiles'
import { Loader } from '../components/loader'

const getCompanyAbv = (name) => {
  let abv = ''
  name.split(' ').forEach((word) => {
    abv += word.charAt(0)
  })
  return abv
}

export const Roster = () => {
  const theme = useTheme()
  const { isLoading, data: profiles } = useProfiles()
  const { isLoading: isLoadingMutate, mutateAsync: updateProfile } =
    useProfileMutation()

  const columns = [
    { field: 'ign', headerName: 'Name', width: 150 },
    { field: 'company', headerName: 'Company', width: 100 },
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'level', headerName: 'Level', width: 75 },
    { field: 'gs', headerName: 'Gear Score', width: 100 },
    { field: 'armor', headerName: 'Armor', width: 100 },
    { field: 'primary', headerName: 'Primary', width: 120 },
    { field: 'secondary', headerName: 'Secondary', width: 120 },
    { field: 'alt', headerName: 'Alternative', width: 120 }
  ]

  const [verified, setVerified] = useState([])
  const [unverified, setUnverified] = useState([])

  const [selected, setSelected] = useState()

  useEffect(() => {
    if (profiles) {
      const newVerified = []
      const newUnverified = []

      profiles.forEach((p) => {
        if (p.verified) newVerified.push(p)
        else newUnverified.push(p)
      })

      setVerified(newVerified)
      setUnverified(newUnverified)
    }
  }, [profiles])

  const verify = () => {
    if (selected) {
      updateProfile({ ...selected, verified: true })
      setSelected(undefined)
    }
  }

  const handleCellClick = (params) => {
    setSelected(unverified.find((u) => u.sub === params.id))
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Stack alignItems="center">
      <Stack spacing={4} sx={{ maxWidth: 1400, width: '100%' }}>
        <Typography variant="h3" color="text.primary">
          Roster
        </Typography>
        <Paper
          sx={{ height: '70vh', backgroundColor: theme.palette.primary.main }}
        >
          <DataGrid
            sx={{ height: '100%' }}
            columns={columns}
            rows={verified.map((p) => ({
              ...p,
              company: p.company && getCompanyAbv(p.company),
              id: p.sub,
              primary: p.weapons.primary,
              secondary: p.weapons.secondary,
              alt: p.weapons.alt
            }))}
            loading={!profiles || profiles.length === 0}
          />
        </Paper>
        {unverified.length > 0 && (
          <>
            <Typography variant="h3" color="text.primary">
              Unverified Users
            </Typography>
            {localStorage.getItem('a') === 'true' && (
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography color="textPrimary">
                  {selected?.ign ?? ''}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ width: 100 }}
                  onClick={verify}
                >
                  {isLoadingMutate ? (
                    <CircularProgress color="secondary" size={22} />
                  ) : (
                    'Verify'
                  )}
                </Button>
              </Stack>
            )}
            <Paper
              sx={{
                display: 'flex',
                height: '30vh',
                backgroundColor: theme.palette.primary.main
              }}
            >
              <DataGrid
                sx={{
                  height: '100%'
                }}
                columns={columns}
                rows={unverified.map((p) => ({
                  ...p,
                  company: p.company && getCompanyAbv(p.company),
                  id: p.sub,
                  primary: p.weapons.primary,
                  secondary: p.weapons.secondary,
                  alt: p.weapons.alt
                }))}
                onCellClick={handleCellClick}
                loading={!profiles || profiles.length === 0}
              />
            </Paper>
          </>
        )}
      </Stack>
    </Stack>
  )
}
