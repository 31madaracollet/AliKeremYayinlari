import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { IcChart, IcLibrary, IcLogout, IcTarget, IcBook } from './Icons'

const NAV = [
  { to: '/', label: 'Ana Sayfa', Icon: IcBook, end: true },
  { to: '/kitaplik', label: 'Kitaplık', Icon: IcLibrary },
  { to: '/soru-bankasi', label: 'Soru Bankası', Icon: IcTarget },
  { to: '/istatistik', label: 'İstatistik', Icon: IcChart },
]

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 font-serif text-lg font-bold text-paper-50 shadow-sm transition-transform group-hover:-rotate-3">
        A
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-serif text-[15px] font-semibold tracking-tight text-ink-900">
            Ali Kerem Yayınları
          </span>
          <span className="mt-0.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Dijital Kitaplık
          </span>
        </span>
      )}
    </Link>
  )
}

export default function Shell() {
  const { user, logout } = useAuth()
  const loc = useLocation()

  return (
    <div className="paper-grain flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 border-b border-ink-800/10 bg-paper-100/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Logo />

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 rounded-xl px-3 py-2 font-sans text-[13.5px] font-medium transition-colors',
                    isActive
                      ? 'bg-brand-500/12 text-brand-700'
                      : 'text-ink-500 hover:bg-ink-800/5 hover:text-ink-900',
                  ].join(' ')
                }
              >
                <n.Icon size={16} />
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="hidden text-right sm:block">
              <div className="font-sans text-[13px] font-semibold leading-tight text-ink-800">
                {user?.displayName}
              </div>
              <div className="font-sans text-[10.5px] text-ink-400">@{user?.username}</div>
            </div>
            <button className="btn-icon" onClick={logout} title="Çıkış yap">
              <IcLogout size={17} />
            </button>
          </div>
        </div>

        {/* mobil sekmeler */}
        <nav className="flex gap-1 overflow-x-auto border-t border-ink-800/8 px-3 py-1.5 md:hidden">
          {NAV.map((n) => {
            const active = n.end ? loc.pathname === n.to : loc.pathname.startsWith(n.to)
            return (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={[
                  'flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-[12.5px] font-medium',
                  active ? 'bg-brand-500/12 text-brand-700' : 'text-ink-500',
                ].join(' ')}
              >
                <n.Icon size={14} />
                {n.label}
              </NavLink>
            )
          })}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-ink-800/10 bg-paper-100/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 sm:flex-row sm:items-center sm:px-6">
          <Logo />
          <p className="font-sans text-[12px] leading-relaxed text-ink-400 sm:ml-auto sm:text-right">
            LGS 8. sınıf dijital kitaplığı · 6 ders, {new Date().getFullYear()} baskısı
            <br />
            Notlarınız ve işaretlemeleriniz hesabınıza kaydedilir.
          </p>
        </div>
      </footer>
    </div>
  )
}
