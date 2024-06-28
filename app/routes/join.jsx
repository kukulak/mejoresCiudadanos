import { redirect } from '@remix-run/node'
import { useSearchParams, useLoaderData, useActionData } from '@remix-run/react'

// import { requireUserSession } from '../../data/auth.server'

import AuthForm from '../components/auth/AuthForm'
import { login, signup } from '../../data/auth.server'
import { validateCredentials } from '../../data/validation.server'

export const meta = () => {
  return [
    { title: 'Log In' },
    {
      name: 'description',
      content:
        'Probablemente te puedas unir, enrealidad yo soy el unico que puede hacer esto!. Aquí puedo borrar, editar, y segmentar los comentarios'
    }
  ]
}

export default function AuthPage() {
  // const { userId } = useLoaderData()
  // console.log('UZDER', userId)

  // if (userId) {
  //   console.log('HAY USER')
  //   // throw redirect('/')
  //   // return redirect('/dashboard/profile')
  // }
  return (
    <main className=" min-h-[80vh] p-8 pb-72 flex justify-center items-center">
      <AuthForm signUp={true} />
    </main>
  )
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)
  console.log('CREDENTIALS', credentials)
  //validate user input
  try {
    validateCredentials(credentials)
  } catch (error) {
    return error
  }

  try {
    if (authMode === 'login') {
      console.log('ITS SIGNUP')
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
    }
  }
}

export async function loader({ request }) {
  // const userId = await requireUserSession(request)
  // const arts = await getArtByUser(userId)
  // if (userId) {
  //   console.log('HAY USER', userId)
  //   // throw redirect('/')
  //   return redirect('/dashboard')
  // }
  return null
}
