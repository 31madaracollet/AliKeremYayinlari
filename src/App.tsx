import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/lib/auth'
import Shell from '@/components/Shell'
import Login from '@/pages/Login'

const Home = lazy(() => import('@/pages/Home'))
const Library = lazy(() => import('@/pages/Library'))
const Reader = lazy(() => import('@/pages/Reader'))
const Bank = lazy(() => import('@/pages/Bank'))
const Stats = lazy(() => import('@/pages/Stats'))

function Splash({ text = 'Yükleniyor…' }: { text?: string }) {
  return (
    <div className="paper-grain grid min-h-[100dvh] place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 animate-pulse place-items-center rounded-2xl bg-brand-600 font-serif text-xl font-bold text-paper-50">
          A
        </div>
        <p className="font-sans text-[13px] tracking-wide text-ink-400">{text}</p>
      </div>
    </div>
  )
}

function Gate() {
  const { user, loading } = useAuth()
  if (loading) return <Splash />
  if (!user) return <Login />

  return (
    <Suspense fallback={<Splash />}>
      <Routes>
        <Route path="/oku/:bookId" element={<Reader />} />
        <Route element={<Shell />}>
          <Route path="/" element={<Home />} />
          <Route path="/kitaplik" element={<Library />} />
          <Route path="/soru-bankasi" element={<Bank />} />
          <Route path="/istatistik" element={<Stats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Gate />
      </AuthProvider>
    </BrowserRouter>
  )
}
