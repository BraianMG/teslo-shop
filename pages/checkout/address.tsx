import { GetServerSideProps } from 'next'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { ShopLayout } from '../../components/layouts'
// import { jwt } from '../../utils'

const AddressPage = () => {
  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección de destino"
    >
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Dirección" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección 2 (opcional)"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Código Postal" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Ciudad" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel>País</InputLabel>
            <Select variant="filled" label="País" value={1}>
              <MenuItem value={1}>Argentina</MenuItem>
              <MenuItem value={2}>Bolivia</MenuItem>
              <MenuItem value={3}>Brasil</MenuItem>
              <MenuItem value={4}>Chile</MenuItem>
              <MenuItem value={5}>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Teléfono" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  )
}

// Lo siguiente es en caso de no disponer de los Middlewares que introdujo Next en su versión 12
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies
//   let isValidToken = false

//   try {
//     await jwt.isValidToken(token)
//     isValidToken = true
//   } catch (error) {
//     isValidToken = false
//   }

//   if (!isValidToken)
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     }

//   return {
//     props: {},
//   }
// }

export default AddressPage


