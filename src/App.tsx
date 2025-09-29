import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'
import UnauthenticatedApp from './components/UnauthenticatedApp'
import AuthenticatedApp from './components/AuthenticatedApp'

function App() {
  const { isSignedIn } = useSubscribeDev()

  return isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
