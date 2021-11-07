import { useState, useEffect } from 'react'
import { Stack, Typography, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

import { useProfiles } from '../hooks/use-profiles'
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
            <Paper
              sx={{
                height: '30vh',
                backgroundColor: theme.palette.primary.main
              }}
            >
              <DataGrid
                sx={{ height: '100%' }}
                columns={columns}
                rows={unverified.map((p) => ({
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
          </>
        )}
      </Stack>
    </Stack>
  )
}
