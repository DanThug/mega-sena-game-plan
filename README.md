# 🎰 Mega Sena Game Plan

Um aplicativo Next.js moderno e completo para gerenciamento, acompanhamento e análise de jogos da Mega Sena.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## 📋 Sobre o Projeto

O **Mega Sena Game Plan** é uma aplicação web desenvolvida com Next.js que permite aos usuários:
- ✅ Cadastrar jogadores com seus números escolhidos
- ✅ Registrar múltiplos jogos sorteados da Mega Sena
- ✅ Comparar automaticamente jogadores com todos os jogos
- ✅ Identificar vencedores e combinações
- ✅ Exportar todos os dados em formato CSV
- ✅ Persistir informações localmente no navegador

## 🚀 Tecnologias Utilizadas

### Core
- **Next.js 15.5.6** - Framework React com App Router
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript 5** - Superset JavaScript com tipagem estática
- **Turbopack** - Bundler de próxima geração para desenvolvimento rápido

### UI/UX
- **Tailwind CSS v4** - Framework CSS utility-first
- **shadcn/ui** - Componentes de UI modernos e acessíveis
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones SVG otimizados
- **Sonner** - Sistema de notificações toast elegante

### Armazenamento
- **LocalStorage API** - Persistência de dados no navegador

## 📦 Pré-requisitos

- **Node.js** 18.17 ou superior
- **npm**, yarn, pnpm ou bun

## 🛠️ Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd mega-sena-game-plan

# Instale as dependências
npm install
```

## 💻 Como Usar

### Modo Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
mega-sena-game-plan/
├── app/                           # App Router do Next.js
│   ├── layout.tsx                # Layout raiz com Toaster
│   ├── page.tsx                  # Página inicial
│   ├── globals.css               # Estilos globais + customizações
│   └── MegaSena/
│       └── page.tsx              # Página principal da aplicação
├── components/                    # Componentes React
│   ├── ui/                       # Componentes shadcn/ui
│   │   ├── sonner.tsx           # Toast notifications
│   │   ├── alert-dialog.tsx     # Diálogos de confirmação
│   │   ├── button.tsx           # Botões
│   │   ├── card.tsx             # Cards
│   │   ├── input.tsx            # Inputs
│   │   ├── label.tsx            # Labels
│   │   └── tabs.tsx             # Tabs
│   ├── PlayerForm/
│   │   └── PlayerForm.tsx       # Formulário de cadastro de jogadores
│   ├── NumberMatchForm/
│   │   └── NumberMatchForm.tsx  # Formulário de jogos sorteados
│   └── PlayerCard/
│       └── PlayerCard.tsx       # Card de visualização de jogador
├── entities/                      # Modelos de dados
│   └── Player.json               # Schema do jogador
├── public/                        # Arquivos estáticos
├── package.json                   # Dependências do projeto
├── tsconfig.json                  # Configuração TypeScript
├── next.config.ts                 # Configuração Next.js
└── README.md                      # Documentação
```

## 🎯 Funcionalidades Implementadas

### ✅ Cadastro de Jogadores
- Avatar customizável (4 opções)
- Nome do jogador
- 6 números escolhidos (1-60)
- Validação de números únicos
- Armazenamento no localStorage

### ✅ Registro de Jogos
- Número do jogo
- 6 números sorteados (1-60)
- Data e hora automáticas
- Validação contra jogos duplicados
- Suporte a múltiplos jogos simultâneos

### ✅ Comparação e Análise
- Comparação automática de todos os jogadores com todos os jogos
- Destaque visual de números combinados
- Contador de combinações por jogador
- Identificação de vencedores (6 combinações)
- Visual especial para vencedores com coroa 👑

### ✅ Exportação de Dados
- Exportação completa em formato CSV
- Inclui todos os jogos cadastrados
- Inclui todos os jogadores e suas combinações
- Nome de arquivo com data automática
- Compatível com Excel e Google Sheets

### ✅ Interface Moderna
- Design responsivo (mobile-first)
- Tema claro/escuro automático
- Animações suaves
- Notificações elegantes (toast)
- Diálogos de confirmação
- Feedback visual em tempo real

