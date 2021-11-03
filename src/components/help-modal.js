import React from 'react'
import { Stack, Modal, Box, Typography } from '@mui/material'

export const Help = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Stack spacing={2}>
          <Typography color='textPrimary'>Please contact me using the below information for any support related questions or comments.</Typography>
          <Typography color="textPrimary">
            <b>IGN:</b> Juan Claude
          </Typography>
          <Typography color="textPrimary">
            <b>Company Discord:</b> Juan Claude (IGN)
          </Typography>
          <Typography color="textPrimary">
            <b>Syndicate Discord:</b> {`Juan Claude {B.o.B}`}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  )
}
