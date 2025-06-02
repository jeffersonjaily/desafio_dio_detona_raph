# desafio_dio_detona_raph
Jogo estilo "Whack-a-Mole" desenvolvido com HTML, CSS, JavaScript

## Descrição

Detona Ralph é um jogo web onde o jogador deve clicar rapidamente nos inimigos que aparecem nas casas antes que o tempo acabe ou as vidas terminem. O frontend é desenvolvido com HTML5, CSS3 e JavaScript, enquanto Flask serve as páginas e gerencia o backend.

## Estrutura do Projeto

```
/
├── app.py              # Aplicação Flask principal
├── engine.js           # Script JavaScript com a lógica do jogo
├── index.html          # Página inicial do jogo (pode estar em templates/)
├── reset.py            # Script para resetar dados/placar
├── src/                # Arquivos estáticos: CSS, imagens, áudio, scripts
│   ├── audios/
│   ├── images/
│   ├── scripts/
│   │   └── engine.js
│   └── styles/
│       ├── main.css
│       └── reset.css
└── templates/          # Pasta para templates HTML Flask

## Funcionalidades atuais

- Jogo com cronômetro regressivo e sistema de vidas
- Pontuação em tempo real
- Controle de som (liga/desliga)
- Áudios para hits, game over e música de fundo
- Frontend responsivo e estilizado com fontes personalizadas

## Contato

Para dúvidas ou contribuições, entre em contato: [jeffersson.jaily@gmail.com]

---

**Divirta-se jogando Detona Ralph!**
