import { useState } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils'
import { tesloApi } from '../../api'
import { ErrorOutline } from '@mui/icons-material'

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [showError, setShowError] = useState(false)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
    } catch (error) {
      console.log('Error en las credenciales')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }

    // TODO: navegar a la pantalla en la que estaba el usuario
  }

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: showError ? 'flex' : 'none' }}
                />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo"
                type="email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
