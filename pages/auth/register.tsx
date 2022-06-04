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
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { tesloApi } from '../../api'

type FormData = {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [showError, setShowError] = useState(false)

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      })
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
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
                <Chip
                  label="Correo ya registrado"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: showError ? 'flex' : 'none' }}
                />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                type="text"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                Registrarme
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
