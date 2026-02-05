# Teste Técnico

## 🎯 Desafio: Mini CRM de Leads

Você deve construir uma aplicação fullstack para gerenciamento de **leads** e seus **contatos**, composta por uma **API REST** e uma **interface web**.

**Prazo de entrega: 3 dias**

---

## 📋 Requisitos Obrigatórios

### API (Hono + TypeScript)

#### Contatos

- [ ] **GET /contacts** - Listar contatos
  - Query param `search`: filtra por nome ou email (case insensitive)
- [ ] **POST /contacts** - Criar novo contato
  - Validação de dados com Zod
  - Retornar erro 400 se dados inválidos
- [ ] **PUT /contacts/:id** - Atualizar contato existente
  - Validação de dados com Zod
  - Retornar erro 400 se dados inválidos

#### Leads

- [ ] **GET /leads** - Listar leads
  - Query param `search`: filtra por nome ou empresa (case insensitive)
  - Query param `status`: filtra por status (`novo`, `contactado`, `qualificado`, `convertido`, `perdido`)
- [ ] **POST /leads** - Criar novo lead (vinculado a um contato via `contactId`)
  - Validação de dados com Zod
  - Retornar erro 400 se dados inválidos
- [ ] **PUT /leads/:id** - Atualizar lead existente
  - Validação de dados com Zod
  - Retornar erro 400 se dados inválidos
- [ ] **GET /contacts/:contactId/leads** - Listar leads de um contato específico

### Frontend (React + TypeScript)

- [ ] Listagem de leads em tabela
- [ ] Campo de busca por nome/empresa
- [ ] Filtro por status (dropdown, tabs ou botões)
- [ ] Formulário para criar novo lead (selecionando um contato existente)
- [ ] Listagem de contatos
- [ ] Formulário para criar novo contato
- [ ] Visualização dos leads vinculados a um contato
- [ ] Feedback visual de loading e erro

---

## 📦 Modelo de Dados

```typescript
interface Contact {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string // ISO date
}

interface Lead {
  id: string
  contactId: string // referência ao contato (Contact.id)
  name: string
  company: string
  status: 'novo' | 'contactado' | 'qualificado' | 'convertido' | 'perdido'
  createdAt: string // ISO date
}
```

### Relacionamento

- Um **Contact** pode ter N **Leads** (1:N)
- Todo **Lead** pertence a um **Contact** (via `contactId`)

### Validações para criação de Contato:

- `name`: obrigatório, mínimo 2 caracteres
- `email`: obrigatório, formato de email válido
- `phone`: obrigatório

### Validações para criação de Lead:

- `contactId`: obrigatório, deve referenciar um contato existente
- `name`: obrigatório, mínimo 2 caracteres
- `company`: obrigatório, mínimo 2 caracteres
- `status`: obrigatório, deve ser um dos valores permitidos

---

## ⭐ Diferenciais (não obrigatórios)

- Paginação na listagem de leads
- Edição de lead existente
- Edição de contato existente
- Remoção de lead (com confirmação)
- Remoção de contato (com confirmação)
- Ordenação por nome ou data
- Testes unitários
- Responsividade

---

## 🛠️ Stack

- **API**: Hono, TypeScript, Zod
- **Frontend**: React, TypeScript
- **Estilização**: Livre (CSS, Tailwind, styled-components, etc.)
- **Persistência**: Em memória (array) - não precisa de banco de dados

---

## 📂 Estrutura do Projeto

```
crm/
├── api/          # Backend Hono
├── web/          # Frontend React
└── README.md     # Este arquivo
```

---

## 📤 Entrega

1. Suba o código em um repositório Git (GitHub, GitLab, etc.)
2. Inclua um README com instruções para rodar o projeto
3. Envie o link do repositório

---

## ❓ Dúvidas

Se tiver qualquer dúvida sobre os requisitos, entre em contato pelo whatsapp: **(47) 93300-8369**

Boa sorte! 🚀

---
