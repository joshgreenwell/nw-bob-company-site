import { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField
} from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useMutation } from 'react-query'
import axios from 'axios'

import { Loader } from './loader'
import { queryClient } from '../'

const createWar = async (data) => {
  await axios.post(
    'https://w16w8d2yzb.execute-api.us-east-2.amazonaws.com/prod/v1/war/details',
    //'http://localhost:3333/dev/v1/war/details',
    { ...data }
  )
}

const locations = [
  'Everfall',
  'First Light',
  `Monarch's Bluffs`,
  'Windsward',
  'Brightwood',
  'Cutlass Keys',
  'Ebonscale Reach',
  'Mourningdale',
  'Reekwater',
  'Restless Shore',
  `Weaver's Fen`
]

export const CreateWarModal = ({ open, handleClose }) => {
  const {
    isLoading,
    isSuccess,
    mutateAsync: create
  } = useMutation(createWar, {
    onSuccess: () => {
      queryClient.invalidateQueries('checkedIn')
    }
  })

  const [type, setType] = useState('')
  const [where, setWhere] = useState('')
  const [when, setWhen] = useState()

  const submit = async () => {
    if (type && where && when) {
      await create({
        type,
        where,
        when: when.getTime(),
        groups: [],
        auxs: [],
        checkedin: []
      })
      close()
    }
  }

  const close = () => {
    setType('')
    setWhere('')
    setWhen(undefined)
    handleClose()
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess])

  return (
    <Modal open={open} onClose={close}>
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
          <Loader height='300px' />
        ) : (
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="attack">Attack</MenuItem>
                <MenuItem value="defend">Defend</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="where-label">Where</InputLabel>
              <Select
                labelId="where-label"
                value={where}
                label="Where"
                onChange={(e) => setWhere(e.target.value)}
              >
                {locations.map((w) => (
                  <MenuItem value={w} key={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <DateTimePicker
              label="When"
              value={when}
              onChange={(v) => setWhen(v)}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button variant="contained" onClick={submit}>
              Create
            </Button>
          </Stack>
        )}
        )}
      </Box>
    </Modal>
  )
}
