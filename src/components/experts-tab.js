import { useState } from 'react'
import {
  Stack,
  Typography,
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  Collapse
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export const ExpertsTab = ({ profiles }) => {
  const theme = useTheme()

  const [open, setOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ])

  const handleOpen = (index) => {
    const newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  }

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={4}>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/weaponsmithing.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Weapon Smithing
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(0)}>
            <ListItemText primary="Experts" />
            {open[0] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[0]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.crafting?.weaponsmithing?.level ??
                      p.skills?.crafting?.weaponsmithing
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/armoring.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Armoring
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(1)}>
            <ListItemText primary="Experts" />
            {open[1] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[1]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.crafting?.armoring?.level ??
                      p.skills?.crafting?.armoring
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src="https://gaming.tools/newworld/images/trade-skills/jewelcrafting.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Jewel Crafting
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(2)}>
            <ListItemText primary="Experts" />
            {open[2] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[2]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.crafting?.jewelcrafting?.level ??
                      p.skills?.crafting?.jewelcrafting
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
      </Stack>
      <Stack direction="row" spacing={4}>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/arcana.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Arcana
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(3)}>
            <ListItemText primary="Experts" />
            {open[3] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[3]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.crafting?.arcana?.level ??
                      p.skills?.crafting?.arcana
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/cooking.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Cooking
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(4)}>
            <ListItemText primary="Experts" />
            {open[4] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[4]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.crafting?.cooking?.level ??
                      p.skills?.crafting?.cooking
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/furnishing.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Furnishing
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(5)}>
            <ListItemText primary="Experts" />
            {open[5] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[5]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.crafting?.furnishing?.level ??
                      p.skills?.crafting?.furnishing
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
      </Stack>
      <Stack direction="row" spacing={4}>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/smelting.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Smelting
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(6)}>
            <ListItemText primary="Experts" />
            {open[6] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[6]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.refining?.smelting?.level ??
                      p.skills?.refining?.smelting
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/leatherworking.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Leatherworking
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(7)}>
            <ListItemText primary="Experts" />
            {open[7] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[7]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.refining?.tanning?.level ??
                      p.skills?.refining?.tanning
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src="https://gaming.tools/newworld/images/trade-skills/weaving.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Weaving
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(8)}>
            <ListItemText primary="Experts" />
            {open[8] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[8]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.refining?.weaving?.level ??
                      p.skills?.refining?.weaving
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
      </Stack>
      <Stack direction="row" spacing={4}>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/woodworking.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Woodworking
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(9)}>
            <ListItemText primary="Experts" />
            {open[9] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[9]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.refining?.woodworking?.level ??
                      p.skills?.refining?.woodworking
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Card
          sx={{
            background: theme.palette.primary.main,
            width: '100%',
            height: '100%',
            padding: '30px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://gaming.tools/newworld/images/trade-skills/stonecutting.png"
              width={150}
            />
          </Box>
          <Typography variant="h4" align="center">
            Stonecutting
          </Typography>
          <Typography variant="h2" align="center">
            200
          </Typography>
          <ListItem button onClick={() => handleOpen(10)}>
            <ListItemText primary="Experts" />
            {open[10] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[10]} timeout="auto">
            <List>
              {profiles
                .filter(
                  (p) =>
                    +(
                      p.skills?.refining?.stonecutting?.level ??
                      p.skills?.refining?.stonecutting
                    ) === 200
                )
                .map(({ ign }) => (
                  <ListItem button disableRipple>
                    <ListItemText primary={ign} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        </Card>
        <Box
          sx={{
            width: '100%',
            padding: '30px'
          }}
        ></Box>
      </Stack>
    </Stack>
  )
}
