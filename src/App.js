import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

import { Preparation } from './views/preparation'
import { Home } from './views/home'
import { Profile } from './views/profile'
import { Roster } from './views/roster'
import { Loader } from './components/loader'
import { Sidebar } from './components/sidebar'

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontFamily: 'IM Fell DW Pica,Times,Times Roman,Times New Roman,serif'
}

function App() {
  const { user, loginWithRedirect, isAuthenticated, isLoading, logout } =
    useAuth0()

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <img
            src="//d2lchq0n03yu65.cloudfront.net/statics/2021-10-14/images/NW-bug.svg"
            alt=""
            height={35}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ margin: '0 30px 0 15px' }}
          >
            Band of Brothertons
          </Typography>
          <Stack sx={{ flexGrow: 1 }} direction="row" spacing={2}>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
            <Link to="/roster" style={linkStyle}>
              Roster
            </Link>
            <Link to="/prep" style={linkStyle}>
              War Prep
            </Link>
          </Stack>
          {isAuthenticated ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Link to="/profile" style={linkStyle}>
                {user.nickname}
              </Link>
              <Button
                onClick={() => logout({ returnTo: window.location.origin })}
                color="inherit"
              >
                Log Out
              </Button>
            </Stack>
          ) : (
            <Button onClick={() => loginWithRedirect()} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Sidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Switch>
            <Route exact path="/prep">
              <Preparation />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/roster">
              <Roster />
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
