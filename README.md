# 🎬 Cinemarket - Sistema de Gestão de Cinema

Sistema web desenvolvido para o gerenciamento de operações diárias da rede de cinemas "Cinemarket". Este projeto compõe o módulo administrativo do sistema, permitindo o cadastro de filmes, salas, agendamento de sessões e simulação de venda de ingressos.

O projeto foi desenvolvido como atividade prática da disciplina de **Desenvolvimento Web Frontend**.

**👨‍💻 Desenvolvido por:** Marlon Gabriel Da Silva Souza

## 🚀 Tecnologias Utilizadas

O projeto utiliza a stack moderna exigida na especificação, com a adição de bibliotecas de UI para melhor experiência do usuário:

- **Core:** React + Vite (Template TypeScript)  
- **Roteamento:** React Router DOM  
- **Estilização:** Bootstrap 5 (Grid System & Componentes)  
- **Ícones:** Lucide React (Substituindo/Complementando Bootstrap Icons)  
- **Validação:** Zod (Schemas e validação de formulários)  
- **Feedback Visual:** Sonner (Toasts/Notificações)  
- **Backend Simulado:** Json-Server (API REST)

## 📋 Funcionalidades

Conforme os requisitos funcionais, o sistema oferece:

### 1. Gestão de Filmes (`/filmes`)
- Listagem de todos os filmes cadastrados
- Cadastro de novos filmes com validação rigorosa (Título obrigatório, Sinopse > 10 caracteres, Duração > 0, etc.)
- Exclusão de filmes com confirmação

### 2. Gestão de Salas (`/salas`)
- Cadastro de salas com número único e capacidade máxima
- Visualização clara da capacidade e status das salas

### 3. Agendamento de Sessões (`/sessoes`)
- Vinculação entre filmes e salas já cadastrados
- Validação de datas (impede agendamento no passado)
- Listagem detalhada com horário, filme, sala e assentos disponíveis

### 4. Venda de Ingressos
- Interface integrada à listagem de sessões
- Simulação de compra com opções de ingresso Inteira e Meia-Entrada
- Cálculo automático do valor total e atualização em tempo real dos assentos disponíveis

## 📦 Instalação e Execução

Pré-requisitos: Ter o **Node.js** (versão 18 ou superior) instalado.

### Passo a passo:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/cinemarket.git

# 2. Entre na pasta do projeto
cd cinemarket

# 3. Instale as dependências
npm install

# 4. Inicie o backend simulado (em um terminal)
npx json-server --watch db.json --port 3000

# 5. Inicie o frontend (em outro terminal)
npm run dev
