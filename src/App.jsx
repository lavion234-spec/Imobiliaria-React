import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import propertiesData from './data/properties.json'

const WHATSAPP_NUMBER = '5511999999999'

const properties = propertiesData.properties

function asImagePath(path) {
  if (!path) return '/imagem/apartamento-studio.jpg'
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return path.startsWith('/') ? path : `/${path}`
}

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme')
    const nextTheme = savedTheme === 'dark' ? 'dark' : 'light'
    setTheme(nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  useEffect(() => {
    const closeOnEsc = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEsc)
    return () => window.removeEventListener('keydown', closeOnEsc)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('site-theme', nextTheme)

    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  const scrollToSection = (sectionId) => {
    const scrollNow = () => {
      const target = document.getElementById(sectionId)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(scrollNow, 60)
    } else {
      scrollNow()
    }
    setMenuOpen(false)
  }

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" className="logo" aria-label="Lucas Vinicius - Corretor de Imóveis">
            <img src="/imagem/LOGO-transparent.png" alt="Lucas Vinicius - Corretor de Imóveis" className="logo-img" />
            <span className="logo-text">
              <span className="logo-name">Lucas Vinicius</span>
              <span className="logo-role">Corretor de Imóveis</span>
            </span>
          </Link>
        </div>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="mainNav" role="navigation" aria-label="Navegação principal">
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>
            <li><Link to="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</Link></li>
            <li><a href="#" onClick={(event) => { event.preventDefault(); scrollToSection('historia') }}>Minha História</a></li>
            <li><a href="#" onClick={(event) => { event.preventDefault(); scrollToSection('diferenciais') }}>Vantagens</a></li>
            <li><a href="#" onClick={(event) => { event.preventDefault(); scrollToSection('testimonials') }}>Depoimentos</a></li>
            <li><a href="#" onClick={(event) => { event.preventDefault(); scrollToSection('blog') }}>Notícias</a></li>
            <li><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+a+imobili%C3%A1ria.`} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Contato</a></li>
          </ul>
        </nav>

        <div className="actions">
          <button className="btn btn-ghost" id="menuToggle" type="button" aria-expanded={menuOpen} aria-controls="mainNav" onClick={() => setMenuOpen((prev) => !prev)}>
            <span aria-hidden="true">☰</span>
          </button>
          <a
            className="btn btn-primary"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+visita.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar Visita
          </a>
          <div className="theme-switch">
            <button id="themeToggle" className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Alternar tema claro/escuro">
              <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-model">
        <div className="footer-brand">
          <img src="/imagem/LOGO-transparent.png" alt="Lucas Vinicius Imobiliaria" className="footer-brand-logo" />
          <div>
            <h3><span>Lucas Vinicius</span><span>Corretor de Imoveis</span></h3>
            <p>Modernidade, tecnologia e elegancia</p>
          </div>
        </div>
        <div className="footer-col">
          <h4>Contato</h4>
          <a className="footer-link" href="tel:+5511999999999"><span className="footer-icon">P</span><span>(11) 99999-9999</span></a>
          <a className="footer-link" href="mailto:contato@imoprime.com"><span className="footer-icon">E</span><span>contato@imoprime.com</span></a>
        </div>
        <div className="footer-col">
          <h4>Redes sociais</h4>
          <a className="footer-link" href="https://instagram.com/imoprime" target="_blank" rel="noopener noreferrer"><span className="footer-icon">I</span><span>@imoprime</span></a>
          <a className="footer-link" href="https://facebook.com/imoprime" target="_blank" rel="noopener noreferrer"><span className="footer-icon">F</span><span>/imoprime</span></a>
          <a className="footer-link" href="https://linkedin.com/company/imoprime" target="_blank" rel="noopener noreferrer"><span className="footer-icon">L</span><span>imoprime</span></a>
        </div>
      </div>
      <div className="container">
        <div className="footer-line"></div>
      </div>
    </footer>
  )
}

function PropertyCard({ property }) {
  return (
    <article className="card" data-location={property.location.city} data-bedrooms={property.details.bedrooms} data-price={property.price}>
      <figure className="card-image">
        <img src={asImagePath(property.images?.[0] || property.thumbnail)} alt={property.title} loading="lazy" />
      </figure>
      <div className="card-body">
        <h3>{property.title}</h3>
        <p className="card-location">📍 {property.location.city}, {property.location.state}</p>
        <p className="muted">{property.shortDescription}</p>
        <div className="card-footer">
          <strong className="price">{property.priceFormatted}</strong>
          <div className="card-actions">
            <Link className="btn btn-sm btn-primary" to={`/imovel/${property.numericId}`}>
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  const highlightedProperties = useMemo(() => {
    const featured = properties.filter((item) => item.featured)
    return featured.length > 0 ? featured : properties
  }, [])

  const maxVisibleCards = 3
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(media.matches)
    update()

    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const slideStep = isMobile ? 1 : 2
  const [startIndex, setStartIndex] = useState(0)
  const canSlide = highlightedProperties.length > maxVisibleCards

  useEffect(() => {
    if (!canSlide) return undefined

    const intervalId = window.setInterval(() => {
      setStartIndex((current) => (current + slideStep) % highlightedProperties.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [canSlide, highlightedProperties.length, slideStep])

  const visibleProperties = useMemo(() => {
    if (!canSlide) return highlightedProperties

    return Array.from({ length: maxVisibleCards }, (_, offset) => {
      const nextIndex = (startIndex + offset) % highlightedProperties.length
      return highlightedProperties[nextIndex]
    })
  }, [canSlide, highlightedProperties, startIndex])

  const showNextProperties = () => {
    if (!canSlide) return
    setStartIndex((current) => (current + slideStep) % highlightedProperties.length)
  }

  const showPreviousProperties = () => {
    if (!canSlide) return
    setStartIndex((current) => (current - slideStep + highlightedProperties.length) % highlightedProperties.length)
  }

  return (
    <main id="main-content" role="main">
      <section
        id="home"
        className="hero"
        aria-labelledby="hero-title"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 id="hero-title">Encontre o imóvel ideal com tecnologia 3D e experiência premium</h1>
            <p className="lead">Atendimento consultivo, tecnologia de ponta e processos que transformam busca em conquista.</p>
            <div className="hero-ctas">
              <Link to="/catalogo" className="btn btn-primary btn-lg">Ver Imóveis</Link>
              <a className="btn btn-secondary btn-lg" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+visita.`} target="_blank" rel="noopener noreferrer">Agendar Visita</a>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="catalog container" aria-labelledby="catalog-title">
        <div className="catalog-header">
          <h2 id="catalog-title">Catálogo de Imóveis em Destaque</h2>
          <Link to="/catalogo" className="btn btn-primary">Ver catálogo completo</Link>
        </div>
        <section className="carousel" aria-label="Imóveis em destaque">
          {canSlide && (
            <button type="button" className="carousel-control prev" onClick={showPreviousProperties} aria-label="Imóvel anterior">
              <span aria-hidden="true">&#10094;</span>
            </button>
          )}
          <div className="carousel-container">
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          {canSlide && (
            <button type="button" className="carousel-control next" onClick={showNextProperties} aria-label="Próximo imóvel">
              <span aria-hidden="true">&#10095;</span>
            </button>
          )}
        </section>
      </section>

      <section id="historia" className="historia container" aria-labelledby="historia-title">
        <h2 id="historia-title">Minha história</h2>
        <div className="historia-intro">
          <p>Uma trajetória construída com foco em pessoas, estratégia e decisões seguras no mercado imobiliário.</p>
        </div>
        <div className="historia-capitulos">
          <article className="capitulo">
            <div className="capitulo-numero">CAPÍTULO 1</div>
            <h3>Origens</h3>
            <p>Tudo começou com uma inquietação: por que a jornada de compra ou venda de um imóvel precisa ser tão complexa, demorada e desgastante?</p>
            <p>A partir dessa reflexão, decidi atuar no mercado imobiliário de forma diferente - mais estratégica, mais humana e totalmente focada no cliente. Desde o início, baseio meu trabalho em disciplina, método e inovação, criando processos que simplificam decisões e trazem mais segurança em cada etapa.</p>
            <p>Mais do que intermediar negociações, meu propósito é tornar essa experiência mais leve, clara e eficiente para você.</p>
          </article>
          <article className="capitulo">
            <div className="capitulo-numero">CAPÍTULO 2</div>
            <h3>A Transformação</h3>
            <p>Com o tempo, transformei essa visão em prática. Passei a estruturar um atendimento consultivo, entendendo o cenário financeiro, o estilo de vida e os objetivos de cada cliente antes de sugerir qualquer imóvel.</p>
            <p>Esse processo torna as decisões mais seguras, evita escolhas precipitadas e garante que cada oportunidade apresentada faça sentido de verdade para você.</p>
          </article>
          <article className="capitulo">
            <div className="capitulo-numero">CAPÍTULO 3</div>
            <h3>Inovação Tecnológica</h3>
            <p>Acredito que boas decisões vêm de boas informações. Por isso, utilizo ferramentas e estratégias que me permitem identificar as melhores oportunidades com precisão.</p>
            <p>Analiso fatores como o perfil de cada cliente, histórico de valorização, comportamento de preços e tempo médio de venda. Isso me permite antecipar cenários, reduzir riscos e apresentar opções realmente alinhadas com o seu objetivo.</p>
            <p>Aqui, a tecnologia não substitui o atendimento - ela potencializa os resultados.</p>
          </article>
          <article className="capitulo">
            <div className="capitulo-numero">CAPÍTULO 4</div>
            <h3>Excelência em Serviço</h3>
            <p>Hoje, uno método, estratégia e atendimento personalizado para oferecer uma experiência completa, do primeiro contato à entrega das chaves.</p>
            <p>Cada cliente é único, e por isso meu atendimento é próximo, transparente e focado em resultados. Acompanho cada etapa com atenção aos detalhes, agilidade e compromisso genuíno com a sua conquista.</p>
            <p>Mais do que fechar negócios, meu objetivo é que você se sinta seguro, bem orientado e confiante em uma das decisões mais importantes da sua vida.</p>
          </article>
        </div>
        <div className="historia-cta">
          <p>Vamos conversar sobre seu próximo imóvel com estratégia e segurança?</p>
          <a className="btn btn-primary" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C+quero+conversar+sobre+meu+pr%C3%B3ximo+im%C3%B3vel.`} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
        </div>
      </section>

      <section id="diferenciais" className="diferenciais container" aria-labelledby="diferenciais-title">
        <h2 id="diferenciais-title">Por que escolher a gente?</h2>
        <div className="diferenciais-grid">
          <article className="diferencial-card">
            <div className="diferencial-icon">⚡</div>
            <h3>Resposta Rápida</h3>
            <p>Atendimento em tempo recorde. Contacte-nos e receba uma resposta em minutos, não em dias.</p>
            <ul className="diferencial-specs">
              <li>SLA 5 minutos</li>
              <li>Atendimento verificado</li>
              <li>Suporte direto</li>
            </ul>
          </article>
          <article className="diferencial-card">
            <div className="diferencial-icon">📊</div>
            <h3>Tecnologia & Dados</h3>
            <p>Análise inteligente com AI. Precificação baseada em comparáveis, tendência e liquidez do mercado.</p>
            <ul className="diferencial-specs">
              <li>Análise de comparáveis</li>
              <li>Relatórios transparentes</li>
              <li>Previsões de mercado</li>
            </ul>
          </article>
          <article className="diferencial-card">
            <div className="diferencial-icon">🎥</div>
            <h3>Tour 3D & Vídeo 4K</h3>
            <p>Explore imóveis de qualquer lugar. Tours virtuais em 3D e vídeos em alta definição para decisões confiantes.</p>
            <ul className="diferencial-specs">
              <li>Tecnologia 3D avançada</li>
              <li>Vídeo em 4K</li>
              <li>Visitas sem sair de casa</li>
            </ul>
          </article>
          <article className="diferencial-card">
            <div className="diferencial-icon">🏦</div>
            <h3>Assessoria Financeira</h3>
            <p>Suporte completo em financiamento. Simulação e aprovação com bancos parceiros de análise rápida.</p>
            <ul className="diferencial-specs">
              <li>Parceria com grandes bancos</li>
              <li>Aprovação assistida</li>
              <li>Processo seguro</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="about" className="about container" aria-labelledby="about-title">
        <h2 id="about-title">Sobre o Corretor</h2>
        <div className="about-grid">
          <article className="about-profile">
            <div className="about-profile-media">
              <img src="/imagem/lucas-vinicius.jpg" alt="Lucas Vinicius, Corretor Imobiliario" loading="lazy" width="120" height="120" />
            </div>
            <div className="about-profile-content">
              <h3>Lucas Vinicius</h3>
              <p className="about-profile-role">Corretor Imobiliario</p>
              <p>Acredito que comprar um imóvel é uma das decisões mais importantes da vida. Por isso, meu compromisso é te acompanhar em cada etapa com clareza, segurança e um atendimento próximo de verdade.</p>
              <p>Trabalho com um atendimento consultivo, entendendo seu perfil, seu momento e seus objetivos antes de apresentar qualquer imóvel - garantindo decisões mais seguras e alinhadas com o que você realmente busca.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="testimonials" className="testimonials container" aria-labelledby="testimonials-title">
        <h2 id="testimonials-title">Depoimentos</h2>
        <div className="testimonial-list" role="list">
          <blockquote className="testimonial"><p>Excelente atendimento e a tecnologia 3D nos ajudou muito.</p><cite>— Ana P., compradora</cite></blockquote>
          <blockquote className="testimonial"><p>Profissionalismo e rapidez. Recomendo!</p><cite>— João M., vendedor</cite></blockquote>
        </div>
      </section>

      <section id="blog" className="blog container" aria-labelledby="blog-title">
        <h2 id="blog-title">Notícias & Artigos</h2>
        <div className="blog-intro">
          <p>Fique por dentro das tendências do mercado imobiliário, dicas de investimento e histórias de sucesso.</p>
        </div>
        <div className="blog-grid">
          <article className="blog-card">
            <div className="blog-image" style={{ background: 'linear-gradient(135deg, #0b6b9e 0%, #0a5a8a 100%)' }}></div>
            <div className="blog-content">
              <span className="blog-date">15 de Março, 2025</span>
              <h3>Mercado imobiliário aquece em 2025</h3>
              <p>Análise das tendências do mercado imobiliário para este ano. Descubra as melhores oportunidades e previsões de especialistas.</p>
              <a href="#" className="blog-link">Ler artigo →</a>
            </div>
          </article>
          <article className="blog-card">
            <div className="blog-image" style={{ background: 'linear-gradient(135deg, #1E90FF 0%, #0b6b9e 100%)' }}></div>
            <div className="blog-content">
              <span className="blog-date">08 de Março, 2025</span>
              <h3>5 dicas para comprar um imóvel com inteligência</h3>
              <p>Guia completo para quem está buscando o imóvel ideal. Aprenda as estratégias que usamos com nossos clientes.</p>
              <a href="#" className="blog-link">Ler artigo →</a>
            </div>
          </article>
          <article className="blog-card">
            <div className="blog-image" style={{ background: 'linear-gradient(135deg, #4169E1 0%, #0b6b9e 100%)' }}></div>
            <div className="blog-content">
              <span className="blog-date">01 de Março, 2025</span>
              <h3>Tecnologia 3D revoluciona a busca por imóveis</h3>
              <p>Como a realidade virtual está mudando a forma como as pessoas buscam e visitam imóveis. Saiba mais sobre isso.</p>
              <a href="#" className="blog-link">Ler artigo →</a>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

function CatalogPage() {
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const locationOk = !location || property.location.city.toLowerCase().includes(location.toLowerCase())

      let bedroomsOk = true
      if (bedrooms === '3') bedroomsOk = property.details.bedrooms >= 3
      if (bedrooms && bedrooms !== '3') bedroomsOk = property.details.bedrooms === Number(bedrooms)

      let priceOk = true
      if (priceRange.includes('-')) {
        const [min, max] = priceRange.split('-').map(Number)
        priceOk = property.price >= min && property.price <= max
      } else if (priceRange.endsWith('+')) {
        const min = Number(priceRange.replace('+', ''))
        priceOk = property.price >= min
      }

      const text = `${property.title} ${property.location.neighborhood} ${property.shortDescription}`.toLowerCase()
      const queryOk = !query || text.includes(query.toLowerCase())

      return locationOk && bedroomsOk && priceOk && queryOk
    })
  }, [location, bedrooms, priceRange, query])

  useEffect(() => {
    setPage(1)
  }, [location, bedrooms, priceRange, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const visible = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <main className="container" style={{ paddingTop: '1.5rem' }}>
      <section className="catalog-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <h1>Catálogo de Imóveis</h1>
          <p className="muted">Filtre e encontre imóveis com tours 3D e informações completas.</p>
        </div>
        <div className="filters" style={{ marginTop: '.4rem' }}>
          <select id="filterLocation" value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="">Localização</option>
            <option>São Paulo</option>
            <option>Rio de Janeiro</option>
            <option>Porto Alegre</option>
          </select>
          <select id="filterBedrooms" value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
            <option value="">Quartos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
          <select id="filterPrice" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
            <option value="">Preço</option>
            <option value="0-500000">Até R$500.000</option>
            <option value="500000-1000000">R$500.000–1.000.000</option>
            <option value="1000000+">Acima de R$1.000.000</option>
          </select>
          <input id="searchInput" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por bairro ou característica" />
        </div>
      </section>

      <section id="catalog-grid">
        <div className="cards" id="cards">
          {visible.length > 0 ? visible.map((property) => <PropertyCard key={property.id} property={property} />) : (
            <div className="no-results" role="status" aria-live="polite">
              <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>

        {filtered.length > perPage && (
          <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '.5rem', marginTop: '2.25rem', alignItems: 'center' }}>
            <button className="btn btn-ghost" type="button" onClick={() => setPage((current) => Math.max(1, current - 1))}>◀ Anterior</button>
            <div className="muted">Página {page} de {totalPages}</div>
            <button className="btn btn-ghost" type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Próxima ▶</button>
          </div>
        )}
      </section>
    </main>
  )
}

function PropertyPage() {
  const { id } = useParams()
  const property = properties.find((item) => String(item.numericId) === String(id) || item.id === id)
  const [mainImage, setMainImage] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (property?.images?.length) {
      setMainImage(asImagePath(property.images[0]))
      document.title = `${property.title} - ImoPrime`
    }
  }, [property])

  if (!property) {
    return <Navigate to="/catalogo" replace />
  }

  const message = encodeURIComponent(`Olá! Tenho interesse no imóvel \"${property.title}\" (${property.location.city}). Gostaria de agendar uma visita presencial.`)

  return (
    <main className="container">
      <section className="property-hero" style={{ margin: '2rem 0' }}>
        <div className="property-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1rem', alignItems: 'start' }}>
          <div>
            <div id="mainMedia" style={{ borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6' }}>
              <img src={mainImage} alt={`Imagem principal de ${property.title}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div id="thumbnails" style={{ display: 'flex', gap: '.5rem', marginTop: '.75rem', flexWrap: 'wrap' }}>
              {property.images.map((image, index) => (
                <img
                  key={image}
                  src={asImagePath(image)}
                  alt={`${property.title} - Foto ${index + 1}`}
                  className="thumbnail"
                  style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }}
                  onClick={() => setMainImage(asImagePath(image))}
                />
              ))}
            </div>
          </div>

          <aside style={{ padding: '0 0.5rem' }}>
            <h1>{property.title}</h1>
            <p className="muted">{property.shortDescription}</p>
            <p><strong>Preço:</strong> {property.priceFormatted}</p>
            <p><strong>Localização:</strong> {property.location.address}, {property.location.neighborhood} - {property.location.city}/{property.location.state}</p>
            <p><strong>Diferenciais:</strong> {property.features.join(', ') || 'Consulte para mais detalhes'}</p>
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <a id="btnSchedulePres" className="btn btn-primary" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noopener noreferrer">Agendar Presencial</a>
              <Link className="btn btn-ghost" to="/catalogo" state={{ from: location.pathname }}>Voltar ao Catálogo</Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="virtual" style={{ marginBottom: '2rem' }}>
        <h2>Modelo 3D & Tour</h2>
        <model-viewer src={property.model3D} camera-controls style={{ width: '100%', height: '520px', background: '#000', borderRadius: '12px', overflow: 'hidden' }}></model-viewer>
        <p className="muted">Use rotação e zoom para explorar o ambiente. Plantas 3D disponíveis mediante solicitação.</p>
      </section>

      <section id="gallery">
        <h2>Fotos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem' }}>
          {property.images.map((image, index) => (
            <img key={`${property.id}-${index}`} src={asImagePath(image)} alt={`${property.title} - Galeria ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
          ))}
        </div>
      </section>

      <section id="desc" style={{ marginTop: '2rem' }}>
        <h2>Descrição Completa</h2>
        <p>{property.description}</p>
      </section>
    </main>
  )
}

function Layout() {
  const location = useLocation()

  const scrollToMain = (event) => {
    event.preventDefault()
    const target = document.getElementById('main-content')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
  }, [location.hash])

  return (
    <>
      <a href="#" className="skip-link" onClick={scrollToMain}>Pular para o conteúdo principal</a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/imovel/:id" element={<PropertyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return <Layout />
}

export default App
