import { useEffect, useState } from 'react'
import { Stack, Box, Typography, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router'

import { useProfiles } from '../hooks/useProfiles'

import { Loader } from '../components/loader'

const AttributeCircle = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.secondary.main}`
}))

const SkillBubble = ({ name, skill }) => (
  <Stack
    spacing={2}
    justifyContent="center"
    alignItems="center"
    sx={{ width: 200 }}
  >
    <Typography variant="h6" align="center" color="text.primary">{`${name
      .charAt(0)
      .toUpperCase()}${name.substring(1)}`}</Typography>
    <AttributeCircle>
      <Typography sx={{ fontSize: 30, fontWeight: 700 }} color="text.secondary">
        {skill}
      </Typography>
    </AttributeCircle>
  </Stack>
)

export const Profile = () => {
  const { user: discordUser, isAuthenticated } = useAuth0()
  const history = useHistory()

  const { isLoading, data: profiles } = useProfiles()

  const [editing, setEditing] = useState(false)

  const [user, setUser] = useState({
    weapons: {},
    lf: [],
    skills: { crafting: [], refining: [], gathering: [] }
  })

  useEffect(() => {
    if (!isAuthenticated) history.push('/')
  }, [])

  useEffect(() => {
    if (profiles) {
      const newUser = profiles.find((p) => p.sub === discordUser.sub)
      if (newUser) {
        setUser(newUser)
      } else {
        // Create new profile object
      }
    }
  }, [isLoading, profiles])

  const handleSave = () => {
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Stack
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack spacing={4} sx={{ maxWidth: 1400, width: '100%' }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {!editing && (
            <Button variant="contained" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
          {editing && (
            <Button color="secondary" variant="contained" onClick={handleSave}>
              Save
            </Button>
          )}
          {editing && (
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h4" color="text.primary">
            {user.ign}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`${user.rank} of ${user.company}`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`Level: ${user.level}`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`Gear Score: ${user.gs}`}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h4" color="text.primary">
            Loadout
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`Primary Armor: ${user.armor}`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`Primary Weapon: ${user.weapons.primary}`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`Secondary Weapon: ${user.weapons.secondary}`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {`Alternative Weapon: ${user.weapons.alt}`}
          </Typography>
        </Stack>
        <Typography variant="h4" color="text.primary">
          Crafting
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {Object.entries(user.skills.crafting).map(([key, value]) => (
            <SkillBubble key={key} name={key} skill={value} />
          ))}
        </Box>
        <Typography variant="h4" color="text.primary">
          Refining
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {Object.entries(user.skills.refining).map(([key, value]) => (
            <SkillBubble key={key} name={key} skill={value} />
          ))}
        </Box>
        <Typography variant="h4" color="text.primary">
          Gathering
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {Object.entries(user.skills.gathering).map(([key, value]) => (
            <SkillBubble key={key} name={key} skill={value} />
          ))}
        </Box>
        <Stack spacing={1}>
          <Typography variant="h4" color="text.primary">
            Looking For
          </Typography>
          {user.lf.map((lf) => (
            <Typography variant="h6" color="text.secondary">
              {lf}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
