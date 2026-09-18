import { useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { Activity, BarChart3, Bell, CircleUserRound, Home, Plus, Search, Sparkles, Trophy, Zap } from 'lucide-react'
import { predictions } from './data'

const nav = [
  ['/', Home, 'Início'],
  ['/future', Activity, 'Futuro'],
  ['/ranking', Trophy, 'Ranking'],
  ['/profile', CircleUserRound, 'Perfil'],
]

function Shell({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <img src="/prevora-mark.svg" alt="" />
          <span>Prevora</span>
        </Link>
        <div className="top-actions">
          <button className="icon-btn" aria-label="Pesquisar"><Search size={19}/></button>
          <button className="icon-btn" aria-label="Notificações"><Bell size={19}/></button>
          <Link className="create-btn" to="/create"><Plus size={18}/>Prever</Link>
        </div>
      </header>
      <main className="page">{children}</main>
      <nav className="bottom-nav">
        {nav.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({isActive}) => isActive ? 'active' : ''}>
            <Icon size={20}/><span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function Probability({ value }) {
  return (
    <div className="probability">
      <strong>{value}%</strong>
      <div className="prob-track"><span style={{width: `${value}%`}} /></div>
    </div>
  )
}

function PredictionCard({ item }) {
  return (
    <Link to={`/prediction/${item.id}`} className="prediction-card">
      <div className="card-meta">
        <span className="tag">{item.category}</span>
        <span>{item.author}</span>
      </div>
      <h3>{item.statement}</h3>
      <Probability value={item.probability} />
      <div className="card-footer">
        <span>Comunidade {item.crowd}%</span>
        <span>{item.participants.toLocaleString('pt-BR')} participantes</span>
        <span>Até {item.deadline}</span>
      </div>
    </Link>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow"><Sparkles size={15}/> inteligência coletiva sobre o futuro</span>
          <h1>Onde previsões encontram a realidade.</h1>
          <p>Registre o que você acredita que vai acontecer. A Prevora mede probabilidades, acompanha evidências e transforma acertos consistentes em reputação.</p>
          <div className="hero-actions">
            <Link className="primary" to="/create"><Zap size={17}/>Fazer uma previsão</Link>
            <Link className="secondary" to="/future">Explorar o futuro</Link>
          </div>
        </div>
        <div className="signal-card">
          <span>Radar atual</span>
          <strong>63%</strong>
          <p>probabilidade média das previsões em destaque</p>
          <BarChart3 size={38}/>
        </div>
      </section>
      <section className="section-head">
        <div><span className="eyebrow">AGORA</span><h2>Previsões em destaque</h2></div>
      </section>
      <div className="feed">{predictions.map(p => <PredictionCard key={p.id} item={p}/>)}</div>
    </>
  )
}

function CreatePage() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const count = text.trim().length
  return (
    <section className="composer-wrap">
      <div className="section-head"><div><span className="eyebrow">NOVA PREVISÃO</span><h1>O que você acredita que vai acontecer?</h1></div></div>
      <div className="composer">
        <textarea autoFocus value={text} onChange={e => setText(e.target.value)} placeholder="Ex.: A empresa X anunciará um novo produto até dezembro de 2027." maxLength={800}/>
        <div className="composer-hint">
          <span>{count}/800</span>
          <span>A IA identificará prazo, categoria e critérios de verificação.</span>
        </div>
        <button className="primary wide" disabled={count < 15} onClick={() => navigate('/analysis', {state:{text}})}>Analisar previsão</button>
      </div>
      <div className="info-grid">
        <article><strong>1. Escreva naturalmente</strong><p>Você não precisa preencher formulários complexos.</p></article>
        <article><strong>2. Nós estruturamos</strong><p>A Prevora transforma o texto em uma previsão verificável.</p></article>
        <article><strong>3. A realidade decide</strong><p>Quando o prazo termina, o resultado alimenta sua reputação.</p></article>
      </div>
    </section>
  )
}

function AnalysisPage() {
  return (
    <section className="empty-state">
      <Sparkles size={42}/>
      <h1>Motor de análise preparado</h1>
      <p>A próxima etapa conecta esta tela ao Forecast Engine da API central para estruturar, estimar e validar a previsão antes da publicação.</p>
      <Link to="/create" className="secondary">Criar outra previsão</Link>
    </section>
  )
}

function FuturePage() {
  const avg = useMemo(() => Math.round(predictions.reduce((s,p)=>s+p.probability,0)/predictions.length),[])
  return (
    <section>
      <div className="section-head"><div><span className="eyebrow">RADAR DO FUTURO</span><h1>O que pode acontecer</h1></div><div className="metric"><strong>{avg}%</strong><span>média atual</span></div></div>
      <div className="feed">{[...predictions].sort((a,b)=>b.probability-a.probability).map(p=><PredictionCard key={p.id} item={p}/>)}</div>
    </section>
  )
}

function RankingPage() {
  const people = [['Helena Moraes','Tecnologia',91],['Caio Nunes','Economia',87],['Rafa Lima','Ciência',84],['Marina Alves','Mundo',81]]
  return (
    <section>
      <div className="section-head"><div><span className="eyebrow">REPUTAÇÃO</span><h1>Previsores em destaque</h1></div></div>
      <div className="ranking">{people.map((p,i)=><div className="rank-row" key={p[0]}><span className="rank-num">#{i+1}</span><div><strong>{p[0]}</strong><span>{p[1]}</span></div><b>{p[2]}</b></div>)}</div>
    </section>
  )
}

function ProfilePage() {
  return <section className="empty-state"><CircleUserRound size={48}/><h1>Seu histórico será sua reputação.</h1><p>Perfis mostrarão calibração, categorias, antecedência média, previsões resolvidas e evolução de credibilidade.</p></section>
}

function PredictionPage() {
  return <section className="empty-state"><Activity size={48}/><h1>Detalhe da previsão</h1><p>Esta rota está preparada para evidências, histórico de probabilidades, comentários e resolução verificável.</p><Link className="secondary" to="/">Voltar ao feed</Link></section>
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/analysis" element={<AnalysisPage/>}/>
        <Route path="/future" element={<FuturePage/>}/>
        <Route path="/ranking" element={<RankingPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/prediction/:id" element={<PredictionPage/>}/>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
    </Shell>
  )
}
