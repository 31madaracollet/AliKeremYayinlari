import type React from 'react'
import type { FigureKind } from '@/content/types'

const S = {
  line: '#6b6153',
  ink: '#2a251d',
  soft: '#b39a6a',
  accent: '#b94f33',
  blue: '#1f4e79',
  green: '#3a7150',
}

function Mevsim() {
  const sun = { x: 210, y: 105 }
  const spots = [
    { x: 46, y: 105, label: '21 Aralık', season: 'Kış (KYK)' },
    { x: 210, y: 24, label: '21 Mart', season: 'İlkbahar' },
    { x: 374, y: 105, label: '21 Haziran', season: 'Yaz (KYK)' },
    { x: 210, y: 186, label: '23 Eylül', season: 'Sonbahar' },
  ]
  return (
    <svg viewBox="0 0 420 215" className="w-full">
      <ellipse cx={sun.x} cy={sun.y} rx="168" ry="82" fill="none" stroke={S.soft} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx={sun.x} cy={sun.y} r="19" fill="#f3b73f" />
      {[...Array(10)].map((_, i) => {
        const a = (i / 10) * Math.PI * 2
        return (
          <line
            key={i}
            x1={sun.x + Math.cos(a) * 23} y1={sun.y + Math.sin(a) * 23}
            x2={sun.x + Math.cos(a) * 30} y2={sun.y + Math.sin(a) * 30}
            stroke="#f3b73f" strokeWidth="1.6" strokeLinecap="round"
          />
        )
      })}
      <text x={sun.x} y={sun.y + 4} textAnchor="middle" fontSize="8" fill="#6b4a12" fontWeight="700">GÜNEŞ</text>
      {spots.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="15" fill="#cfe3f2" stroke={S.blue} strokeWidth="1.2" />
          <path d={`M${s.x - 10} ${s.y + 4} q10 -6 20 0`} stroke={S.green} strokeWidth="1.4" fill="none" />
          <line
            x1={s.x - 5} y1={s.y + 19} x2={s.x + 5} y2={s.y - 19}
            stroke={S.accent} strokeWidth="1.6" strokeLinecap="round"
          />
          <text x={s.x} y={s.y - 24} textAnchor="middle" fontSize="8.5" fill={S.ink} fontWeight="600">{s.label}</text>
          <text x={s.x} y={s.y + 32} textAnchor="middle" fontSize="7.5" fill={S.line}>{s.season}</text>
        </g>
      ))}
    </svg>
  )
}

function Kaldirac() {
  return (
    <svg viewBox="0 0 420 180" className="w-full">
      <polygon points="200,118 178,150 222,150" fill={S.soft} />
      <rect x="40" y="110" width="330" height="9" rx="4" fill={S.ink} transform="rotate(-4 200 115)" />
      <rect x="52" y="62" width="46" height="42" rx="4" fill={S.blue} opacity=".85" />
      <text x="75" y="88" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="700">Yük</text>
      <line x1="340" y1="60" x2="340" y2="96" stroke={S.accent} strokeWidth="2.4" markerEnd="url(#arrowDown)" />
      <defs>
        <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
          <path d="M1 1 L4 7 L7 1" fill="none" stroke={S.accent} strokeWidth="1.6" />
        </marker>
      </defs>
      <text x="340" y="52" textAnchor="middle" fontSize="11" fill={S.accent} fontWeight="700">Kuvvet</text>
      <line x1="75" y1="160" x2="200" y2="160" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="200" y1="160" x2="340" y2="160" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <text x="137" y="174" textAnchor="middle" fontSize="9.5" fill={S.line}>yük kolu (b)</text>
      <text x="270" y="174" textAnchor="middle" fontSize="9.5" fill={S.line}>kuvvet kolu (a)</text>
      <text x="200" y="168" textAnchor="middle" fontSize="9" fill={S.soft}>destek</text>
    </svg>
  )
}

