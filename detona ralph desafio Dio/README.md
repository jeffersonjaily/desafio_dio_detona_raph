
# Detona Ralph

Jogo estilo "Whack-a-Mole" desenvolvido com HTML, CSS e JavaScript. Pode ser executado localmente no navegador sem backend.

---

## Descrição

Detona Ralph é um jogo web onde o jogador deve clicar rapidamente nos inimigos que aparecem nas casas antes que o tempo acabe ou as vidas terminem. 

Este projeto pode ser rodado localmente sem servidor, basta abrir o arquivo `index.html` no navegador ou usar o **Live Server** do VSCode para facilitar o desenvolvimento.

---

## Estrutura do Projeto

```
/
├── engine.js           # Script JavaScript com a lógica do jogo
├── index.html          # Página inicial do jogo
├── reset.py            # Script para resetar dados/placar (não necessário para versão estática)
├── src/                # Arquivos estáticos: CSS, imagens, áudio, scripts
│   ├── audios/
│   ├── images/
│   ├── scripts/
│   │   └── engine.js
│   └── styles/
│       ├── main.css
│       └── reset.css
├── templates/          # (opcional) Caso queira rodar com Flask
└── README.md           # Este arquivo
```

---

## Como rodar localmente

### Opção 1: Abrir diretamente no navegador

1. Navegue até a pasta do projeto.
2. Dê um duplo clique no arquivo `index.html`.
3. O jogo abrirá no seu navegador padrão.

### Opção 2: Usar Live Server (VSCode)

1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VSCode.
2. Abra a pasta do projeto no VSCode.
3. Clique com o botão direito em `index.html` e selecione "Open with Live Server".
4. O jogo será aberto automaticamente no navegador com atualização automática ao salvar os arquivos.

---

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc)
- (Opcional) VSCode + extensão Live Server para melhor experiência no desenvolvimento

---

## Funcionalidades atuais

- Jogo com cronômetro regressivo e sistema de vidas
- Pontuação em tempo real
- Controle de som (liga/desliga)
- Áudios para hits, game over e música de fundo
- Frontend responsivo e estilizado com fontes personalizadas

---

## Próximos passos

- Salvar placar no backend (requererá backend)
- Implementar autenticação de usuários
- Gerar APK Android usando WebView para transformar o jogo em app mobile

---

## Contato

Para dúvidas ou contribuições, entre em contato: [seuemail@dominio.com]

---

**Divirta-se jogando Detona Ralph!**
