import { Button, Stack, Typography } from '@mui/material'

export const Resources = () => {
  return (
    <main style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack
        spacing={4}
        sx={{
          maxWidth: 1000,
          width: '100%',
          padding: '0 30px',
          boxSizing: 'border-box'
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h6" color="textPrimary">
            Databases
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            href="https://nwdb.info/"
          >
            New World DB
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            href="https://new-world.guide/"
          >
            New World Guide
          </Button>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" color="textPrimary">
            Maps
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            href="https://www.newworld-map.com/#/"
          >
            Resource Map
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            href="https://mapgenie.io/new-world/maps/aeternum"
          >
            Map Genie
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h6" color="textPrimary">
            Guides
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            href="https://newworldfishingguide.com/"
          >
            Fishing Guide
          </Button>
        </Stack>
      </Stack>
    </main>
  )
}
