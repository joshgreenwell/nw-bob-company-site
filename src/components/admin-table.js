import { useState } from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

export const AdminTable = () => {
  const groups = [
    {
      id: '1',
      section: 'Zerg',
      groups: '1-5 & 8-9',
      firstBuy: 'Haste pot & Mine'
    },
    {
      id: '2',
      section: 'Siege',
      groups: '6-7',
      firstBuy: 'Repeater'
    },
    {
      id: '3',
      section: 'Support',
      groups: '10',
      firstBuy: 'Haste pot & Mine'
    }
  ]

  const [selected, setSelected] = useState()

  const handleEdit = (id) => {
    setSelected(id)
  }
  const handleDelete = (id) => {
    // Delete
  }

  return (
    <>
      <Typography>War Groups</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell>Groups</TableCell>
              <TableCell>First Buy</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((g) => (
              <TableRow key={g.id}>
                <TableCell>{g.section}</TableCell>
                <TableCell>{g.groups}</TableCell>
                <TableCell>{g.firstBuy}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(1)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(1)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button>
        <AddIcon />
      </Button>
    </>
  )
}
