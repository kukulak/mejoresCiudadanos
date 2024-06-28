// import { FaLock, FaUserPlus } from 'react-icons/fa'
import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
  useLoaderData,
  useNavigate
} from '@remix-run/react'

function AuthForm(signUp) {
  const loaderData = useLoaderData()
  // const { role } = useLoaderData()

  console.log('MINOMBRE', loaderData?.role)
  // const loaderData = useLoaderData()
  const [searchParams] = useSearchParams()
  const navigation = useNavigation()
  // const navigate = useNavigate()
  const validationErrors = useActionData()
  // console.log('UZDER', validationErrors, loaderData)

  console.log('MODE', searchParams.get('mode'))
  let authMode = searchParams.get('mode') || 'login'

  // if (signUp) {
  //   authMode = 'signUp'
  // }

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User'
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Log in with existing user'

  const isSubmitting = navigation.state !== 'idle'

  // const logedIn = logedIn ? navigation('/')
  // if (loaderData?.userName) return navigate('/dashboard')

  return (
    <Form
      method="post"
      className="form flex flex-col gap-3 justify-between bg-darkest sm:w-1/3 p-8 "
      id="auth-form"
    >
      <div className="icon-img pb-10 text-light text-3xl">
        {/* {authMode === 'login' ? <FaLock /> : <FaUserPlus />} */}

        {authMode === 'login' ? 'LOGIN' : 'SINGIN'}
      </div>
      {authMode !== 'login' && (
        <>
          <label className="text-light" htmlFor="email">
            UserName
          </label>
          <input
            className="p-3 h-8 text-darkest"
            type="text"
            id="name"
            name="name"
            required
          />
        </>
      )}
      <label className="text-light" htmlFor="email">
        Email Address
      </label>
      <input
        className="p-3 h-8 text-darkest"
        type="email"
        id="email"
        name="email"
        required
      />
      <label className="text-light" htmlFor="password">
        Password
      </label>
      <input
        className="p-3 h-8 text-darkest"
        type="password"
        id="password"
        name="password"
        minLength={7}
      />
      {validationErrors && (
        <div>
          {Object.values(validationErrors).map(error => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div className="form-actions pt-10 flex flex-row flex-wrap gap-2 justify-between">
        <button className="text-light" disabled={isSubmitting}>
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>
        {loaderData?.role === 'USER' && (
          <Link
            className="text-light"
            to={authMode === 'login' ? '?mode=signup' : '?mode=login'}
          >
            {toggleBtnCaption}{' '}
          </Link>
        )}
      </div>
    </Form>
  )
}

export default AuthForm
