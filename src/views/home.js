import { Toolbar, Typography, Stack, Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'

export const Home = () => {
  const theme = useTheme()
  const history = useHistory()

  const welcome = (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography
        component="h1"
        variant="h1"
        align="center"
        sx={{ maxWidth: 700 }}
        color="text.primary"
      >
        Welcome to the Family
      </Typography>
      <Typography
        variant="h3"
        align="center"
        sx={{ maxWidth: 600 }}
        color="text.secondary"
      >
        Home of the Band of Brothertons and Squad of Sistertons
      </Typography>
    </Stack>
  )

  const features = (
    <Box
      sx={{
        background: theme.palette.primary.main,
        width: '100%',
        height: '800px'
      }}
    ></Box>
  )

  return (
    <>
      {welcome}
      <Toolbar />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="contained" onClick={() => history.push('/prep')}>
          War Preparation
        </Button>
      </Stack>
    </>
  )
}
