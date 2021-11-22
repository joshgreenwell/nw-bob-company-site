import { useState } from 'react'
import {
  Stack,
  Typography,
  IconButton,
  Button,
  Card,
  List,
  ListItem
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import AddIcon from '@mui/icons-material/Add'

import { useProfiles } from '../hooks/use-profiles'
import { useMe } from '../hooks/use-me'
import { Loader } from './loader'
import { RequestModal } from './requests-modal'

const requests = [
  // {
  //   id: '1',
  //   skill: 'weaponsmithing',
  //   requester: '290623629652262912',
  //   items: [
  //     {
  //       name: 'Something'
  //     }
  //   ],
  //   fulfilled: false
  // },
  // {
  //   id: '2',
  //   skill: 'jewelcrafting',
  //   requester: '290623629652262912',
  //   items: [
  //     {
  //       name: 'Something'
  //     },
  //     {
  //       name: 'Something'
  //     }
  //   ],
  //   fulfilled: false
  // }
]

const skillNames = {
  weaponsmithing: 'Weapon Smithing',
  armoring: 'Armoring',
  engineering: 'Engineering',
  jewelcrafting: 'Jewelcrafting',
  arcana: 'Arcana',
  cooking: 'Cooking',
  furnishing: 'Furnishing'
}

export const RequestsTab = () => {
  const theme = useTheme()
  const { isLoading: isLoadingProfiles, data: profiles } = useProfiles()
  const { isLoading: isLoadingMe, data: me } = useMe()

  const [open, setOpen] = useState(false)

  return (
    <>
      <RequestModal open={open} close={() => setOpen(false)} ign={me?.ign} />
      <Stack spacing={4}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" color="textPrimary" sx={{ flexGrow: 1 }}>
            Requests
          </Typography>
          <IconButton onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack spacing={2}>
          {isLoadingProfiles || isLoadingMe ? (
            <Loader />
          ) : (
            requests.map(({ id, skill, requester, items }) => (
              <Card
                key={id}
                sx={{ background: theme.palette.primary.main, padding: '30px' }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" color="textPrimary">
                    {profiles.find((p) => p.sub === requester)?.ign ?? ''}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {skillNames[skill]}
                  </Typography>
                  <List>
                    {items.map(({ name }) => (
                      <ListItem>{name}</ListItem>
                    ))}
                  </List>
                  {(+me.skills.crafting[skill]?.level === 200 ||
                    (+me.skills.crafting[skill]?.level >= 100 &&
                      skill === 'furnishing')) && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ width: 150 }}
                    >
                      Fulfill
                    </Button>
                  )}
                </Stack>
              </Card>
            ))
          )}
        </Stack>
      </Stack>
    </>
  )
}
