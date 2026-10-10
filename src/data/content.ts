export const profile = {
  name: "Arthur Queiroz",
  fullName: "Arthur Reis Gomes De Mello Queiroz",
  email: "queirozarthur2109@gmail.com",
  whatsapp: "5582993186971",
  cv: "curriculo-arthur-queiroz.pdf",
  github: "queirozarthur",
  links: {
    github: "https://github.com/queirozarthur",
    linkedin: "https://www.linkedin.com/in/queirozarthur/",
    instagram: "https://www.instagram.com/arthurqueirozz_/",
  },
  roles: [
    "sites para clientes reais",
    "APIs com Django e FastAPI",
    "automatização de processos",
    "dashboards em React",
  ],
  facts: ["Recife, PE", "CESAR School · 2024–2028", "CS50x · Harvard", "Inglês fluente"],
} as const;

export type ProjectLink = { label: string; href: string };

export type Cover =
  | { kind: "browser"; src: string; url: string }
  | { kind: "image"; src: string; position?: string }
  | { kind: "brand"; src: string; tint: string }
  | { kind: "newspaper" };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  cover: Cover;
  badge?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: "john-radio-web",
    title: "John Radio Web",
    kicker: "Freelance",
    year: "2025 — hoje",
    badge: "No ar",
    summary:
      "Redesenho completo do site de uma rádio digital brasileira que toca 24 horas por dia.",
    highlights: [
      "Player de áudio fixo na tela, sempre à mão",
      "Contraste e tamanhos pensados para ouvintes mais velhos",
      "Deploy na Netlify com domínio próprio, sem derrubar o e-mail que já existia no DNS",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    links: [
      { label: "Ver site", href: "https://www.johnradioweb.com.br/" },
      { label: "Código", href: "https://github.com/queirozarthur/John-Radio-Web" },
    ],
    cover: { kind: "browser", src: "projects/jrw.webp", url: "johnradioweb.com.br" },
  },
  {
    slug: "sebrae-sense",
    title: "SebraeSense",
    kicker: "CESAR School · SEBRAE-PE",
    year: "2026",
    summary:
      "Inteligência de dados para o SEBRAE-PE: um Customer Health Score que mostra quais clientes estão esfriando.",
    highlights: [
      "Feedback negativo derruba o score e abre um alerta para a equipe de CX",
      "Backend em camadas com FastAPI e SQLAlchemy",
      "Dashboard em React com Vite, Tailwind e Recharts",
    ],
    stack: ["FastAPI", "React", "PostgreSQL", "Docker"],
    links: [{ label: "Código", href: "https://github.com/begnp/SebraeSense" }],
    cover: { kind: "brand", src: "projects/sense-logo.webp", tint: "#2ee6c5" },
  },
  {
    slug: "sushi-em-casa",
    title: "SushiEmCasa",
    kicker: "CESAR School · Cliente real",
    year: "2025",
    summary:
      "Delivery para um restaurante de verdade: cardápio, carrinho e um pedido que já chega pronto no WhatsApp.",
    highlights: [
      "Atuei como fullstack, do model Django ao template",
      "PostgreSQL e deploy contínuo no Azure via GitHub Actions",
      "Painel da administradora para cardápio, agenda e pedidos",
    ],
    stack: ["Django", "PostgreSQL", "Azure", "GitHub Actions"],
    links: [{ label: "Código", href: "https://github.com/jarthur-duarte/SushiEmCasa" }],
    cover: { kind: "browser", src: "projects/sushi-ui.webp", url: "SushiEmCasa · Home" },
  },
  {
    slug: "tlt-midias",
    title: "TLT Mídias",
    kicker: "CESAR School · Jornal do Commercio",
    year: "2025",
    summary:
      "Repaginação do portal online do Jornal do Commercio para fazer o leitor ficar mais tempo no site.",
    highlights: [
      "Busca, comentários e notificações de breaking news",
      "Destaque das matérias mais relevantes na página inicial",
      "Testes E2E com Cypress e deploy contínuo no Azure",
    ],
    stack: ["Django", "Python", "Cypress", "Azure"],
    links: [{ label: "Código", href: "https://github.com/Nobutann/TLTMidias" }],
    cover: { kind: "newspaper" },
  },
  {
    slug: "metroid-leveling",
    title: "Metroid Leveling",
    kicker: "Jogo · Mostra-Tech 2026.1",
    year: "2025",
    badge: "Selecionado",
    summary:
      "Demo de plataforma 2D em C, com a atmosfera de Hollow Knight e a estética de Solo Leveling.",
    highlights: [
      "Sistema de combate e progressão por áreas",
      "Ranking de tempos entre jogadores",
      "Selecionado para apresentação na Mostra-Tech 2026.1",
    ],
    stack: ["C", "Raylib", "Make"],
    links: [{ label: "Código", href: "https://github.com/begnp/jogo_pif" }],
    cover: { kind: "image", src: "projects/metroid-menu.webp" },
  },
  {
    slug: "revitaliza-recife",
    title: "Revitaliza Recife",
    kicker: "Jogo · Algoritmos e Estruturas de Dados",
    year: "2026",
    summary:
      "Jogo de tabuleiro digital ambientado no Recife Antigo e no Porto Digital, no estilo Banco Imobiliário.",
    highlights: [
      "Tabuleiro numa lista duplamente encadeada circular",
      "Cartas numa tabela hash com encadeamento separado",
      "Ranking final ordenado com insertion sort",
    ],
    stack: ["C", "Raylib", "cJSON"],
    links: [{ label: "Código", href: "https://github.com/queirozarthur/Revitaliza-Recife" }],
    cover: { kind: "image", src: "projects/revitaliza.webp", position: "center 40%" },
  },
];