function Makara() {
  return (
    <svg viewBox="0 0 420 190" className="w-full">
      <g>
        <line x1="30" y1="22" x2="180" y2="22" stroke={S.line} strokeWidth="3" />
        <circle cx="105" cy="42" r="18" fill="none" stroke={S.ink} strokeWidth="2.4" />
        <circle cx="105" cy="42" r="3" fill={S.ink} />
        <line x1="105" y1="24" x2="105" y2="22" stroke={S.ink} strokeWidth="2" />
        <path d="M87 42 V120" stroke={S.blue} strokeWidth="2" />
        <path d="M123 42 V120" stroke={S.accent} strokeWidth="2" />
        <rect x="72" y="120" width="30" height="26" rx="3" fill={S.blue} opacity=".85" />
        <text x="87" y="138" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">G</text>
        <text x="123" y="136" textAnchor="middle" fontSize="10" fill={S.accent} fontWeight="700">F = G</text>
        <text x="105" y="172" textAnchor="middle" fontSize="10.5" fill={S.ink} fontWeight="600">Sabit makara</text>
        <text x="105" y="185" textAnchor="middle" fontSize="8.5" fill={S.line}>yalnızca yön değişir</text>
      </g>
      <g>
        <line x1="240" y1="22" x2="390" y2="22" stroke={S.line} strokeWidth="3" />
        <path d="M280 22 V78" stroke={S.line} strokeWidth="2" />
        <circle cx="300" cy="86" r="18" fill="none" stroke={S.ink} strokeWidth="2.4" />
        <circle cx="300" cy="86" r="3" fill={S.ink} />
        <path d="M320 86 V22" stroke={S.accent} strokeWidth="2" />
        <path d="M300 104 V124" stroke={S.blue} strokeWidth="2" />
        <rect x="285" y="124" width="30" height="26" rx="3" fill={S.blue} opacity=".85" />
        <text x="300" y="142" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">G</text>
        <text x="352" y="60" textAnchor="middle" fontSize="10" fill={S.accent} fontWeight="700">F = G/2</text>
        <text x="300" y="172" textAnchor="middle" fontSize="10.5" fill={S.ink} fontWeight="600">Hareketli makara</text>
        <text x="300" y="185" textAnchor="middle" fontSize="8.5" fill={S.line}>kuvvetten 2 kat kazanç</text>
      </g>
    </svg>
  )
}

function Dna() {
  const pairs = [...Array(9)]
  return (
    <svg viewBox="0 0 420 190" className="w-full">
      <path
        d="M120 12 C160 46, 80 78, 120 112 C160 146, 80 166, 120 184"
        fill="none" stroke={S.blue} strokeWidth="3.4" strokeLinecap="round"
      />
      <path
        d="M190 12 C150 46, 230 78, 190 112 C150 146, 230 166, 190 184"
        fill="none" stroke={S.accent} strokeWidth="3.4" strokeLinecap="round"
      />
      {pairs.map((_, i) => {
        const y = 20 + i * 19
        const t = i / 8
        const spread = Math.abs(Math.sin(t * Math.PI * 2.1)) * 32 + 8
        const cx = 155
        const bases = [
          ['A', 'T'], ['G', 'C'], ['T', 'A'], ['C', 'G'], ['A', 'T'],
          ['T', 'A'], ['G', 'C'], ['C', 'G'], ['A', 'T'],
        ][i]
        return (
          <g key={i}>
            <line x1={cx - spread} y1={y} x2={cx + spread} y2={y} stroke={S.soft} strokeWidth="1.6" />
            <circle cx={cx - spread} cy={y} r="6.5" fill="#dce9f4" stroke={S.blue} strokeWidth="1" />
            <circle cx={cx + spread} cy={y} r="6.5" fill="#f7dcd3" stroke={S.accent} strokeWidth="1" />
            <text x={cx - spread} y={y + 3} textAnchor="middle" fontSize="7.5" fill={S.blue} fontWeight="700">{bases[0]}</text>
            <text x={cx + spread} y={y + 3} textAnchor="middle" fontSize="7.5" fill={S.accent} fontWeight="700">{bases[1]}</text>
          </g>
        )
      })}
      <g>
        <text x="270" y="44" fontSize="11" fill={S.ink} fontWeight="700">Baz eşleşmesi</text>
        <text x="270" y="64" fontSize="10" fill={S.line}>Adenin — Timin (A = T)</text>
        <text x="270" y="82" fontSize="10" fill={S.line}>Guanin — Sitozin (G = C)</text>
        <text x="270" y="110" fontSize="11" fill={S.ink} fontWeight="700">Nükleotit</text>
        <text x="270" y="130" fontSize="10" fill={S.line}>fosfat + deoksiriboz</text>
        <text x="270" y="146" fontSize="10" fill={S.line}>+ organik baz</text>
      </g>
    </svg>
  )
}

