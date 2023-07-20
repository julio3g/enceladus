import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'

export function App() {
  return (
    <main className="h-screen bg-body text-neutral-500">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
