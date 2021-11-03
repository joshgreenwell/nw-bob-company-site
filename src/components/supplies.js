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

export const Supplies = ({ supplies }) => {
  return (
    <>
      <Typography sx={{ color: 'white' }}>Supplies (Coming soon...)</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Stats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplies.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.quantity}</TableCell>
                <TableCell>{s.stats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
