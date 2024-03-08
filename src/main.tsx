import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <Toaster />
    <App />
  </RecoilRoot>
)
