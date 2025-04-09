import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './auth/AuthContext'
import './index.css'

// Import App directly instead of using lazy loading since it's causing issues
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
    </div>
  }>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Suspense>
)