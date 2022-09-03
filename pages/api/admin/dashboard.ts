import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Order, Product, User } from '../../../models'

type Data =
  | {
      numberOfOrders: number
      paidOrders: number
      notPaidOrders: number
      numberOfClients: number
      numberOfProducts: number
      numberWidthNoInventory: number
      lowInventory: number
    }
  | { message: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getDashboardInfo(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getDashboardInfo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect()
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    numberWidthNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ])
  await db.disconnect()

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    numberWidthNoInventory,
    lowInventory,
  })
}
