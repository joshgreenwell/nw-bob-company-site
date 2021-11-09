import { Stack, Typography, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'

import { useProfiles } from '../hooks/use-profiles'
import { Loader } from '../components/loader'

export const Crafting = () => {
  const theme = useTheme()
  const { isLoading, data: profiles } = useProfiles()

  const columns = [
    { field: 'ign', headerName: 'Name', width: 150 },
    { field: 'weaponsmithing', headerName: 'Weapon Smithing', width: 130 },
    { field: 'armoring', headerName: 'Armoring', width: 85 },
    { field: 'engineering', headerName: 'Engineering', width: 100 },
    { field: 'jewelcrafting', headerName: 'Jewel Crafting', width: 115 },
    { field: 'arcana', headerName: 'Arcana', width: 70 },
    { field: 'cooking', headerName: 'Cooking', width: 85 },
    { field: 'furnishing', headerName: 'Furnishing', width: 100 },
    { field: 'smelting', headerName: 'Smelting', width: 90 },
    { field: 'weaving', headerName: 'Weaving', width: 90 },
    { field: 'woodworking', headerName: 'Woodworking', width: 120 },
    { field: 'tanning', headerName: 'Leatherworking', width: 120 },
    { field: 'stonecutting', headerName: 'Stonecutting', width: 100 }
  ]

  return isLoading ? (
    <Loader />
  ) : (
    <Stack alignItems="center">
      <Stack spacing={4} sx={{ maxWidth: 1400, width: '100%' }}>
        <Typography variant="h3" color="text.primary">
          Crafting
        </Typography>
        <Paper
          sx={{ height: '70vh', backgroundColor: theme.palette.primary.main }}
        >
          <DataGrid
            sx={{ height: '100%' }}
            columns={columns}
            rows={profiles.map((p) => ({
              ign: p.ign,
              id: p.sub,
              weaponsmithing: +(p.skills.crafting?.weaponsmithing.level ?? 0),
              armoring: +(p.skills.crafting?.armoring?.level ?? 0),
              engineering: +(p.skills.crafting?.engineering?.level ?? 0),
              jewelcrafting: +(p.skills.crafting?.jewelcrafting?.level ?? 0),
              arcana: +(p.skills.crafting?.arcana?.level ?? 0),
              cooking: +(p.skills.crafting?.cooking?.level ?? 0),
              furnishing: +(p.skills.crafting?.furnishing?.level ?? 0),
              smelting: +(p.skills.refining?.smelting?.level ?? 0),
              weaving: +(p.skills.refining?.weaving?.level ?? 0),
              woodworking: +(p.skills.refining?.woodworking?.level ?? 0),
              tanning: +(p.skills.refining?.tanning?.level ?? 0),
              stonecutting: +(p.skills.refining?.stonecutting?.level ?? 0)
            }))}
            loading={!profiles || profiles.length === 0}
          />
        </Paper>
      </Stack>
    </Stack>
  )
}
