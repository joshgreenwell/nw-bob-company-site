import {
  Modal,
  Stack,
  Typography,
  Select,
  MenuItem,
  Button
} from '@mui/material'

export const RequestModal = ({ ign, open, close }) => {
  const handleClose = () => {
    close()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack>
        <Typography>{ign}</Typography>
        <Select>
          <MenuItem>Test</MenuItem>
        </Select>
        <Button>Request</Button>
        <Button>Cancel</Button>
      </Stack>
    </Modal>
  )
}
