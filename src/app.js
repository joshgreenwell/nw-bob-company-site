import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'

import { useWorldStats } from './hooks/use-world-stats'
import { fetchProfile } from './hooks/use-me'

import { Preparation } from './views/preparation'
import { Home } from './views/home'
import { Profile } from './views/profile'
import { Roster } from './views/roster'
import { Calendar } from './views/calendar'
import { Resources } from './views/resources'
import { Crafting } from './views/crafting'

import { Loader } from './components/loader'
import { Sidebar } from './components/sidebar'

import { queryClient } from '.'

function App() {
  const { user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
  const { isLoading: isLoadingMe, data: me } = useQuery(
    'me',
    () => fetchProfile(user.sub.split('|')[2]),
    { enabled: !!user?.sub }
  )
  const theme = useTheme()

  const { isLoading: isLoadingWorldStats, data: worldStats } = useWorldStats()

  useEffect(() => {
    queryClient.invalidateQueries('me')
  }, [user])

  return (
    <Router>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <img
            src="//d2lchq0n03yu65.cloudfront.net/statics/2021-10-14/images/NW-bug.svg"
            alt=""
            height={35}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ margin: '0 30px 0 15px', flexGrow: 1 }}
          >
            Band of Brothertons
          </Typography>
          {isLoadingWorldStats ? (
            <Loader height="50px" />
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <div
                style={{
                  backgroundColor: worldStats
                    ? worldStats.status_enum === 'ACTIVE'
                      ? 'green'
                      : 'red'
                    : 'orange',
                  borderRadius: '50%',
                  display: 'inlineBlock',
                  height: '15px',
                  width: '15px'
                }}
              />
              <Typography>Samavasarana</Typography>
            </Stack>
          )}

          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect()} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
      <Sidebar />
      {isLoading || isLoadingMe ? (
        <Loader />
      ) : (
        <div style={{ marginLeft: '75px', padding: '0 30px' }}>
          <Switch>
            <Route exact path="/prep">
              <Preparation />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            {me && me.verified && (
              <Route exact path="/roster">
                <Roster />
              </Route>
            )}
            {me && me.verified && (
              <Route exact path="/crafting">
                <Crafting />
              </Route>
            )}
            {me && me.verified && (
              <Route exact path="/calendar">
                <Calendar />
              </Route>
            )}
            <Route exact path="/resources">
              <Resources />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      )}
      <Toolbar />
    </Router>
  )
}

export default App
