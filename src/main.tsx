import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'
import Providers from './Providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
