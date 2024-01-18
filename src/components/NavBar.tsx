import React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { logout } from '../userSlice'

const activeLink = {
  display: 'inline-block',
  margin: 2,
  fontWeight: 700,
  letterSpacing: 0.8,
  textDecoration: 'none',
  color: '#dafffb',
  borderBottom: '4px solid #dafffb',
}
const linkStyle = {
  display: 'inline-block',
  margin: 2,
  fontWeight: 700,
  letterSpacing: 0.8,
  textDecoration: 'none',
  color: '#dafffb',
  borderBottom: '4px solid transparent',
}

function LoggedInUser() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const dispatch = useDispatch()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon sx={{ fontSize: '2.5rem', color: '#dafffb' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link
          to={'/profile'}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <MenuItem key={'Profile'}>
            <Typography textAlign="center">{'Profile'}</Typography>
          </MenuItem>
        </Link>
        <MenuItem key={'Groups'} onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{'Groups'}</Typography>
        </MenuItem>
        <MenuItem
          key={'Logout'}
          onClick={() => {
            handleCloseUserMenu()
            handleLogout()
          }}
        >
          <Typography textAlign="center">{'Logout'}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

function LogoTitle() {
  return (
    <Typography
      variant="h5"
      noWrap
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-start' },
        textAlign: 'center',
        fontFamily: 'Kaushan Script, cursive',
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: '#dafffb',
        textDecoration: 'none',
        width: { xs: '33%', md: 'auto' },
      }}
    >
      <Link to="/" style={{ color: '#dafffb', textDecoration: 'none' }}>
        O(fast)
      </Link>
    </Typography>
  )
}

interface pagesProps {
  pages: string[]
}

function NavItems({ pages }: pagesProps) {
  const location = useLocation()

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'flex-end',
        mx: 2,
      }}
    >
      {pages.map((page) => (
        <Button
          component={Link}
          to={`/${page}`}
          key={page}
          sx={{
            ...(location.pathname === `/${page}` ? activeLink : linkStyle),
          }}
        >
          {page === '' ? 'HOME' : page}
        </Button>
      ))}
    </Box>
  )
}

function ResponsiveMenu({ pages }: pagesProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        width: { xs: '33%' },
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => (
          <Link
            key={page}
            style={{
              textTransform: 'capitalize',
              textDecoration: 'none',
              color: '#04364a',
            }}
            to={`/${page}`}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                {page === '' ? 'HOME' : page}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  )
}

function GetStarted() {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'flex' },
        justifyContent: 'flex-end',
        width: { xs: '33%', md: 'auto' },
      }}
    >
      <Button
        component={Link}
        to="/login"
        variant="contained"
        sx={{
          backgroundColor: '#dafffb',
          color: '#04364a',
          borderRadius: 50,
          fontWeight: 700,
          letterSpacing: 0.2,
          '&:hover': {
            backgroundColor: '#04364a',
            color: '#dafffb',
            boxShadow: 'inset 0 0 0 2px #dafffb',
          },
        }}
      >
        GET STARTED
      </Button>
    </Box>
  )
}

const before_pages = ['', 'ABOUT', 'LEARN', 'SOLVE']
const after_pages = ['', 'ABOUT', 'LEARN', 'SOLVE', 'SUBMIT']

function NavBar() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: { xs: 'flex' },
              flexDirection: { xs: 'row' },
              justifyContent: { xs: 'space-between' },
              alignItems: { xs: 'center' },
            }}
          >
            <ResponsiveMenu pages={before_pages} />
            <LogoTitle />
            <NavItems
              pages={user.signedIn && user.id ? after_pages : before_pages}
            />
            {user.signedIn && user.id ? <LoggedInUser /> : <GetStarted />}
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  )
}
export default NavBar
