import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { bookSynopses } from "./book-synopses.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/livraria-images");
const outFile = path.join(__dirname, "../src/lib/data/books.json");

function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** @type {Array<Record<string, unknown>>} */
const entries = [
  {
    title: "Os trabalhadores do mar",
    price: 40,
    image: "os-trabalhadores-do-mar.jpeg",
    author: "Victor Hugo",
    categorySlug: "literatura",
    isFeatured: true,
    isBestseller: true,
  },
  {
    title: "Coleção especial Sherlock Holmes 6 livros",
    price: 120,
    image: "sherlock-holmes-6-volumes-colecao-especial.jpeg",
    author: "Arthur Conan Doyle",
    categorySlug: "literatura",
    isFeatured: true,
    isBestseller: true,
  },
  {
    title: "Deixe-me ser mulher",
    price: 40,
    image: "deixe-me-ser-mulher-elisabeth-elliot.jpeg",
    author: "Elisabeth Elliot",
    categorySlug: "literatura",
  },
  {
    title: "Shackleton, uma lição de coragem",
    price: 30,
    image: "shackleton-uma-licao-de-coragem.jpeg",
    author: "Alfred Lansing",
    categorySlug: "historia",
    isFeatured: true,
  },
  {
    title: "Drácula",
    price: 25,
    image: "bram-stoker-dracula.jpeg",
    author: "Bram Stoker",
    categorySlug: "literatura",
    isBestseller: true,
  },
  {
    title: "O vermelho e o negro",
    price: 50,
    image: "stendhal-o-vermelho-e-o-negro.jpeg",
    author: "Stendhal",
    categorySlug: "literatura",
  },
  {
    title: "Duas coroas retorcidas",
    price: 55,
    image: "duas-coroas-retorcidas-rachel-gillig.jpeg",
    author: "Rachel Gillig",
    categorySlug: "literatura",
    isFeatured: true,
  },
  {
    title: "A rainha vermelha",
    price: 50,
    image: "a-rainha-vermelha.jpeg",
    author: "Victoria Aveyard",
    categorySlug: "literatura",
  },
  {
    title: "Quincas Borba",
    price: 25,
    image: "quincas-borba.jpeg",
    author: "Machado de Assis",
    categorySlug: "literatura",
  },
  {
    title: "Um conto de duas cidades",
    price: 30,
    image: "um-conto-de-duas-cidades.jpeg",
    author: "Charles Dickens",
    categorySlug: "literatura",
  },
  {
    title: "Wicked capa dura",
    price: 79.9,
    image: "gregory-maguire-wicked-darkside.jpeg",
    author: "Gregory Maguire",
    categorySlug: "literatura",
    isFeatured: true,
  },
  {
    title: "A Ciência do sucesso",
    price: 35,
    image: "a-ciencia-do-sucesso.jpeg",
    author: "Napoleon Hill",
    categorySlug: "filosofia",
  },
  {
    title: "A menina do outro lado",
    price: 55,
    image: "a-menina-do-outro-lado-nagabe.jpeg",
    author: "Nagabe",
    categorySlug: "literatura",
    isNew: true,
  },
  {
    title: "O diário de Anne Frank",
    price: 30,
    image: "o-diario-de-anne-frank.jpeg",
    author: "Anne Frank",
    categorySlug: "historia",
    slug: "o-diario-de-anne-frank",
  },
  {
    title: "A falência",
    price: 25,
    image: "a-falencia-texto-interal-questoes-de-vestibular-comentadas.jpeg",
    author: "Arthur Azevedo",
    categorySlug: "literatura",
  },
  {
    title: "As aventuras de Pinóquio",
    price: 40,
    image:
      "as-aventuras-de-pinoquio-historia-de-um-boneco-carlo-collodi.jpeg",
    author: "Carlo Collodi",
    categorySlug: "literatura",
  },
  {
    title: "Kamen Rider Kuuga mangá",
    price: 45,
    image: "kamen-rider-kuuga.jpeg",
    author: "Masaomi Kanzaki",
    categorySlug: "literatura",
    isNew: true,
  },
  {
    title: "Arena 13",
    price: 40,
    image: "arena-13-alguns-perdem-a-vida-outros-a-alma.jpeg",
    author: "Joseph Delaney",
    categorySlug: "literatura",
  },
  {
    title: "A Metamorfose",
    price: 20,
    image: "a-metamorfose-franz-kafka.jpeg",
    author: "Franz Kafka",
    categorySlug: "literatura",
  },
  {
    title: "O livro de ouro da mitologia",
    price: 25,
    image:
      "o-livro-de-ouro-da-mitologia-historias-de-deuses-e-herois.jpeg",
    author: "Gustav Schwab",
    categorySlug: "historia",
  },
  {
    title: "Manual de assassinato para boas garotas",
    price: 45,
    image: "manual-de-assassinato-para-boas-garotas-holly-jackson.jpeg",
    author: "Holly Jackson",
    categorySlug: "literatura",
    isNew: true,
  },
  {
    title: "Vidas secas",
    price: 20,
    image: "vidas-secas.jpeg",
    author: "Graciliano Ramos",
    categorySlug: "literatura",
  },
  {
    title: "O jardim secreto",
    price: 25,
    image: "o-jardim-secreto.jpeg",
    author: "Frances Hodgson Burnett",
    categorySlug: "literatura",
  },
  {
    title: "O morro dos ventos uivantes",
    price: 25,
    image: "o-morro-dos-ventos-uivantes-emily-bronte.jpeg",
    author: "Emily Brontë",
    categorySlug: "literatura",
  },
  {
    title: "Orgulho e preconceito",
    price: 25,
    image: "jane-austen-orgulho-e-preconceito.jpeg",
    author: "Jane Austen",
    categorySlug: "literatura",
    isBestseller: true,
  },
  {
    title: "O médico e o monstro",
    price: 20,
    image: "o-medico-e-o-monstro.jpeg",
    author: "Robert Louis Stevenson",
    categorySlug: "literatura",
  },
  {
    title: "O pequeno príncipe",
    price: 30,
    image:
      "o-pequeno-principe-com-aquarelas-do-autor-antoine-de-saint-exupery.jpeg",
    author: "Antoine de Saint-Exupéry",
    categorySlug: "literatura",
    isBestseller: true,
  },
  {
    title: "Crime e castigo",
    price: 25,
    image: "crime-e-castigo-fiodor-dostoievski.jpeg",
    author: "Fiódor Dostoiévski",
    categorySlug: "literatura",
    isBestseller: true,
  },
  {
    title: "A volta ao mundo em 80 dias",
    price: 25,
    image: "a-volta-ao-mundo-em-80-dias-julio-verne.jpeg",
    author: "Júlio Verne",
    categorySlug: "literatura",
    isBestseller: true,
  },
  {
    title: "Macbeth",
    price: 20,
    image: "william-shakespeare-macbeth.jpeg",
    author: "William Shakespeare",
    categorySlug: "literatura",
  },
  {
    title: "Girl Crush mangá",
    price: 35,
    image: "girl-crush-midori-tryane.jpeg",
    author: "Midori Tryane",
    categorySlug: "literatura",
  },
  {
    title: "Tempo de regresso",
    price: 40,
    image: "kristin-hannah-tempo-de-regresso.jpeg",
    author: "Kristin Hannah",
    categorySlug: "literatura",
  },
  {
    title: "Don Quixote",
    price: 25,
    image: "dom-quixote-miguel-de-cervantes.jpeg",
    author: "Miguel de Cervantes",
    categorySlug: "literatura",
  },
  {
    title: "A coroa",
    price: 39.9,
    image: "a-coroa-livro-5-da-serie-a-selecao-kiera-cass.jpeg",
    author: "Kiera Cass",
    categorySlug: "literatura",
    isFeatured: true,
  },
  {
    title: "Edição de luxo O diário de Anne Frank",
    price: 50,
    image: "o-diario-de-anne-frank-garnier.jpeg",
    author: "Anne Frank",
    categorySlug: "historia",
    slug: "o-diario-de-anne-frank-edicao-de-luxo",
  },
  {
    title: "Querido John",
    price: 40,
    image: "querido-john.jpeg",
    author: "Nicholas Sparks",
    categorySlug: "literatura",
  },
  {
    title: "O Seminarista",
    price: 20,
    image: "o-seminarista-bernardo-guimaraes.jpeg",
    author: "Bernardo Guimarães",
    categorySlug: "literatura",
  },
  {
    title: "Bíblia infantil",
    price: 30,
    image: "biblia-infantil.jpeg",
    author: "Vários",
    categorySlug: "literatura",
  },
  {
    title: "Um estudo em vermelho",
    price: 30,
    image: "sherlock-holmes-um-estudo-em-vermelho.jpeg",
    author: "Arthur Conan Doyle",
    categorySlug: "literatura",
    isBestseller: true,
  },
  {
    title: "O império do bem",
    price: 25,
    image: "philippe-muray-o-imperio-do-bem.jpeg",
    author: "Philippe Muray",
    categorySlug: "conservadorismo",
  },
  {
    title: "Porco de raça, capa dura",
    price: 50,
    image: "porco-de-raça.jpeg",
    author: "P. G. Wodehouse",
    categorySlug: "literatura",
  },
  {
    title: "Romeu e Julieta",
    price: 20,
    image: "romeu-e-julieta.jpeg",
    author: "William Shakespeare",
    categorySlug: "literatura",
    isBestseller: true,
  },
];

const onDisk = new Set(fs.readdirSync(imagesDir));
const PLACEHOLDER = "livraria-logo.jpeg";

const books = entries.map((e, i) => {
  const slug = e.slug ?? slugify(e.title);
  let image = e.image ?? PLACEHOLDER;
  if (image !== PLACEHOLDER && !onDisk.has(image)) {
    console.warn(`Imagem ausente: ${image} (${e.title})`);
    image = PLACEHOLDER;
  }
  return {
    id: String(i + 1),
    slug,
    title: e.title,
    author: e.author,
    categorySlug: e.categorySlug,
    coverUrl: `/livraria-images/${image}`,
    price: e.price,
    ...(e.isNew ? { isNew: true } : {}),
    ...(e.isFeatured ? { isFeatured: true } : {}),
    ...(e.isBestseller ? { isBestseller: true } : {}),
    synopsis:
      bookSynopses[slug] ??
      `${e.title}, de ${e.author}. Obra disponível na Livraria Astronauta.`,
  };
});

fs.writeFileSync(outFile, `${JSON.stringify(books, null, 2)}\n`, "utf8");
console.log(`Gerados ${books.length} livros em ${outFile}`);
