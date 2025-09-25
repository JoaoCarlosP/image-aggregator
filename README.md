# Image Aggregator Application

Uma aplicação moderna de agregação de imagens que permite buscar e visualizar imagens de múltiplas fontes (Pexels, Unsplash, Pixabay) em uma interface única e elegante.

## 🚀 Funcionalidades

- **Busca Unificada**: Pesquise imagens em múltiplas APIs simultaneamente
- **Filtros Avançados**: Filtre por estilo, orientação, cor e fontes específicas
- **Layout Masonry**: Visualização estilo Pinterest com alturas variáveis
- **Interface Responsiva**: Otimizada para desktop, tablet e mobile
- **Carregamento Progressivo**: Sistema de paginação com "Carregar Mais"
- **Contador de Resultados**: Feedback claro sobre quantidade de imagens encontradas
- **Ações Rápidas**: Download, copiar link e visualizar imagem original

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Vite** - Build tool e dev server
- **Lucide React** - Ícones modernos
- **Supabase** - Backend e banco de dados (preparado)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd image-aggregator-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env
```

Adicione suas chaves de API no arquivo `.env`:
```env
VITE_PEXELS_KEY=sua_chave_pexels
VITE_UNSPLASH_KEY=sua_chave_unsplash  
VITE_PIXABAY_KEY=sua_chave_pixabay
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:4000` no seu navegador

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter ESLint

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── SearchForm.tsx  # Formulário de busca com filtros
│   ├── ImageGrid.tsx   # Grid masonry de imagens
│   └── ImageCard.tsx   # Card individual de imagem
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── utils/              # Utilitários e APIs
│   └── mockApi.ts      # Funções de busca e mock data
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Componentes Principais

### SearchForm
- Busca por texto livre
- Filtros avançados (estilo, orientação, cor)
- Seleção de fontes via checkboxes
- Interface expansível/retrátil

### ImageGrid  
- Layout masonry responsivo
- Carregamento progressivo
- Estados de loading e vazio
- Botão "Carregar Mais"

### ImageCard
- Hover effects elegantes
- Ações rápidas (download, copiar, abrir)
- Badge da fonte
- Informações do fotógrafo

## 🔌 APIs Suportadas

### Pexels
- **Cor**: Verde (`bg-green-500`)
- **Endpoint**: `/v1/search`
- **Limite**: 15 imagens por página

### Unsplash  
- **Cor**: Azul (`bg-blue-500`)
- **Endpoint**: `/search/photos`
- **Limite**: 15 imagens por página

### Pixabay
- **Cor**: Laranja (`bg-orange-500`) 
- **Endpoint**: `/api/`
- **Limite**: 15 imagens por página

## 🎯 Funcionalidades Futuras

- [ ] Sistema de favoritos
- [ ] Histórico de buscas
- [ ] Filtros por data
- [ ] Integração com mais APIs
- [ ] Sistema de usuários
- [ ] Coleções personalizadas
- [ ] Download em lote
- [ ] Compartilhamento social

## 🚀 Deploy

### Bolt Hosting (Recomendado)
```bash
npm run build
# Deploy automático via interface Bolt
```

### Netlify
```bash
npm run build
# Faça upload da pasta dist/
```

### Vercel
```bash
npm run build
# Conecte seu repositório GitHub
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React e TypeScript

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!