import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export const CheckedInList = ({ checkedIn }) => {
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'timestamp', headerName: 'Checked In At', width: 125 },
    { field: 'level', headerName: 'Level', width: 75 },
    { field: 'gs', headerName: 'Gear Score', width: 100 },
    { field: 'weapons', headerName: 'Weapons', width: 225 },
    { field: 'armor', headerName: 'Armor', width: 100 },
    { field: 'role', headerName: 'Role', width: 75 },
    { field: 'pref', headerName: 'Pref', width: 75 }
  ]

  return (
    <>
      <Typography sx={{ color: 'white' }}>Checked In</Typography>
      <div style={{ height: 520, width: '100%' }}>
        <DataGrid
          sx={{ height: '400px' }}
          columns={columns}
          rows={checkedIn.map((c, i) => ({
            ...c,
            timestamp: new Date(c.timestamp).toLocaleTimeString(),
            id: i
          }))}
          loading={checkedIn.length === 0}
        />
      </div>
    </>
  )
}
