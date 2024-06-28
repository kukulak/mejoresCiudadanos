// import { redirect } from '@remix-run/node'
import { useSearchParams, useLoaderData } from '@remix-run/react'

import AuthForm from '../components/auth/AuthForm'
import { getUserFromSession, login, signup } from '../../data/auth.server'
import { validateCredentials } from '../../data/validation.server'

// import { requireUserSession } from '../../data/auth.server'

export const meta = () => {
  return [
    { title: 'Log In' },
    {
      name: 'description',
      content: 'Entrar y crear usuario solo los grandes.'
    }
  ]
}

export default function AuthPage() {
  return (
    <main className="p-8 flex justify-center justify-items-start mt-32 min-h-screen items-start">
      <AuthForm signUp={false} />
    </main>
  )
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)

  //validate user input
  try {
    validateCredentials(credentials)
  } catch (error) {
    return error
  }

  try {
    if (authMode === 'login') {
      console.log('ITS LOGIN')
      console.log({ authMode })
      console.log(credentials)
      // return redirect('/dashboard')

      return await login(credentials)
    } else {
      return await signup(credentials)
      // return redirect('/dashboard')
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message }
    } else {
      return { credentials: error.message }
    }
    // console.log('EL ERROR DE LOGIN', error)
  }
}

export async function loader({ request }) {
  // const userId = await requireUserSession(request)
  const userName = await getUserFromSession(request)
  return userName
}
