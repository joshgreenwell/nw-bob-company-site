import { Box, CircularProgress } from '@mui/material'

export const Loader = ({ height = '80vh' }) => {
  return (
    <Box
      sx={{
        height,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <CircularProgress />
    </Box>
  )
}
