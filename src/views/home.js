import { Toolbar, Typography, Stack, Box, Link, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useWorldStats } from '../hooks/use-world-stats'
import { useDevTracker } from '../hooks/use-dev-tracker'
import { Loader } from '../components/loader'

export const Home = () => {
  const theme = useTheme()
  const { isLoading: isLoadingWorldStats, data: worldStats } = useWorldStats()
  const { isLoading: isLoadingDevNotes, data: devNotes } = useDevTracker()

  const welcome = (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography
        component="h1"
        variant="h1"
        align="center"
        sx={{ maxWidth: 700 }}
        color="text.primary"
      >
        Welcome
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
      <Stack justifyContent="center" alignItems="center">
        {isLoadingWorldStats ? (
          <Loader height="100px" />
        ) : (
          <Stack>
            <Typography variant="h6" color="textPrimary">{`Server Status: ${
              worldStats?.status_enum ?? 'UNKNOWN'
            }`}</Typography>
            <Typography
              variant="h6"
              color="textPrimary"
            >{`Current Players Online: ${
              worldStats?.players_current ?? 0
            }`}</Typography>
            <Typography variant="h6" color="textPrimary">{`Possible Queue of: ${
              worldStats?.queue_current ?? 0
            } people`}</Typography>
            <Typography variant="h6" color="textPrimary">{`Queue Wait Time: ${
              worldStats?.queue_wait_time_minutes ?? 0
            } min`}</Typography>
          </Stack>
        )}
        <Divider sx={{ margin: '50px 0', width: '80%' }} />
        <Stack spacing={3} sx={{ width: '100%', maxWidth: 1000 }}>
          {isLoadingDevNotes ? (
            <Loader height="100px" />
          ) : (
            (devNotes || []).map((post, i) => (
              <Stack spacing={1} key={i}>
                <Typography variant="h6" color="textPrimary">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {`${post.developer_name} | ${new Date(
                    post.created_at
                  ).toLocaleString()} | `}
                  <Link color="inherit" href={post.source_url}>
                    Source
                  </Link>
                </Typography>
                <Typography
                  color="textSecondary"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></Typography>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </>
  )
}
