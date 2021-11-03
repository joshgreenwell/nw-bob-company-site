import { useState } from 'react'
import { Button } from '@mui/material'

import { CreateWarModal } from './create-war-modal'

export const Controls = () => {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <>
      <CreateWarModal
        open={createOpen}
        handleClose={() => setCreateOpen(false)}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ width: '200px' }} onClick={() => setCreateOpen(true)}>
          Create War
        </Button>
      </div>
    </>
  )
}
