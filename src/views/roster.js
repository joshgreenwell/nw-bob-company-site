import { Stack, Typography, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

import { useProfiles } from '../hooks/useProfiles'
import { Loader } from '../components/loader'

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

  return isLoading ? (
    <Loader />
  ) : (
    <Stack alignItems="center">
      <Stack spacing={4} sx={{ maxWidth: 1400, width: '100%' }}>
        <Typography variant="h3" color="text.primary">
          Roster
        </Typography>
        <Paper sx={{ height: '70vh', backgroundColor: theme.palette.primary.main }}>
          <DataGrid
            sx={{ height: '100%' }}
            columns={columns}
            rows={profiles.map((p) => ({
              ...p,
              company: `${p.company.split(' ')[0].charAt(0)}${p.company
                .split(' ')[1]
                .charAt(0)}${p.company.split(' ')[2].charAt(0)}`,
              id: p.sub,
              primary: p.weapons.primary,
              secondary: p.weapons.secondary,
              alt: p.weapons.alt
            }))}
            loading={!profiles || profiles.length === 0}
          />
        </Paper>
      </Stack>
    </Stack>
  )
}
