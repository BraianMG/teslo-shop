import { Grid, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useContext } from 'react'
import { CartContext } from '../../context'
import { OrderSummary as IOrderSummary } from '../../interfaces'
import { currency } from '../../utils'

interface Props {
  orderValues: IOrderSummary
}

export const OrderSummary: NextPage<Props> = ({ orderValues }) => {
  const { orderSummary } = useContext(CartContext)

  const summaryValues = orderValues ? orderValues : orderSummary

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nro Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {summaryValues.numberOfItems}{' '}
          {summaryValues.numberOfItems > 1 ? 'productos' : 'producto'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {currency.format(summaryValues.total)}
        </Typography>
      </Grid>
    </Grid>
  )
}
