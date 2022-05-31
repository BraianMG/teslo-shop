import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs'
import { jwt, validations } from '../../../utils'

type Data =
  | { message: string }
  | {
      token: string
      user: {
        email: string
        name: string
        role: string
      }
    }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string }

  if (password.length < 8)
    return res
      .status(400)
      .json({ message: 'La constraseña debe ser de al menos 8 caracteres' })

  if (name.length < 2)
    return res
      .status(400)
      .json({ message: 'El nombre debe ser de al menos 2 caracteres' })

  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: 'El correo no es válido' })

  await db.connect()
  const user = await User.findOne({ email }).lean()

  if (user) {
    await db.disconnect()
    return res.status(400).json({ message: 'Correo ya registrado' })
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  })

  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Revisar logs del servidor' })
  }

  const { _id, role } = newUser

  const token = jwt.signToken(_id, email)

  res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  })
}
