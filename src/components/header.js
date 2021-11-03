import { AppBar, Toolbar, Typography, Button } from '@mui/material'

export const Header = ({ openAdmin, openHelp }) => {
  return (
    <>
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
            sx={{ marginLeft: '15px', flexGrow: 1 }}
          >
            New World War Preparation
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
