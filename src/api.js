import axios from 'axios'
const API_URL=import.meta.env.VITE_API_URL||'https://api.petertecnet.com.br/api'
const APP_SLUG=import.meta.env.VITE_APP_SLUG||'prevora'
export const api=axios.create({baseURL:API_URL,timeout:20000,headers:{Accept:'application/json','X-App-Slug':APP_SLUG}})
api.interceptors.request.use(config=>{const token=sessionStorage.getItem('prevora_token');if(token)config.headers.Authorization='Bearer '+token;config.headers['X-App-Slug']=APP_SLUG;return config})
export function setToken(token){if(token)sessionStorage.setItem('prevora_token',token);else sessionStorage.removeItem('prevora_token')}
export async function track(type,entityType='Forecast',entityId=null,content={}){try{await api.post('/interactions/batch',{interactions:[{interaction_type:type,entity_type:entityType,entity_id:entityId,outcome:'success',content:{...content,source_channel:'prevora'}}]})}catch{}}
export function humanError(error,fallback='Não foi possível concluir esta ação.'){return error?.response?.data?.message||error?.response?.data?.error||fallback}