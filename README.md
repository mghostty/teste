# ⚙️ SCPL - Módulo Engenharia

Esse repositório contém o projeto Front-End do Módulo de Engenharia do Sistema SCPL, construído em VueJS 3 e Nuxt UI (w/ Vite e Typescript).

## TODO

Total de 23 páginas + 1 permissões

```
Home
Solicitação
  Solicitação de Etiquetas/Ícones
  Solicitação de Material
Defeito de Fabricação
Estruturas
Firmwares
IO's
Insumos / Produtos
Jigas
  Controle de Produto
  Lista de Erros
  Lista de Jigas
  Verificações de Jiga
Licenças
  QT
Pedidos
Projetos
Sendero
  Controle de Chassis
  Curva Volumétrica
  Curva de Saída
  Ordens de Venda
  Produto Jiga
Solda SMD
  Relatório
  Valores
Utilitários
  Drive
```

Novos:

```
Solicitação de Ensaio
Homologações
Histórico de Patrimônio
Família de Insumos
Panacim
```

## Variáveis de Ambiente

```yaml
# Application settings
VITE_APP_NAME="ms_front_eng"
VITE_NODE_ENV= "development"

# Application services
VITE_APP_MS_AT = "http://localhost:3002"
VITE_APP_MS_CMP="http://localhost:3004"
VITE_APP_MS_ENG = "http://localhost:3005"
VITE_APP_MS_VND = "http://localhost:3006"
VITE_APP_MS_DRIVE="http://localhost:3011"
VITE_APP_MS_INS="http://localhost:3202"
VITE_APP_MS_AUTH = "http://localhost:3200"
VITE_APP_MS_FORN="http://localhost:3209"
VITE_APP_MS_UPL = "http://localhost:3211"
VITE_APP_MS_EST="http://localhost:3214"
VITE_APP_MS_EST="https://apimsdev.lohr.com.br"
VITE_APP_MS_DOCS="http://localhost:3218"
```

## Links Úteis
-  [VueJS](https://vuejs.org/)
- [Nuxt UI](https://ui.nuxt.com/docs/components)
-  [Axios](https://axios-http.com/ptbr/docs/intro)
-  [NodeJs](https://nodejs.org/en/)
-  [Plugin Vue.js DevTools para Google Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

## Comandos úteis

```yaml
# Instalação de dependências do projeto
npm install

# Roda um servidor local de testes com hot-reload
npm run serve

# Compila e minifica o projeto para produção
npm run build
```

## Versão
- A versão é alterada a cada novo deploy, alteramos a versão dentro da pasta package.json X.Y.Z
- Alteramos o número da versão X quando é feita uma alteração bem considerável em todo o sistema.
- Alteramos o número da versão Y quando é feita uma nova implementação, uma nova funcionalidade, uma nova feature.
- Alteramos o número da versão Z a qualquer tipo de alteração simples.
