import { useContext } from 'react'
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
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'
import { UiContext } from '../../context'

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
  const router = useRouter()

  const nagifateTo = (url: string) => {
    toggleSideMenu()
    router.push(url)
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
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {/* Categorías */}
          <ListSubheader sx={{ display: { xs: '', sm: 'none' } }}>
            Categorías
          </ListSubheader>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={'Hombres'}
              onClick={() => nagifateTo('/category/men')}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={'Mujeres'}
              onClick={() => nagifateTo('/category/women')}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText
              primary={'Niños'}
              onClick={() => nagifateTo('/category/kid')}
            />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ordenes'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>

          {/* Perfil */}
          <Divider />
          <ListSubheader>Perfil</ListSubheader>

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

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
