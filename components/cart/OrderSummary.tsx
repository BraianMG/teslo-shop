import { Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { CartContext } from '../../context'
import { currency } from '../../utils'

export const OrderSummary = () => {
  const { orderSummary } = useContext(CartContext)
  
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nro Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {orderSummary.numberOfItems}{' '}
          {orderSummary.numberOfItems > 1 ? 'productos' : 'producto'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(orderSummary.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(orderSummary.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(orderSummary.total)}</Typography>
      </Grid>
    </Grid>
  )
}
