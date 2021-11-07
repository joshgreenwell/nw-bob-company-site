import React, { useState } from 'react'
import { Stack, TextField, Button, Modal, Box, Typography } from '@mui/material'
import { useMutation } from 'react-query'

export const LeaderModal = ({ open, handleClose }) => {
  const { isLoading, isSuccess, mutate: checkAdminCode } = useMutation()

  const [code, setCode] = useState('')

  const handleChange = (e) => {
    setCode(e.target.value)
  }

  const submit = () => {
    if (code) {
      handleClose()
    }
  }

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
        {isLoading ? (
          <Loader height="300px" />
        ) : (
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              placeholder="War Code"
              value={code}
              onChange={handleChange}
            />
            <Button variant="contained" onClick={submit}>
              Submit
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  )
}