function Basinc() {
  return (
    <svg viewBox="0 0 420 170" className="w-full">
      <g>
        <rect x="30" y="40" width="120" height="70" rx="4" fill="#cbd9e6" stroke={S.blue} strokeWidth="1.6" />
        <text x="90" y="82" textAnchor="middle" fontSize="12" fill={S.blue} fontWeight="700">600 N</text>
        <line x1="24" y1="116" x2="156" y2="116" stroke={S.ink} strokeWidth="3" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1={30 + i * 17} y1="116" x2={24 + i * 17} y2="126" stroke={S.line} strokeWidth="1.2" />
        ))}
        <text x="90" y="145" textAnchor="middle" fontSize="10.5" fill={S.ink} fontWeight="600">Geniş yüzey</text>
        <text x="90" y="159" textAnchor="middle" fontSize="10" fill={S.green}>A = 0,6 m² → P = 1000 Pa</text>
      </g>
      <g>
        <rect x="285" y="40" width="42" height="70" rx="4" fill="#e8cfc6" stroke={S.accent} strokeWidth="1.6" />
        <text x="306" y="82" textAnchor="middle" fontSize="10" fill={S.accent} fontWeight="700">600 N</text>
        <line x1="240" y1="116" x2="372" y2="116" stroke={S.ink} strokeWidth="3" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1={246 + i * 17} y1="116" x2={240 + i * 17} y2="126" stroke={S.line} strokeWidth="1.2" />
        ))}
        <text x="306" y="145" textAnchor="middle" fontSize="10.5" fill={S.ink} fontWeight="600">Dar yüzey</text>
        <text x="306" y="159" textAnchor="middle" fontSize="10" fill={S.accent}>A = 0,2 m² → P = 3000 Pa</text>
      </g>
      <text x="210" y="28" textAnchor="middle" fontSize="11" fill={S.line} fontStyle="italic">P = F / A</text>
    </svg>
  )
}

function Ucgen() {
  return (
    <svg viewBox="0 0 420 200" className="w-full">
      <polygon points="70,165 350,165 190,35" fill="#f0e7d6" stroke={S.ink} strokeWidth="2" />
      <line x1="190" y1="35" x2="190" y2="165" stroke={S.accent} strokeWidth="1.6" strokeDasharray="5 4" />
      <rect x="190" y="152" width="13" height="13" fill="none" stroke={S.accent} strokeWidth="1.2" />
      <circle cx="70" cy="165" r="3" fill={S.ink} />
      <circle cx="350" cy="165" r="3" fill={S.ink} />
      <circle cx="190" cy="35" r="3" fill={S.ink} />
      <text x="58" y="182" fontSize="12" fill={S.ink} fontWeight="700">B</text>
      <text x="356" y="182" fontSize="12" fill={S.ink} fontWeight="700">C</text>
      <text x="185" y="26" fontSize="12" fill={S.ink} fontWeight="700">A</text>
      <text x="112" y="92" fontSize="11" fill={S.blue} fontWeight="600">c</text>
      <text x="280" y="92" fontSize="11" fill={S.blue} fontWeight="600">b</text>
      <text x="205" y="182" fontSize="11" fill={S.blue} fontWeight="600">a</text>
      <text x="198" y="108" fontSize="10.5" fill={S.accent} fontWeight="600">h (yükseklik)</text>
      <path d="M86 165 a16 16 0 0 1 8 -13" fill="none" stroke={S.green} strokeWidth="1.4" />
      <path d="M334 165 a16 16 0 0 0 -9 -13" fill="none" stroke={S.green} strokeWidth="1.4" />
      <text x="24" y="30" fontSize="10.5" fill={S.line}>|b − c| &lt; a &lt; b + c</text>
    </svg>
  )
}

