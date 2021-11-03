import React, { useState, useEffect } from 'react'
import {
  Stack,
  TextField,
  Button,
  Box,
  Modal,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material'
import { useMutation } from 'react-query'
import axios from 'axios'

import { Loader } from './loader'
import { queryClient } from '../'

const updateCheckedIn = async (data) => {
  await axios.post(
    'https://w16w8d2yzb.execute-api.us-east-2.amazonaws.com/prod/v1/war/check-in',
    // 'http://localhost:3333/dev/v1/war/check-in',
    { ...data }
  )
}

const weapons = [
  'Sword',
  'Hatchet',
  'Great Axe',
  'Hammer',
  'Spear',
  'Rapier',
  'Bow',
  'Musket',
  'Ice Gauntlet',
  'Fire Staff',
  'Life Staff'
]
const armors = ['Light', 'Medium', 'Heavy']
const roles = ['Tank', 'Melee', 'Mage', 'Range', 'Healer', 'Siege']

export const CheckIn = ({ open, handleClose, warId, groups }) => {
  const {
    isLoading,
    isSuccess,
    mutate: checkIn
  } = useMutation(updateCheckedIn, {
    onSuccess: () => {
      queryClient.invalidateQueries('warDetails')
    }
  })

  const [ign, setIgn] = useState('')
  const [level, setLevel] = useState(0)
  const [gs,setGs] = useState(0)
  const [w1, setW1] = useState('')
  const [w2, setW2] = useState('')
  const [w3, setW3] = useState('')
  const [armor, setArmor] = useState('')
  const [role, setRole] = useState('')
  const [pref, setPref] = useState('')

  const handleChange = (e) => {
    setIgn(e.target.value)
  }

  const submit = () => {
    if (ign) {
      checkIn({
        id: warId,
        checkIn: {
          name: ign,
          level: Math.max(Math.min(level, 60), 0),
          gs: Math.max(Math.min(gs, 600), 0),
          weapons: `${w1} / ${w2}${w3 ? ` - ${w3}` : ''}`,
          armor,
          role,
          pref
        }
      })
    }
  }

  const close = () => {
    setIgn('')
    setLevel(0)
    setGs(0)
    setW1('')
    setW2('')
    setW3('')
    setArmor('')
    setRole('')
    setPref('')
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
          <Loader height="300px" />
        ) : (
          <Stack spacing={2}>
            <TextField
              label="In Game Name"
              variant="outlined"
              placeholder="In Game Name"
              value={ign}
              onChange={handleChange}
            />
            <TextField
              label="Level"
              variant="outlined"
              type="number"
              placeholder="0"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <TextField
              label="Gear Score"
              variant="outlined"
              type="number"
              placeholder="0"
              value={gs}
              onChange={(e) => setGs(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="w1-label">Weapon 1</InputLabel>
              <Select
                labelId="w1-label"
                value={w1}
                label="Weapon 1"
                onChange={(e) => setW1(e.target.value)}
              >
                {weapons.map((w) => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="w2-label">Weapon 2</InputLabel>
              <Select
                labelId="w2-label"
                value={w2}
                label="Weapon 2"
                onChange={(e) => setW2(e.target.value)}
              >
                {weapons.map((w) => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="w3-label">Alt Weapon 2</InputLabel>
              <Select
                labelId="w3-label"
                value={w3}
                label="Weapon 3"
                onChange={(e) => setW3(e.target.value)}
              >
                {weapons.map((w) => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="armor-label">Armor Type</InputLabel>
              <Select
                labelId="armor-label"
                value={armor}
                label="Armor Type"
                onChange={(e) => setArmor(e.target.value)}
              >
                {armors.map((a) => (
                  <MenuItem key={a} value={a}>{a}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="pref-label">Preference</InputLabel>
              <Select
                labelId="pref-label"
                value={pref}
                label="Preference"
                onChange={(e) => setPref(e.target.value)}
              >
                {groups?.map((g) => (
                  <MenuItem key={g.section} value={g.section}>{g.section}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={submit}>
              Check In
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  )
}
