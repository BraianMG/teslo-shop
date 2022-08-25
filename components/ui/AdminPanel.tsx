import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from '@mui/icons-material'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import React, { FC } from 'react'

interface Props {
  navigateTo: (url: string) => void
}

export const AdminPanel: FC<Props> = ({ navigateTo }) => {
  return (
    <>
      <ListSubheader>Admin Panel</ListSubheader>

      <ListItem button>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={'Productos'} />
      </ListItem>
      <ListItem button onClick={() => navigateTo('/orders/history')}>
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
    </>
  )
}