export type IndexEntry = {
  title: string;
  detail: string;
  year: string;
  href?: string;
  preview?: string;
  tag?: string;
};

export const moreProjects: IndexEntry[] = [
  {
    title: "Dashboard de finanças",
    detail: "Django REST, JWT e React · receitas, cartões, orçamentos e investimentos",
    year: "2026",
    tag: "Em andamento",
    href: "https://github.com/queirozarthur/dashboard-financas",
  },
  {
    title: "Aeroporto-BD",
    detail: "Gestão do Aeroporto do Recife · Java, JDBC e MySQL com SQL explícito",
    year: "2026",
    href: "https://github.com/mtojald/Aeroporto-BD",
  },
  {
    title: "Cliente/servidor UDP",
    detail: "Go-Back-N e Selective Repeat sobre sockets UDP em Python",
    year: "2026",
    href: "https://github.com/queirozarthur/Trabalho-redes",
  },
  {
    title: "Eficiência energética em HPC",
    detail: "Artigo SBC em coautoria · TAS, DVFS e undervolting em GPUs",
    year: "2026",
    tag: "Artigo",
  },
  {
    title: "Gerenciador acadêmico",
    detail: "Projeto final do CS50x · CLI em Python para acompanhar desempenho",
    year: "2026",
  },
  {
    title: "Snake Game",
    detail: "O jogo da cobrinha em Python com PyGame",
    year: "2025",
    href: "https://github.com/queirozarthur/Snake-Game",
  },
  {
    title: "VIDA PET",
    detail: "Python · login, cadastro de pets e metas",
    year: "2025",
    href: "https://github.com/queirozarthur/VIDA-PET",
  },
  {
    title: "CUP — Cooking Under Pressure",
    detail: "Jogo em Bitsy feito a seis mãos em Introdução à Computação",
    year: "2025",
    href: "https://arthurqueiroz.itch.io/cup-cooking-under-pressure",
  },
  {
    title: "Formitas",
    detail: "Jogo físico com Arduino para crianças com Síndrome de Down",
    year: "2025",
  },
];

export type JourneyItem = {
  when: string;
  title: string;
  place: string;
  body: string;
  image?: { src: string; alt: string };
};

export const journey: JourneyItem[] = [
  {
    when: "2026 — hoje",
    title: "Monitor de Infraestrutura de Software",
    place: "CESAR School",
    body: "Corrijo as implementações práticas dos alunos com guia de correção e bateria de casos de teste, e avalio os relatórios técnicos e o uso de IA em cada entrega.",
  },
  {
    when: "2026",
    title: "CS50x: Introduction to Computer Science",
    place: "Harvard University",
    body: "Curso concluído passando por C, Python, SQL e web. No projeto final, um gerenciador de desempenho acadêmico em linha de comando.",
  },
  {
    when: "2026.1",
    title: "Mostra-Tech",
    place: "CESAR School",
    body: "O Metroid Leveling, escrito em C com Raylib, foi um dos projetos selecionados para apresentação na mostra.",
    image: { src: "me/mostra-tech.webp", alt: "Arthur e colegas ao lado do notebook rodando o Metroid Leveling" },
  },
  {
    when: "2025 — hoje",
    title: "Desenvolvedor web freelancer",
    place: "John Radio Web",
    body: "Redesenhei o site inteiro da rádio, cuidei do deploy e do domínio e sigo mantendo.",
  },
  {
    when: "2024 — 2028",
    title: "Bacharelado em Ciência da Computação",
    place: "CESAR School · Recife",
    body: "Onde a maior parte desses projetos nasceu, quase sempre em grupo e muitas vezes para clientes reais.",
  },
  {
    when: "2021",
    title: "Um ano em Kelowna",
    place: "British Columbia, Canadá",
    body: "Morei com a minha família no Canadá e estudei na Kelowna Secondary School. Foram meses superando barreiras, e voltei com inglês fluente.",
  },
];

export const stack = [
  "Python",
  "Django",
  "FastAPI",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "C",
  "Raylib",
  "Linux",
  "Git",
  "GitHub Actions",
  "Azure",
  "Netlify",
] as const;
