import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { ApiError } from '@/lib/api'
import { Logo } from '@/components/Shell'
import { IcBook, IcHighlighter, IcNote, IcTarget } from '@/components/Icons'

const HIGHLIGHTS = [
  { Icon: IcBook, title: '6 ders, tam kitap', text: 'Türkçe, Matematik, Fen, İnkılap, Din Kültürü ve İngilizce — konu anlatımı, tablolar ve çözümlü örneklerle.' },
  { Icon: IcHighlighter, title: 'Fosforlu kalemler', text: 'Kitabın üstünü boya, altını çiz, serbest el kalemiyle yaz. Her işaret sayfasında durur.' },
  { Icon: IcNote, title: 'Kalıcı not defteri', text: 'Sol paneldeki deftere yazdığın her şey hesabına kaydedilir; başka cihazdan girince yine orada.' },
  { Icon: IcTarget, title: 'Soru bankası', text: 'Konu seç, test çöz, netini gör. Her denemen istatistiklerine işlenir.' },
]

export default function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'login') await login(username, password)
      else await register(username, password, displayName)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Bir şeyler ters gitti.')
    } finally {
      setBusy(false)
    }
  }

  async function demo() {
    setError(null)
    setBusy(true)
    try {
      await login('demo', 'demo1234')
    } catch {
      try {
        await register('demo', 'demo1234', 'Demo Öğrenci')
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Demo hesabına girilemedi.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="paper-grain grid min-h-[100dvh] lg:grid-cols-[1.05fr_1fr]">
      {/* ----------------------------------------------------- tanıtım */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-ink-900 px-10 py-12 text-paper-100 lg:flex xl:px-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-forest-500/20 blur-3xl" />

        <div className="relative">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 font-serif text-xl font-bold text-paper-50">
            A
          </span>
          <h1 className="mt-8 max-w-md font-serif text-[2.6rem] font-semibold leading-[1.08] tracking-tight">
            Kitabın üstüne yazabildiğin
            <span className="text-brand-300"> dijital kitaplık.</span>
          </h1>
          <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-paper-200/75">
            LGS’ye hazırlanırken kitabı ekranda oku, fosforlu kalemle işaretle, sol taraftaki deftere
            notunu al. Her şey hesabında kalır.
          </p>
        </div>

        <ul className="relative mt-10 grid gap-3 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <li key={h.title} className="rounded-2xl border border-paper-100/12 bg-paper-100/5 p-4">
              <h.Icon size={19} className="mb-2 text-brand-300" />
              <div className="font-sans text-[13.5px] font-semibold text-paper-100">{h.title}</div>
              <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-paper-200/60">{h.text}</p>
            </li>
          ))}
        </ul>

        <p className="relative mt-10 font-sans text-[11.5px] uppercase tracking-[0.2em] text-paper-200/35">
          Ali Kerem Yayınları · 2026
        </p>
      </section>

      {/* -------------------------------------------------------- form */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-ink-900">
            {mode === 'login' ? 'Tekrar hoş geldin' : 'Hesabını oluştur'}
          </h2>
          <p className="mt-1.5 font-sans text-[13.5px] text-ink-400">
            {mode === 'login'
              ? 'Notların ve işaretlemelerin seni bekliyor.'
              : 'Bir dakikada başla; okuduğun her sayfa kaydedilsin.'}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            {mode === 'register' && (
              <div>
                <label className="label">Adın</label>
                <input
                  className="field"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ali Kerem"
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label className="label">Kullanıcı adı</label>
              <input
                className="field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="alikerem"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="label">Şifre</label>
              <input
                className="field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </div>

            {error && (
              <p className="animate-fade-up rounded-xl border border-brand-500/25 bg-brand-50 px-3.5 py-2.5 font-sans text-[13px] text-brand-700">
                {error}
              </p>
            )}

            <button className="btn-primary w-full py-2.5" disabled={busy}>
              {busy ? 'Bekleyin…' : mode === 'login' ? 'Giriş yap' : 'Hesap oluştur'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="divider" />
            <span className="shrink-0 font-sans text-[11px] uppercase tracking-[0.15em] text-ink-400">
              veya
            </span>
            <span className="divider" />
          </div>

          <button className="btn-ghost w-full py-2.5" onClick={demo} disabled={busy}>
            Demo hesabıyla gez
          </button>

          <p className="mt-6 text-center font-sans text-[13px] text-ink-400">
            {mode === 'login' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}{' '}
            <button
              className="font-semibold text-brand-600 hover:underline"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setError(null)
              }}
            >
              {mode === 'login' ? 'Kayıt ol' : 'Giriş yap'}
            </button>
          </p>
        </div>
      </section>
    </div>
  )
}
