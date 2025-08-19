# Chat IA - Frontend

Interface web moderna para interação com API de busca semântica usando LangChain e OpenAI.

## 🚀 Funcionalidades

- **Interface de Chat Moderna**: Design inspirado no Manus e DeepSeek
- **Busca Semântica**: Integração com API de busca semântica
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema Escuro/Claro**: Suporte automático baseado na preferência do sistema
- **Feedback Visual**: Indicadores de carregamento e status das mensagens
- **Metadados**: Exibe relevância e número de fontes encontradas

## 🛠️ Tecnologias

- **React 19**: Framework frontend moderno
- **Vite**: Build tool rápido e eficiente
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI de alta qualidade
- **Lucide React**: Ícones modernos
- **Framer Motion**: Animações suaves

## 📦 Instalação Local

```bash
# Clone o repositório
git clone <seu-repositorio>
cd chat-frontend

# Instale as dependências
pnpm install

# Execute em modo desenvolvimento
pnpm run dev
```

## 🌐 Deploy no Railway

### Método 1: Deploy Direto
1. Faça upload do projeto para um repositório Git
2. Conecte o repositório ao Railway
3. O Railway detectará automaticamente as configurações
4. Deploy será feito automaticamente

### Método 2: Railway CLI
```bash
# Instale o Railway CLI
npm install -g @railway/cli

# Faça login
railway login

# Inicialize o projeto
railway init

# Deploy
railway up
```

## 🔧 Configuração da API

A aplicação está configurada para se conectar com a API em:
```
https://web-production-bdf5b.up.railway.app/api/ask
```

Para alterar a URL da API, edite a constante `API_URL` no arquivo `src/App.jsx`:

```javascript
const API_URL = 'https://sua-api.railway.app/api/ask'
```

## 📱 Uso

1. **Digite sua pergunta** no campo de entrada
2. **Pressione Enter** ou clique no botão de envio
3. **Aguarde a resposta** da IA com base na busca semântica
4. **Visualize os metadados** como relevância e número de fontes

## 🎨 Personalização

### Cores e Tema
As cores podem ser personalizadas no arquivo `src/App.css` através das variáveis CSS customizadas.

### Componentes
Todos os componentes UI estão em `src/components/ui/` e podem ser customizados conforme necessário.

## 📁 Estrutura do Projeto

```
chat-frontend/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/ui/   # Componentes UI (shadcn/ui)
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos globais
│   └── main.jsx        # Ponto de entrada
├── package.json        # Dependências e scripts
├── Procfile           # Configuração Railway
├── railway.json       # Configurações Railway
└── README.md          # Esta documentação
```

## 🚨 Troubleshooting

### Erro de Conexão com API
- Verifique se a URL da API está correta
- Confirme se a API está online e funcionando
- Verifique as configurações de CORS na API

### Problemas de Build
- Execute `pnpm install` para garantir que todas as dependências estão instaladas
- Limpe o cache com `pnpm store prune`
- Verifique se a versão do Node.js é compatível (>= 18)

### Deploy no Railway
- Certifique-se de que o `Procfile` e `railway.json` estão na raiz do projeto
- Verifique os logs do Railway para identificar erros específicos
- Confirme se todas as dependências estão listadas no `package.json`

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ usando React e Tailwind CSS**

