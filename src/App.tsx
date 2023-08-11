import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouterPaths } from './routes/RouterPaths.routes'


function App() {

  //Auth0Provider is provided in the "main.tsx" file
  return (
    <>
      <BrowserRouter>

        <RouterPaths />

      </BrowserRouter >
    </>
  )
}

export default App
