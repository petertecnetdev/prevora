import {useEffect} from 'react'
export default function Seo({title,description,canonical,jsonLd}){
  useEffect(()=>{
    const fullTitle=title?title+' | Prevora':'Prevora — Onde previsões encontram a realidade';document.title=fullTitle
    const setMeta=(key,value,property=false)=>{if(!value)return;const selector=property?'meta[property="'+key+'"]':'meta[name="'+key+'"]';let el=document.head.querySelector(selector);if(!el){el=document.createElement('meta');el.setAttribute(property?'property':'name',key);document.head.appendChild(el)}el.setAttribute('content',value)}
    setMeta('description',description);setMeta('og:title',fullTitle,true);setMeta('og:description',description,true);setMeta('og:type','website',true);setMeta('og:url',canonical,true)
    let link=document.head.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link)}if(canonical)link.href=canonical
    document.getElementById('prevora-jsonld')?.remove();if(jsonLd){const s=document.createElement('script');s.id='prevora-jsonld';s.type='application/ld+json';s.textContent=JSON.stringify(jsonLd);document.head.appendChild(s)}
  },[title,description,canonical,jsonLd]);return null
}