import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@mui/material'

export const WarGroups = ({ details }) => {
  return (
    <>
      <Typography sx={{ color: 'white' }}>War Groups</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell>Groups</TableCell>
              <TableCell>First Buy</TableCell>
              <TableCell>Leader</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(details?.groups ?? []).map((g) => (
              <TableRow key={g.section}>
                <TableCell>{g.section}</TableCell>
                <TableCell>{g.groups}</TableCell>
                <TableCell>{g.firstBuy}</TableCell>
                <TableCell>{g.leader}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Auxiliary Roles</TableCell>
              <TableCell>Leader</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(details?.auxs ?? []).map((a) => (
              <TableRow key={a.section}>
                <TableCell>{a.section}</TableCell>
                <TableCell>{a.leader}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
