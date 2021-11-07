import React, { useEffect, useState } from 'react'
import {
  Typography,
  Stack,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItem,
  Tooltip,
  Popover,
  Card,
  Divider
} from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import { RiSwordFill, RiShieldFill } from 'react-icons/ri'

import { WarGroups } from '../components/war-groups'
import { Supplies } from '../components/supplies'
import { CheckedInList } from '../components/checked-in-list'
import { Controls } from '../components/controls'
import { Loader } from '../components/loader'
import { CheckIn } from '../components/check-in'
import { Admin } from '../components/admin'
import { Help } from '../components/help-modal'

import { useWarDetails } from '../hooks/use-war-details'

export const Preparation = () => {
  const { isLoading, data: warDetails } = useWarDetails()
  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])

  // eslint-disable-next-line unicorn/no-null
  const [anchorEl, setAnchorEl] = useState(null)

  const [checkInOpen, setCheckInOpen] = useState(false)
  const [warId, setWarId] = useState()

  const [helpOpen, setHelpOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  const [uopen, setUOpen] = useState([])
  const [popen, setPOpen] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)

  const handleUCollapse = (i) => {
    const newOpen = [...uopen]
    newOpen[i] = !uopen[i]
    setUOpen(newOpen)
  }

  const handlePCollapse = (i) => {
    const newOpen = [...popen]
    newOpen[i] = !popen[i]
    setPOpen(newOpen)
  }

  const handleCheckIn = (id) => {
    setWarId(id)
    setCheckInOpen(true)
  }

  useEffect(() => {
    if (warDetails) {
      const u = []
      const p = []
      warDetails.forEach((wd) => {
        if (wd.when > Date.now()) u.push(wd)
        else p.push(wd)
      })
      setUpcoming(u)
      setPast(p)
    }
  }, [isLoading, warDetails])

  useEffect(() => {
    if (localStorage.getItem('a') === 'true') {
      setIsAdmin(true)
    }
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    // eslint-disable-next-line unicorn/no-null
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <CheckIn
          open={checkInOpen}
          handleClose={() => setCheckInOpen(false)}
          warId={warId}
          groups={warDetails?.find((w) => w.id === warId)?.groups ?? []}
        />
        <Admin open={adminOpen} handleClose={() => setAdminOpen(false)} />
        <Help open={helpOpen} handleClose={() => setHelpOpen(false)} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Card sx={{ padding: '30px', width: '300px' }}>
            <Stack spacing={2}>
              <Typography>
                <b>Attack:</b>
                <Typography>
                  For attack, their are 3 points you have to grab before you can
                  try to take the fort. Each point is taken by having more of
                  your team in the circle than the defense's team. Once all 3
                  points are taken, you can attack the fort doors, of which,
                  there are five. Three in the front, two in the back. Once in
                  the fort, you have to take the final point in the center of
                  the fort.
                </Typography>
              </Typography>
              <Typography>
                <b>Defense:</b>
                <Typography>
                  For defense, you will have to try to guard 3 points outside
                  the fort. If lost, attackers can break down the fort doors and
                  try to take the final point. Doors of the fort can be repaired
                  to thwart attacks. Siege weapons are mounted to the fort and
                  the forts defences are determined by the upgrades added by the
                  company that owns the territory, prior to the war.
                </Typography>
              </Typography>
              <Divider />
              <Typography>
                <b>Zerg:</b>
                <Typography>
                  This is the main army group. They will push onto the points
                  for both attack and defence.
                </Typography>
              </Typography>
              <Typography>
                <b>Havoc/Flex:</b>
                <Typography>
                  These are groups that fill the void. Constantly on the move
                  and going to where they are needed.
                </Typography>
              </Typography>
              <Typography>
                <b>Muskets:</b>
                <Typography>
                  As it says, this is a group of muskets. They are snipers and
                  look to take out siege or high value enemies in the back line.
                </Typography>
              </Typography>
              <Typography>
                <b>Siege:</b>
                <Typography>
                  This group works to setup (attack) and fire siege weapons.
                </Typography>
              </Typography>
            </Stack>
          </Card>
        </Popover>

        {isLoading ? (
          <Loader />
        ) : (
          <Stack sx={{ display: 'flex', maxWidth: 1000, width: '100%' }}>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              {isAdmin && <Controls />}
              <Button variant="contained" onClick={() => setHelpOpen(true)}>
                Help
              </Button>
              <Button variant="contained" onClick={() => setAdminOpen(true)}>
                Admin
              </Button>
            </Stack>

            <Typography
              variant="h4"
              color="textPrimary"
              sx={{
                marginBottom: '30px',
                fontFamily:
                  'IM Fell DW Pica,Times,Times Roman,Times New Roman,serif'
              }}
            >
              Upcoming Wars
            </Typography>
            {upcoming
              .sort((a, b) => b.when - a.when)
              .map((wd, i) => (
                <List sx={{ width: '100%', bgcolor: '#272624' }} key={i}>
                  <ListItem>
                    <ListItemIcon sx={{ paddingLeft: '15px' }}>
                      {wd.type === 'defend' ? (
                        <RiShieldFill />
                      ) : (
                        <RiSwordFill />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${wd?.where} ${new Date(
                        wd?.when
                      ).toLocaleString()} ${
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      }`}
                      sx={{ color: 'white', flexGrow: 1 }}
                    />
                    <Tooltip title="War Explanation">
                      <ListItemIcon>
                        <ListItemButton
                          aria-describedby={id}
                          onClick={handleClick}
                        >
                          <HelpOutlineIcon />
                        </ListItemButton>
                      </ListItemIcon>
                    </Tooltip>
                    <Tooltip title="Check-in is only available 60 minutes before war starts.">
                      <ListItemIcon>
                        <ListItemButton
                          disabled={wd.when - Date.now() > 60 * 60 * 1000}
                          onClick={() => handleCheckIn(wd.id)}
                          sx={{ width: '10%' }}
                        >
                          <PersonAddIcon />
                        </ListItemButton>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemIcon>
                      <ListItemButton onClick={() => handleUCollapse(i)}>
                        {uopen[i] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItemIcon>
                  </ListItem>
                  <Collapse in={uopen[i]} timeout="auto" unmountOnExit>
                    <Stack
                      spacing={2}
                      sx={{
                        display: 'flex',
                        padding: '30px'
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        War Details{' '}
                        {isAdmin && (
                          <Typography
                            variant="caption"
                            sx={{ marginLeft: '15px' }}
                          >
                            Leader Code: {wd.code}
                          </Typography>
                        )}
                      </Typography>
                      <WarGroups details={wd} />
                      <Supplies supplies={wd.supplies ?? []} />
                      <CheckedInList checkedIn={wd.checkedin} />
                    </Stack>
                  </Collapse>
                </List>
              ))}
            <Typography
              variant="h4"
              color="textPrimary"
              sx={{
                margin: '30px 0',
                fontFamily:
                  'IM Fell DW Pica,Times,Times Roman,Times New Roman,serif'
              }}
            >
              Past Wars
            </Typography>
            {past
              .sort((a, b) => b.when - a.when)
              .map((wd, i) => (
                <List sx={{ width: '100%', bgcolor: '#272624' }} key={i}>
                  <ListItem>
                    <ListItemIcon sx={{ paddingLeft: '15px' }}>
                      {wd.type === 'defend' ? (
                        <RiShieldFill />
                      ) : (
                        <RiSwordFill />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${wd?.where} ${new Date(
                        wd?.when
                      ).toLocaleString()} ${
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      }`}
                      sx={{ color: 'white', flexGrow: 1 }}
                    />
                    <ListItemIcon>
                      <ListItemButton onClick={() => handlePCollapse(i)}>
                        {popen[i] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItemIcon>
                  </ListItem>
                  <Collapse in={popen[i]} timeout="auto" unmountOnExit>
                    <Stack
                      spacing={2}
                      sx={{
                        display: 'flex',
                        padding: '30px'
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        War Details
                        {isAdmin && (
                          <Typography
                            variant="caption"
                            sx={{ marginLeft: '15px' }}
                          >
                            Leader Code: {wd.code}
                          </Typography>
                        )}
                      </Typography>
                      <WarGroups details={wd} />
                      <CheckedInList checkedIn={wd.checkedin} />
                    </Stack>
                  </Collapse>
                </List>
              ))}
          </Stack>
        )}
      </div>
    </>
  )
}
