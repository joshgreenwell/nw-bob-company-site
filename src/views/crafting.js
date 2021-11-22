import { useState } from 'react'
import {
  Stack,
  Typography,
  Paper,
  Tab,
  Box
} from '@mui/material'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'

import { useProfiles } from '../hooks/use-profiles'
import { Loader } from '../components/loader'
import { ExpertsTab } from '../components/experts-tab'
import { RequestsTab } from '../components/requests-tab'

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

  const [value, setValue] = useState(0)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Stack alignItems="center">
      <Stack spacing={4} sx={{ maxWidth: 1400, width: '100%' }}>
        <Typography variant="h3" color="text.primary">
          Crafting
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab
                label="Experts"
                sx={{
                  color: theme.palette.common.white,
                  '&.Mui-selected': {
                    color: theme.palette.secondary.dark
                  }
                }}
              />
              <Tab
                label="Requests"
                sx={{
                  color: theme.palette.common.white,
                  '&.Mui-selected': {
                    color: theme.palette.secondary.dark
                  }
                }}
              />
              <Tab
                label="Skills"
                sx={{
                  color: theme.palette.common.white,
                  '&.Mui-selected': {
                    color: theme.palette.secondary.dark
                  }
                }}
              />
            </TabList>
          </Box>
          <TabPanel value={0}>
            <ExpertsTab profiles={profiles} />
          </TabPanel>
          <TabPanel value={1}>
            <RequestsTab />
          </TabPanel>
          <TabPanel value={2}>
            <Stack spacing={4} sx={{ width: '100%' }}>
              <Paper
                sx={{
                  height: '70vh',
                  backgroundColor: theme.palette.primary.main
                }}
              >
                <DataGrid
                  sx={{ height: '100%' }}
                  columns={columns}
                  rows={profiles.map((p) => ({
                    ign: p.ign,
                    id: p.sub,
                    weaponsmithing: +(
                      p.skills.crafting?.weaponsmithing.level ?? 0
                    ),
                    armoring: +(p.skills.crafting?.armoring?.level ?? 0),
                    engineering: +(p.skills.crafting?.engineering?.level ?? 0),
                    jewelcrafting: +(
                      p.skills.crafting?.jewelcrafting?.level ?? 0
                    ),
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
          </TabPanel>
        </TabContext>
      </Stack>
    </Stack>
  )
}
