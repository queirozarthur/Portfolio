# Portfólio · Arthur Queiroz

Meu portfólio pessoal: quem sou, o que construí e como falar comigo.

**No ar:** https://queirozarthur.github.io/Portfolio/

![Prévia do portfólio](public/og.png)

## Stack

- React 19 + TypeScript, empacotado com Vite
- Tailwind CSS v4 com tokens de cor próprios (tema escuro e claro)
- Motion para as animações
- Geist e Geist Mono como fontes, servidas pelo próprio site
- Deploy automático no GitHub Pages via GitHub Actions

Funciona no celular e no computador. No celular a navegação vai para baixo da tela, perto do polegar, e os efeitos que dependem de mouse (tilt, dock) viram versões simples para toque. Quem ativa "reduzir movimento" no sistema recebe a página sem animações.

## Componentes

A maior parte da interface parte de componentes do [Spell UI](https://spell.sh) e do [21st.dev](https://21st.dev), adaptados para este site. Cada arquivo diz de onde veio e o que mudou.

| Onde aparece | Componente | Origem |
| --- | --- | --- |
| Fundo do topo | Light Rays (portado de three.js para WebGL puro) | Spell UI |
| Nome e títulos | Blur Reveal | Spell UI |
| Rótulos das seções | Special Text | Spell UI |
| Botão do currículo | Flow Button | Spell UI |
| Faixa de tecnologias | Marquee | Spell UI |
| Destaque no "Sobre" | Highlighted Text | Spell UI |
| Cards de projeto | Tilt Card | Spell UI |
| Copiar e-mail | Copy Button | Spell UI |
| Navegação | Tubelight Navbar | 21st.dev · Ayushmaan Singh |
| "Hoje eu faço…" | Flip Words | 21st.dev · Aceternity UI |
| Grade do topo | Grid Pattern | 21st.dev · Magic UI |
| Seção "Sobre" | Bento Grid | 21st.dev · Magic UI |
| Globo | COBE Globe | 21st.dev · Shu Ding |
| Contribuições | GitHub Graph | 21st.dev · unlumen |
| "Mais coisas que fiz" | Project Index | 21st.dev · Savva Sicevs |
| Trajetória | Timeline | 21st.dev · Aceternity UI |
| Redes sociais | Floating Dock | 21st.dev · Aceternity UI |
| Rodapé | Hover Footer | 21st.dev · Md Afsar Mahmud |

## Rodando localmente

Precisa de Node 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Abre em http://localhost:5173/Portfolio/.

## Editando o conteúdo

Textos, projetos e a trajetória ficam todos em [`src/data/content.ts`](src/data/content.ts). Para adicionar um projeto, coloque a imagem em `public/projects/` (de preferência `.webp`, até ~1600 px de largura) e crie uma entrada em `featuredProjects` ou em `moreProjects`.

O currículo baixado pelo botão é `public/curriculo-arthur-queiroz.pdf`. Substitua o arquivo mantendo o nome.

## Estrutura

```
src/
  components/
    spell/      componentes do Spell UI
    21st/       componentes do 21st.dev
    ui/         peças do próprio site (capa de projeto, títulos, ícones)
    sections/   cada seção da página
  data/         todo o conteúdo
  lib/          hooks e utilitários
public/         imagens, currículo, favicon e imagem de compartilhamento
```

## Deploy

Todo push na `main` roda o workflow em `.github/workflows/deploy.yml`, que faz o build e publica no GitHub Pages. Em **Settings → Pages**, a fonte precisa estar como **GitHub Actions**.

## Contato

- E-mail: [queirozarthur2109@gmail.com](mailto:queirozarthur2109@gmail.com)
- LinkedIn: [linkedin.com/in/queirozarthur](https://www.linkedin.com/in/queirozarthur/)
- GitHub: [github.com/queirozarthur](https://github.com/queirozarthur)
