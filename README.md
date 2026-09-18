# Prevora

Rede de previsões verificáveis da Peter Tecnet.

Princípios:
- Texto primeiro e interface leve.
- Previsões precisam de prazo e critério objetivo.
- Probabilidade não é certeza.
- Histórico publicado não é reescrito silenciosamente.
- Reputação usa Brier Score, calibração, quantidade resolvida e confiança.
- A plataforma não exibe probabilidade própria quando não há dados suficientes.

Desenvolvimento: npm install, copie .env.example para .env e execute npm run dev.
Produção: npm ci, npm run lint e npm run build.
A API compartilhada usa o cabeçalho X-App-Slug: prevora.
