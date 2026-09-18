import {createContext,useContext,useEffect,useMemo,useState} from 'react'
import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'
import {api,setToken} from './api'
const AuthContext=createContext(null)
const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID||'google-client-not-configured'
export function AuthProvider({children}){
  const [user,setUser]=useState(null);const [loading,setLoading]=useState(Boolean(sessionStorage.getItem('prevora_token')))
  const refresh=async()=>{if(!sessionStorage.getItem('prevora_token')){setUser(null);setLoading(false);return}try{const{data}=await api.get('/auth/me');setUser(data?.user||data)}catch{setToken(null);setUser(null)}finally{setLoading(false)}}
  useEffect(()=>{refresh()},[])
  const loginGoogle=async credential=>{const{data}=await api.post('/auth/google',{token_id:credential});const token=typeof data?.token==='string'?data.token:data?.token?.access_token;if(!token)throw new Error('Token não retornado.');setToken(token);await refresh()}
  const logout=async()=>{try{await api.post('/auth/logout')}catch{}setToken(null);setUser(null)}
  const value=useMemo(()=>({user,loading,refresh,loginGoogle,logout,authenticated:Boolean(user)}),[user,loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function AuthRoot({children}){return <GoogleOAuthProvider clientId={clientId}><AuthProvider>{children}</AuthProvider></GoogleOAuthProvider>}
export function useAuth(){return useContext(AuthContext)}
export function GoogleSignIn({onSuccess,onError}){
  const{loginGoogle}=useAuth()
  if(!import.meta.env.VITE_GOOGLE_CLIENT_ID)return <p className="notice error">Login Google indisponível neste build.</p>
  return <GoogleLogin text="continue_with" shape="pill" theme="filled_black" onSuccess={async({credential})=>{try{await loginGoogle(credential);onSuccess?.()}catch(e){onError?.(e)}}} onError={()=>onError?.(new Error('Falha ao abrir o login Google.'))}/>
}