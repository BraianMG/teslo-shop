import {
  EscalatorWarningOutlined,
  FemaleOutlined,
  MaleOutlined,
} from '@mui/icons-material'
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import React, { FC } from 'react'

interface Props {
  navigateTo: (url: string) => void
}

export const CategoryPanel: FC<Props> = ({ navigateTo }) => {
  return (
    <>
      <ListSubheader sx={{ display: { xs: '', sm: 'none' } }}>
        Categorías
      </ListSubheader>

      <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
        <ListItemIcon>
          <MaleOutlined />
        </ListItemIcon>
        <ListItemText
          primary={'Hombres'}
          onClick={() => navigateTo('/category/men')}
        />
      </ListItem>

      <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
        <ListItemIcon>
          <FemaleOutlined />
        </ListItemIcon>
        <ListItemText
          primary={'Mujeres'}
          onClick={() => navigateTo('/category/women')}
        />
      </ListItem>

      <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
        <ListItemIcon>
          <EscalatorWarningOutlined />
        </ListItemIcon>
        <ListItemText
          primary={'Niños'}
          onClick={() => navigateTo('/category/kid')}
        />
      </ListItem>

      <Divider sx={{ display: { xs: '', sm: 'none' } }} />
    </>
  )
}
