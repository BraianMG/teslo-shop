import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import {
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  LoginOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'
import { AuthContext, UiContext } from '../../context'
import { AdminPanel } from './AdminPanel'
import { CategoryPanel } from './CategoryPanel'

export const SideMenu = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
  const { user, isLoggedIn } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')

  const navigateTo = (url: string) => {
    toggleSideMenu()
    router.push(url)
  }

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return

    navigateTo(`/search/${searchTerm}`)
  }

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {/* Categorías */}
          <CategoryPanel navigateTo={navigateTo} />

          {/* Admin */}
          {user?.role === 'admin' && <AdminPanel />}

          {/* Perfil */}
          <Divider />
          <ListSubheader>Perfil</ListSubheader>

          {isLoggedIn && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Mis Ordenes'} />
              </ListItem>
            </>
          )}

          {isLoggedIn ? (
            <ListItem button>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={'Salir'} />
            </ListItem>
          ) : (
            <ListItem button>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Ingresar'} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
