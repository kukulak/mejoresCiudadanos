import { prisma } from './database.server'
// import { hash, compare } from 'bcryptjs'
import pkg from 'bcryptjs'
const { hash, compare } = pkg
import { createCookieSessionStorage, redirect } from '@remix-run/node'

const SESSION_SECRET = process.env.SESSION_SECRET

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session_MC',
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, //30 days
    httpOnly: true,
    path: '/'
  }
})

async function createUserSession(userId, userName, userRole, redirectPath) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  session.set('userName', userName)
  session.set('userRole', userRole)
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  })
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  let userId = session.get('userId')
  const userName = session.get('userName')
  const role = session.get('userRole')
  console.log('getUserFromSession', userId)
  if (!userId) {
    console.log('NO SESSION')

    return (userId = null)
  }

  return { userId, userName, role }
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request)
  if (!userId) {
    throw redirect('/auth?mode=login')
  }

  return userId
}

export async function signup({ email, password, name }) {
  const existingUser = await prisma.user.findFirst({ where: { email } })
  if (existingUser) {
    const error = new Error(
      'A user with the provided email address exist already'
    )
    error.status = 422
    throw error
  }

  const passwordHash = await hash(password, 12)

  const user = await prisma.user.create({
    data: { name: name, email: email, password: passwordHash }
  })

  return createUserSession(user.id, user.name, user.role, '/dashboard')
}

export async function getUser(userId) {
  const existingUser = await prisma.user.findFirst({ where: { id: userId } })

  if (!existingUser) {
    const error = new Error(
      "User doesn't Exist, tell us who are you how you get here"
    )
    error.status = 401
    throw error
  }

  const data = {
    name: existingUser.name,
    nickname: existingUser.nickname,
    email: existingUser.email,
    role: existingUser.role,
    about: existingUser.about,
    address: existingUser.address,
    paypal: existingUser.paypal,
    privacy: existingUser.privacy,
    instagram: existingUser.instagram,
    facebook: existingUser.facebook
  }
  console.log('DATA GET USER', { data })
  return data
}

export async function getUsers() {
  console.log('IAMINGETUSERS')
  try {
    const users = await prisma.user.findMany()

    if (!users) {
      const error = new Error(
        "User doesn't Exist, tell us who are you how you get here"
      )
      error.status = 401
      throw error
    }

    console.log('DATA GET USER', { users })
    return users
  } catch (error) {
    throw new Error('GETTING THE USERS FAILED.')
  }
}

export async function updateUser(id, userData) {
  console.log('UPDATE USER', id, userData)
  try {
    await prisma.user.update({
      where: { id },
      data: {
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        role: userData.role,
        about: userData.about,
        address: userData.address,
        paypal: userData.paypal,
        privacy: userData.privacy,
        instagram: userData.instagram,
        facebook: userData.facebook
      }
    })
  } catch (error) {
    throw new Error('Failed to update user.')
  }
}

export async function deleteUser(id) {
  try {
    await prisma.user.delete({
      where: { id }
    })
  } catch (error) {
    throw new Error('Failed to delete USER')
  }
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (!existingUser) {
    const error = new Error(
      'Double check your info. The user does not exist in the DataBase'
    )
    error.status = 401
    throw error
  }
  console.log('ERROR -----  HORRROR FROM')

  const passwordCorrect = await compare(password, existingUser.password)

  if (!passwordCorrect) {
    const error = new Error('Double check the info provided')
    error.status = 401
    throw error
  }

  return createUserSession(
    existingUser.id,
    existingUser.name,
    existingUser.role,
    '/dashboard'
  )
}
