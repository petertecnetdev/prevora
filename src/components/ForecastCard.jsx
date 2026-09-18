import {Link} from 'react-router-dom'
import {Clock3,MessageCircle,Users} from 'lucide-react'
export function probabilityLabel(value){return value===null||value===undefined?'Dados insuficientes':Math.round(value)+'%'}
export default function ForecastCard({forecast}){
  const p=forecast.platform_probability??forecast.community_probability
  return <Link to={'/previsao/'+forecast.slug} className="prediction-card"><div className="card-meta"><span className="tag">{forecast.category||'Geral'}</span><span>{forecast.author?.name||forecast.author?.username||'Previsor'}</span><span className={'status status-'+forecast.status}>{forecast.status}</span></div><h3>{forecast.statement}</h3><div className="probability"><strong>{probabilityLabel(p)}</strong>{p!==null&&p!==undefined&&<div className="prob-track"><span style={{width:p+'%'}}/></div>}</div><div className="card-footer"><span><Users size={14}/>{forecast.participant_count||0} participantes</span><span><MessageCircle size={14}/>{forecast.comment_count||0}</span><span><Clock3 size={14}/>{forecast.deadline_at?new Date(forecast.deadline_at).toLocaleDateString('pt-BR'):'sem prazo'}</span></div></Link>
}