function Pisagor() {
  return (
    <svg viewBox="0 0 420 240" className="w-full">
      <polygon points="150,150 210,150 150,110" fill="#f0e7d6" stroke={S.ink} strokeWidth="2" />
      <rect x="150" y="138" width="12" height="12" fill="none" stroke={S.ink} strokeWidth="1.2" />
      <rect x="150" y="150" width="60" height="60" fill="rgba(31,78,121,.14)" stroke={S.blue} strokeWidth="1.5" />
      <text x="180" y="185" textAnchor="middle" fontSize="13" fill={S.blue} fontWeight="700">a²</text>
      <rect x="90" y="110" width="60" height="40" fill="rgba(58,113,80,.14)" stroke={S.green} strokeWidth="1.5" />
      <text x="120" y="136" textAnchor="middle" fontSize="13" fill={S.green} fontWeight="700">b²</text>
      <g transform="rotate(-33.7 210 150)">
        <rect x="210" y="78" width="72" height="72" fill="rgba(185,79,51,.14)" stroke={S.accent} strokeWidth="1.5" />
        <text x="246" y="120" textAnchor="middle" fontSize="13" fill={S.accent} fontWeight="700">c²</text>
      </g>
      <text x="210" y="232" textAnchor="middle" fontSize="13" fill={S.ink} fontWeight="700" fontStyle="italic">a² + b² = c²</text>
    </svg>
  )
}

function Koordinat() {
  const ox = 210
  const oy = 105
  const u = 22
  const pt = (x: number, y: number) => `${ox + x * u},${oy - y * u}`
  return (
    <svg viewBox="0 0 420 215" className="w-full">
      {[...Array(19)].map((_, i) => (
        <line key={`v${i}`} x1={ox + (i - 9) * u} y1="8" x2={ox + (i - 9) * u} y2="202" stroke={S.soft} strokeWidth=".4" opacity=".5" />
      ))}
      {[...Array(9)].map((_, i) => (
        <line key={`h${i}`} x1="10" y1={oy + (i - 4) * u} x2="410" y2={oy + (i - 4) * u} stroke={S.soft} strokeWidth=".4" opacity=".5" />
      ))}
      <line x1="10" y1={oy} x2="410" y2={oy} stroke={S.ink} strokeWidth="1.4" />
      <line x1={ox} y1="8" x2={ox} y2="202" stroke={S.ink} strokeWidth="1.4" />
      <text x="404" y={oy - 6} fontSize="10" fill={S.ink}>x</text>
      <text x={ox + 6} y="16" fontSize="10" fill={S.ink}>y</text>

      <line x1={ox - 4 * u} y1={oy - (-4 * 2 + 1) * -u / u * 0} x2="0" y2="0" stroke="none" />
      <polyline
        points={`${pt(-3.5, -6)} ${pt(3.5, 8)}`}
        fill="none" stroke={S.blue} strokeWidth="2"
      />
      <text x={ox + 82} y={oy - 76} fontSize="10.5" fill={S.blue} fontWeight="700">y = 2x + 1</text>

      <circle cx={ox + 2 * u} cy={oy - 3 * u} r="4" fill={S.accent} />
      <text x={ox + 2 * u + 7} y={oy - 3 * u - 5} fontSize="10" fill={S.accent} fontWeight="600">A(2, 3)</text>
      <circle cx={ox - 2 * u} cy={oy - 3 * u} r="4" fill={S.green} />
      <text x={ox - 2 * u - 52} y={oy - 3 * u - 5} fontSize="10" fill={S.green} fontWeight="600">A′(−2, 3)</text>
      <path
        d={`M${ox + 2 * u - 6} ${oy - 3 * u - 12} q-38 -14 -76 0`}
        fill="none" stroke={S.line} strokeWidth="1" strokeDasharray="3 3"
      />
      <text x={ox} y={oy - 3 * u - 24} textAnchor="middle" fontSize="8.5" fill={S.line}>y eksenine göre yansıma</text>
      <circle cx={ox} cy={oy} r="3" fill={S.ink} />
      <text x={ox - 16} y={oy + 14} fontSize="9" fill={S.line}>O</text>
    </svg>
  )
}

