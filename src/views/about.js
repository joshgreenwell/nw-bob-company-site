import { Stack, Typography } from '@mui/material'

export const About = () => {
  return (
    <Stack alignItems="center" sx={{ width: '100%' }}>
      <Stack sx={{ maxWidth: 1400, width: '100%' }} spacing={8}>
        <Stack spacing={2}>
          <Typography variant="h4" color="textPrimary">
            Signing Up
          </Typography>
          <Typography color="textPrimary">1. Click the Login button in the top right corner and authorize via Discord. We do not track, save, or use any of your personal information. We only read your Discord ID and Nickname.</Typography>
          <Typography color="textPrimary">2. Once logged in, click the Profile button at the bottom left corner. This will bring you to a page with a Generate Profile button on it.</Typography>
          <Typography color="textPrimary">3. Click the generate profile button. This will create a profile you within our system so you can save you character information. At this point you will NOT have access to restricted parts of the site.</Typography>
          <Typography color="textPrimary">4. Now that your profile exists, @ Juan Claude in the discord for verification. Once verified, you will have full access to the site!</Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h4" color="textPrimary">
            Features
          </Typography>
          <Typography color="textPrimary">Coming Soon...</Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h4" color="textPrimary">
            Roadmap
          </Typography>
          <Typography color="textPrimary">Coming Soon...</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
