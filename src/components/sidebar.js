import { useEffect } from 'react'
import {
  Drawer,
  List,
  ListItem,
  Stack,
  Avatar,
  Toolbar,
  Typography
} from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

import { fetchProfile } from '../hooks/use-me'
import { queryClient } from '../'

import PeopleIcon from '@mui/icons-material/People'
import HomeIcon from '@mui/icons-material/Home'
import { GiAncientSword, GiStoneBlock, GiSpellBook, GiScrollQuill } from 'react-icons/gi'
import LogoutIcon from '@mui/icons-material/Logout'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

export const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth0()
  const { data: me } = useQuery(
    'me',
    () => fetchProfile(user.sub.split('|')[2]),
    { enabled: !!user?.sub }
  )
  const history = useHistory()

  useEffect(() => {
    queryClient.invalidateQueries('me')
  }, [user])

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{ width: '75px', boxSizing: 'border-box' }}
    >
      <Toolbar />
      <List>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/')}
        >
          <Stack alignItems="center" justifyContent="center">
            <HomeIcon sx={{ width: 30, height: 30 }} />
            <Typography variant="caption">Home</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/about')}
        >
          <Stack alignItems="center" justifyContent="center">
            <GiScrollQuill style={{ width: 30, height: 30 }} />
            <Typography variant="caption">About</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/roster')}
          disabled={!(me && me.verified)}
        >
          <Stack alignItems="center" justifyContent="center">
            <PeopleIcon sx={{ width: 30, height: 30 }} />
            <Typography variant="caption">Roster</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/crafting')}
          disabled={!(me && me.verified)}
        >
          <Stack alignItems="center" justifyContent="center">
            <GiStoneBlock style={{ width: 30, height: 30 }} />
            <Typography variant="caption">Crafting</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/calendar')}
          disabled={!(me && me.verified)}
        >
          <Stack alignItems="center" justifyContent="center">
            <CalendarTodayIcon sx={{ width: 30, height: 30 }} />
            <Typography variant="caption">Events</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/prep')}
        >
          <Stack alignItems="center" justifyContent="center">
            <GiAncientSword style={{ width: 30, height: 30 }} />
            <Typography variant="caption">War Prep</Typography>
          </Stack>
        </ListItem>
        <ListItem
          button
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => history.push('/resources')}
          disabled={!(me && me.verified)}
        >
          <Stack alignItems="center" justifyContent="center">
            <GiSpellBook style={{ width: 30, height: 30 }} />
            <Typography variant="caption">Resources</Typography>
          </Stack>
        </ListItem>
      </List>
      <div style={{ flexGrow: 1 }} />
      {isAuthenticated && (
        <List>
          <ListItem
            button
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px'
            }}
            onClick={() => history.push('/profile')}
          >
            <Stack alignItems="center" justifyContent="center">
              <Avatar src={user.picture} />
              <Typography variant="caption">Profile</Typography>
            </Stack>
          </ListItem>
          <ListItem
            button
            onClick={() => logout({ returnTo: window.location.origin })}
            sx={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Stack alignItems="center" justifyContent="center">
              <LogoutIcon sx={{ width: 30, height: 30 }} />
              <Typography variant="caption">Logout</Typography>
            </Stack>
          </ListItem>
        </List>
      )}
    </Drawer>
  )
}
