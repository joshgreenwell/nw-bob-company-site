import { useEffect, useState } from 'react'
import {
  Stack,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router'

import { useProfiles, useProfileMutation } from '../hooks/use-profiles'
import { defaultProfile } from '../utils/constants'
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
const companies = [
  'Band of Brothertons',
  'Squad of Sistertons',
  'The Prideful',
  'The Black Syndicate'
]

const SkillBubble = ({ name, skill }) => (
  <Stack
    spacing={2}
    justifyContent="center"
    alignItems="center"
    sx={{ width: 200 }}
  >
    <Typography variant="h6" align="center" color="text.primary">{`${name
      .charAt(0)
      .toUpperCase()}${name.slice(1)}`}</Typography>
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
  const { mutateAsync: upcertProfile, isLoading: isLoadingMutation } =
    useProfileMutation()

  const [editing, setEditing] = useState(false)
  const [showCreate, setShowCreate] = useState(true)

  const [user, setUser] = useState({
    weapons: {},
    lf: [],
    skills: { crafting: {}, refining: {}, gathering: {} }
  })

  const [ign, setIgn] = useState()
  const [company, setCompany] = useState()
  const [level, setLevel] = useState()
  const [gs, setGs] = useState()
  const [armor, setArmor] = useState()
  const [primary, setPrimary] = useState()
  const [secondary, setSecondary] = useState()
  const [alternate, setAlternate] = useState()

  useEffect(() => {
    if (!isAuthenticated) history.push('/')
  }, [isAuthenticated])

  const createProfile = async () => {
    await upcertProfile({
      ...defaultProfile,
      sub: discordUser.sub.split('|')[2],
      ign: discordUser.nickname
    })
  }

  const updateProfile = async () => {
    await upcertProfile({
      sub: discordUser.sub.split('|')[2],
      ign,
      rank: user.rank,
      company,
      weapons: {
        primary,
        secondary,
        alt: alternate
      },
      armor,
      lf: [],
      skills: {
        gathering: {
          harvesting: {
            level: 0,
            gear: [0, 0, 0, 0, 0, 0],
            trophies: [0, 0, 0],
            recipe: false
          },
          logging: {
            level: 0,
            gear: [0, 0, 0, 0, 0, 0],
            trophies: [0, 0, 0],
            recipe: false
          },
          mining: {
            level: 0,
            gear: [0, 0, 0, 0, 0, 0],
            trophies: [0, 0, 0],
            recipe: false
          },
          skinning: {
            level: 0,
            gear: [0, 0, 0, 0, 0, 0],
            trophies: [0, 0, 0],
            recipe: false
          },
          fishing: {
            level: 0,
            gear: [0, 0, 0, 0, 0, 0],
            trophies: [0, 0, 0],
            recipe: false
          }
        },
        crafting: {
          furnishing: {
            level: 0,
            gear: [false, false, false, false, false, false],
            recipe: false
          },
          armoring: {
            level: 0,
            gear: [false, false, false, false, false, false],
            trophies: [0, 0, 0],
            recipe: false
          },
          arcana: {
            level: 0,
            gear: [false, false, false, false, false, false],
            trophies: [0, 0, 0],
            recipe: false
          },
          engineering: {
            level: 0,
            gear: [false, false, false, false, false, false],
            trophies: [0, 0, 0],
            recipe: false
          },
          cooking: {
            level: 0,
            gear: [false, false, false, false, false, false],
            trophies: [0, 0, 0],
            recipe: false
          },
          weaponsmithing: {
            level: 0,
            gear: [false, false, false, false, false, false],
            trophies: [0, 0, 0],
            recipe: false
          },
          jewlcrafting: {
            level: 0,
            gear: [false, false, false, false, false, false],
            trophies: [0, 0, 0],
            recipe: false
          }
        },
        refining: {
          weaving: {
            level: 0,
            gear: [false, false, false, false, false]
          },
          woodworking: {
            level: 0,
            gear: [false, false, false, false, false]
          },
          smelting: {
            level: 0,
            gear: [false, false, false, false, false]
          },
          tanning: {
            level: 0,
            gear: [false, false, false, false, false]
          },
          stonecutting: {
            level: 0,
            gear: [false, false, false, false, false]
          }
        }
      },
      level,
      gs,
      verified: user.verified
    })
  }

  useEffect(() => {
    if (profiles) {
      const newUser = profiles.find(
        (p) => p.sub === discordUser.sub.split('|')[2]
      )
      if (newUser) {
        setUser(newUser)
        setIgn(newUser.ign)
        setCompany(newUser.company)
        setLevel(newUser.level)
        setGs(newUser.gs)
        setArmor(newUser.armor)
        setPrimary(newUser.weapons.primary)
        setSecondary(newUser.weapons.secondary)
        setAlternate(newUser.weapons.alt)
        setShowCreate(false)
      } else {
        setShowCreate(true)
      }
    }
  }, [isLoading, profiles])

  const validate = () => {
    return ign && company && level > 0
  }

  const handleSave = async () => {
    const valid = validate()
    if (valid) {
      await updateProfile()
      setEditing(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
  }

  const editComponent = (
    <>
      <Stack spacing={1}>
        <TextField
          value={ign}
          onChange={(e) => setIgn(e.target.value)}
          sx={{ width: 300 }}
        />
        <Typography variant="h6" color="text.secondary">
          {`${user.rank ?? 'Settler'} of `}
          <Select
            sx={{ marginLeft: 1 }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            {companies.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" color="text.secondary">
            {`Level: `}
          </Typography>
          <TextField
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            sx={{ width: 100 }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" color="text.secondary">
            {`Gear Score: `}
          </Typography>
          <TextField
            type="number"
            value={gs}
            onChange={(e) => setGs(e.target.value)}
            sx={{ width: 100 }}
          />
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h4" color="text.primary">
          Loadout
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Primary Armor: `}
          <Select value={armor} onChange={(e) => setArmor(e.target.value)}>
            {armors.map((w) => (
              <MenuItem key={w} value={w}>
                {w}
              </MenuItem>
            ))}
          </Select>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Primary Weapon: `}
          <Select value={primary} onChange={(e) => setPrimary(e.target.value)}>
            {weapons.map((w) => (
              <MenuItem key={w} value={w}>
                {w}
              </MenuItem>
            ))}
          </Select>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Secondary Weapon: `}
          <Select
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          >
            {weapons.map((w) => (
              <MenuItem key={w} value={w}>
                {w}
              </MenuItem>
            ))}
          </Select>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Alternative Weapon: `}
          <Select
            value={alternate}
            onChange={(e) => setAlternate(e.target.value)}
          >
            {weapons.map((w) => (
              <MenuItem key={w} value={w}>
                {w}
              </MenuItem>
            ))}
          </Select>
        </Typography>
      </Stack>
    </>
  )

  const viewComponent = (
    <>
      <Stack spacing={1}>
        <Typography variant="h4" color="text.primary">
          {user.ign}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`${user.rank ?? 'Settler'} of ${user.company ?? ''}`}
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
          {`Primary Armor: ${user.armor ?? ''}`}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Primary Weapon: ${user.weapons.primary ?? ''}`}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Secondary Weapon: ${user.weapons.secondary ?? ''}`}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {`Alternative Weapon: ${user.weapons.alt ?? ''}`}
        </Typography>
      </Stack>
    </>
  )

  return isLoading || isLoadingMutation ? (
    <Loader />
  ) : (
    <Stack
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack spacing={4} sx={{ maxWidth: 1400, width: '100%' }}>
        {showCreate ? (
          <Stack justifyContent="center" alignItems="center">
            <Button
              color="secondary"
              variant="contained"
              onClick={createProfile}
            >
              Create Profile
            </Button>
          </Stack>
        ) : (
          <>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {!editing && (
                <Button variant="contained" onClick={() => setEditing(true)}>
                  Edit
                </Button>
              )}
              {editing && (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </Button>
              )}
              {editing && (
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </Stack>
            {editing ? editComponent : viewComponent}
            <Typography variant="h4" color="text.primary">
              Crafting
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {Object.entries(user.skills.crafting).map(([key, value]) => (
                <SkillBubble key={key} name={key} skill={value.level} />
              ))}
            </Box>
            <Typography variant="h4" color="text.primary">
              Refining
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {Object.entries(user.skills.refining).map(([key, value]) => (
                <SkillBubble key={key} name={key} skill={value.level} />
              ))}
            </Box>
            <Typography variant="h4" color="text.primary">
              Gathering
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {Object.entries(user.skills.gathering).map(([key, value]) => (
                <SkillBubble key={key} name={key} skill={value.level} />
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
          </>
        )}
      </Stack>
    </Stack>
  )
}