### ✅ Persistência de Dados
- Dados salvos automaticamente no localStorage
- Carregamento automático ao iniciar
- Não requer backend
- Funciona offline

## 🎮 Como Usar a Aplicação

### 1️⃣ Cadastrar Jogadores
1. Acesse a aba **"Novo Jogador"**
2. Escolha um avatar
3. Digite o nome do jogador
4. Insira 6 números únicos entre 1 e 60
5. Clique em **"Adicionar jogador"**

### 2️⃣ Registrar Jogos
1. Acesse a aba **"Jogadores & Partidas"**
2. Digite o número do jogo
3. Insira os 6 números sorteados
4. Clique em **"Cadastrar números"**
5. O jogo será adicionado à lista

### 3️⃣ Visualizar Combinações
- Números destacados em **vermelho** = combinaram com algum jogo
- Badge mostra quantas combinações o jogador tem
- Jogadores com 6 combinações recebem badge de **"Vencedor!"** 👑

### 4️⃣ Exportar Dados
1. Na aba **"Jogadores & Partidas"**
2. Clique em **"Exportar jogos"**
3. Arquivo CSV será baixado automaticamente
4. Abra no Excel/Google Sheets para análise

### 5️⃣ Gerenciar Dados
- **Deletar Jogador**: Clique no ícone de lixeira no card
- **Deletar Jogo**: Clique no ícone de lixeira no card do jogo
- Confirmação necessária antes de deletar

## 🎨 Componentes Principais

### PlayerForm
Formulário completo para cadastro de novos jogadores com validação de dados.

### NumberMatchForm
Formulário para registro de jogos sorteados com verificação de duplicatas.

### PlayerCard
Card visual mostrando jogador, seus números e combinações encontradas.

### Sonner
Sistema de notificações toast para feedback de ações.

### AlertDialog
Diálogos modais para confirmação de ações destrutivas.

## 🔐 Armazenamento Local

A aplicação utiliza duas chaves no localStorage:

- **`megaSenaPlayers`**: Array de jogadores cadastrados
- **`megaSenaCurrentGame`**: Array de jogos sorteados

### Estrutura de Dados

```typescript
// Jogador
interface Player {
  id: string;
  name: string;
  avatar: string;
  numbers: number[];
  createdAt: string;
}

// Jogo
interface Game {
  gameId: string;
  numbers: number[];
  date: string;
}
```

## 🚀 Próximas Funcionalidades

- [ ] Gerador automático de números aleatórios
- [ ] Estatísticas avançadas (números mais sorteados)
- [ ] Histórico de resultados oficiais da Mega Sena
- [ ] Gráficos e visualizações de dados
- [ ] Bolões e grupos de apostas
- [ ] Sincronização em nuvem (Firebase/Supabase)
- [ ] PWA (Progressive Web App)
- [ ] Notificações push de resultados

## 📊 Formato CSV Exportado

```csv
JOGOS CADASTRADOS
Número do Jogo,Número 1,Número 2,Número 3,Número 4,Número 5,Número 6,Data
2765,5,12,23,35,42,58,18/10/2025 14:30:00

JOGADORES CADASTRADOS
Nome,Número 1,Número 2,Número 3,Número 4,Número 5,Número 6,Combinações
João Silva,5,12,15,23,35,42,5
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📝 Licença

Este projeto é privado e está em desenvolvimento para fins educacionais.

## 👨‍💻 Desenvolvedor

Desenvolvido com Next.js, TypeScript e ❤️

---

## ⚠️ Aviso Legal

**Este projeto é apenas para fins educacionais e de entretenimento.**

A Mega Sena é uma loteria oficial da Caixa Econômica Federal. Este aplicativo não tem qualquer relação com a Caixa ou com os sorteios oficiais. Não garantimos resultados e não nos responsabilizamos por apostas realizadas.

**Jogue com responsabilidade. 🍀**

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

**Versão:** 1.0.0  
**Última atualização:** Outubro 2025