function Elektrik() {
  return (
    <svg viewBox="0 0 420 200" className="w-full">
      <g>
        <text x="100" y="18" textAnchor="middle" fontSize="11" fill={S.ink} fontWeight="700">Seri bağlama</text>
        <rect x="26" y="34" width="148" height="92" rx="6" fill="none" stroke={S.ink} strokeWidth="1.8" />
        <rect x="88" y="26" width="24" height="16" fill="var(--paper-sheet, #fdfbf6)" />
        <line x1="92" y1="34" x2="92" y2="26" stroke={S.ink} strokeWidth="2.6" />
        <line x1="104" y1="34" x2="104" y2="22" stroke={S.ink} strokeWidth="1.4" />
        <circle cx="26" cy="80" r="11" fill="#fdf0c8" stroke={S.ink} strokeWidth="1.6" />
        <path d="M19 73 26 80 33 73M19 87 26 80 33 87" stroke={S.ink} strokeWidth="1" fill="none" />
        <circle cx="174" cy="80" r="11" fill="#fdf0c8" stroke={S.ink} strokeWidth="1.6" />
        <path d="M167 73 174 80 181 73M167 87 174 80 181 87" stroke={S.ink} strokeWidth="1" fill="none" />
        <text x="100" y="150" textAnchor="middle" fontSize="9" fill={S.line}>tek akım yolu</text>
        <text x="100" y="164" textAnchor="middle" fontSize="9" fill={S.accent}>biri sönerse hepsi söner</text>
      </g>
      <g>
        <text x="310" y="18" textAnchor="middle" fontSize="11" fill={S.ink} fontWeight="700">Paralel bağlama</text>
        <rect x="236" y="34" width="148" height="92" rx="6" fill="none" stroke={S.ink} strokeWidth="1.8" />
        <line x1="286" y1="34" x2="286" y2="126" stroke={S.ink} strokeWidth="1.8" />
        <line x1="334" y1="34" x2="334" y2="126" stroke={S.ink} strokeWidth="1.8" />
        <rect x="298" y="26" width="24" height="16" fill="var(--paper-sheet, #fdfbf6)" />
        <line x1="302" y1="34" x2="302" y2="26" stroke={S.ink} strokeWidth="2.6" />
        <line x1="314" y1="34" x2="314" y2="22" stroke={S.ink} strokeWidth="1.4" />
        <circle cx="286" cy="80" r="11" fill="#fdf0c8" stroke={S.ink} strokeWidth="1.6" />
        <path d="M279 73 286 80 293 73M279 87 286 80 293 87" stroke={S.ink} strokeWidth="1" fill="none" />
        <circle cx="334" cy="80" r="11" fill="#fdf0c8" stroke={S.ink} strokeWidth="1.6" />
        <path d="M327 73 334 80 341 73M327 87 334 80 341 87" stroke={S.ink} strokeWidth="1" fill="none" />
        <text x="310" y="150" textAnchor="middle" fontSize="9" fill={S.line}>birden çok akım yolu</text>
        <text x="310" y="164" textAnchor="middle" fontSize="9" fill={S.green}>biri sönse diğeri yanar</text>
      </g>
    </svg>
  )
}

const MAP: Record<FigureKind, () => React.ReactElement> = {
  mevsim: Mevsim,
  kaldirac: Kaldirac,
  makara: Makara,
  dna: Dna,
  basinc: Basinc,
  ucgen: Ucgen,
  pisagor: Pisagor,
  koordinat: Koordinat,
  elektrik: Elektrik,
}

export function Figure({ kind, caption }: { kind: FigureKind; caption: string }) {
  const Cmp = MAP[kind]
  return (
    <figure className="my-7">
      <div className="rounded-2xl border border-ink-800/10 bg-paper-100/50 px-3 py-4 sm:px-6">
        {Cmp ? <Cmp /> : null}
      </div>
      <figcaption className="mt-2.5 text-center font-sans text-[12.5px] italic leading-snug text-ink-400">
        Şekil · {caption}
      </figcaption>
    </figure>
  )
}
