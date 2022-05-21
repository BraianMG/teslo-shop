import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra si la orden esta pagada o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      )
    },
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Ver Orden</Link>
        </NextLink>
      )
    },
  },
]

const rows = [
  { id: 1, fullname: 'Braian Gonzales', paid: true },
  { id: 2, fullname: 'Fernanda Amaya', paid: false },
  { id: 3, fullname: 'Carlos Amaya', paid: false },
  { id: 4, fullname: 'Adelaida Ravanelli', paid: true },
  { id: 5, fullname: 'Elena Chavez', paid: false },
  { id: 6, fullname: 'Camila Gonzales', paid: true },
]

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
