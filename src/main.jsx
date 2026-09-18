import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {AuthRoot} from './auth'
import App from './App'
import './styles.css'
class ErrorBoundary extends React.Component{constructor(props){super(props);this.state={error:false}}static getDerivedStateFromError(){return{error:true}}render(){if(this.state.error)return <main className="fatal"><img src="/prevora-mark.svg" alt=""/><h1>Algo não saiu como esperado.</h1><p>Seus dados continuam seguros. Recarregue a aplicação para tentar novamente.</p><button onClick={()=>location.reload()}>Recarregar</button></main>;return this.props.children}}
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><BrowserRouter><AuthRoot><App/></AuthRoot></BrowserRouter></ErrorBoundary></React.StrictMode>)