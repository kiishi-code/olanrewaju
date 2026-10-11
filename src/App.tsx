import { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Leaf,
  Mail,
  Menu,
  Moon,
  Search,
  Send,
  Sun,
  X,
} from 'lucide-react';

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  note: string;
};

const publications: Publication[] = [
  { title: 'A nutritional and economic evaluation of Moringa oleifera leaf meal as a dietary supplement in West African Dwarf goats', authors: 'A. O. Yusuf, V. Mlambo, S. O. Iposu', venue: 'South African Journal of Animal Science 48(1), 81–87', year: '2018', type: 'Journal article', note: 'Nutritional value and feeding economics in small-ruminant production.' },
  { title: 'Effect of varying levels of garlic (Allium sativum) powder on growth, apparent nutrient digestibility, rumen ecology, blood profile and cost analysis of feeding West African Dwarf goats', authors: 'T. T. Ikyume, O. S. Sowande, P. A. Dele, A. O. Yusuf, et al.', venue: 'Malaysian Journal of Animal Science 20(2), 61–74', year: '2017', type: 'Journal article', note: 'Dietary garlic supplementation and goat production.' },
  { title: 'Extra dietary vitamin E–selenium as a mitigation strategy against housing-induced stress in Dohne Merino lambs: Effect on growth performance, stress biomarkers, and meat quality', authors: 'K. P. Maraba, V. Mlambo, A. O. Yusuf, U. Marume, A. Hugo', venue: 'Small Ruminant Research 160, 31–37', year: '2018', type: 'Journal article', note: 'Nutritional approaches to stress mitigation and meat quality.' },
  { title: 'Phytochemical screening and proximate analysis of Newbouldia laevis and Allium sativum', authors: 'A. A. Ayoola, A. O. Yusuf, D. G. Oki', venue: 'Nigerian Journal of Animal Science 18(1), 242–256', year: '2016', type: 'Journal article', note: 'Plant-based materials with potential relevance to animal production.' },
  { title: 'Effect of Moringa oleifera seed extract administered through drinking water on physiological responses, carcass and meat quality traits, and bone parameters in broiler chickens', authors: 'C. F. Egbu, L. E. Motsei, A. O. Yusuf, C. M. Mnisi', venue: 'Applied Sciences 12(20), 10330', year: '2022', type: 'Journal article', note: 'Plant extract supplementation and broiler physiological and carcass traits.' },
  { title: 'Cassava leaves and peels: Nutritional value and potential productivity in West African dwarf breeds of sheep and goats—A review', authors: 'O. A. Fasae, A. O. Yusuf', venue: 'Nigerian Journal of Animal Production 49(3), 301–311', year: '2022', type: 'Journal article', note: 'Locally available feed resources for small ruminants.' },
  { title: 'Ensiling pretreatment of banana waste by-products: Influences on chemical composition and environmental rumen biogas and fermentation', authors: 'M. Y. Elahi, A. O. Yusuf, A. Torshabi, H. Fazaeli, M. R. Dehghani, A. Z. M. Salem', venue: 'Waste and Biomass Valorization 10(11), 3363–3371', year: '2019', type: 'Journal article', note: 'Agro-industrial by-product treatment and rumen fermentation.' },
  { title: 'Comparative study of two plants (Lagenaria breviflora and Petiveria alliacea) and their phytobiotic potential in poultry health', authors: 'D. A. Ekunseitan, A. O. Yusuf, O. A. Olayinka, A. A. Ayoola, A. Adedotun', venue: 'Nigerian Journal of Animal Production 43(1), 289–298', year: '2016', type: 'Journal article', note: 'Plant-derived compounds and potential applications in poultry health.' },
  { title: 'Performance, haematological parameters and faecal egg count of semi-intensively managed West African Dwarf sheep to varying levels of cassava leaves and peels supplementation', authors: 'O. A. Fasae, A. Amos, A. Owodunni, A. O. Yusuf', venue: 'Pertanika Journal of Tropical Agricultural Science 38(1), 71–81', year: '2015', type: 'Journal article', note: 'Local feed resources, sheep performance, and health indicators.' },
  { title: 'Evaluating the efficacy of Moringa oleifera seed extract on nutrient digestibility and physiological parameters of broiler chickens', authors: 'C. F. Egbu, L. E. Motsei, A. O. Yusuf, C. M. Mnisi', venue: 'Agriculture 12(8), 1102', year: '2022', type: 'Journal article', note: 'Broiler nutrient utilization and physiological responses.' },
  { title: 'Blood profile of West African Dwarf goats fed Panicum maximum supplemented with Newbouldia laevis leaves', authors: 'A. O. Yusuf, O. A. Oyebanji, D. A. Yusuf, K. A. Ekunseitan, O. S. Adeleye, et al.', venue: 'Bulletin of Animal Health and Production in Africa 60(4), 481–490', year: '2012', type: 'Journal article', note: 'Browse supplementation and blood-profile indicators in goats.' },
  { title: 'Chemical characterization and in vitro methane production of selected agroforestry plants as dry-season feeding for ruminant livestock', authors: 'A. O. Yusuf, O. O. Egbinola, D. A. Ekunseitan, A. Z. M. Salem', venue: 'Agroforestry Systems 94(4), 1481–1489', year: '2020', type: 'Journal article', note: 'Feed characterization and methane production in rumen models.' },
  { title: 'Oxidative stress biomarkers in West African Dwarf goats reared under intensive and semi-intensive production systems', authors: 'A. O. Yusuf, V. Mlambo, O. S. Sowande, R. Solomon', venue: 'South African Journal of Animal Science 47(3), 281–289', year: '2017', type: 'Journal article', note: 'Oxidative stress indicators across livestock management systems.' },
  { title: 'Performance, digestibility and nitrogen balance of West African Dwarf goats fed Azadirachta indica, Newbouldia laevis and Spondias mombin leaves', authors: 'O. O. Adelusi, O. A. Isah, C. F. I. Onwuka, A. O. Yusuf, et al.', venue: 'Nigerian Journal of Animal Science 18(2), 507–517', year: '2016', type: 'Journal article', note: 'Browse plants, digestibility, and nitrogen utilization.' },
  { title: 'Dietary supplementation of vitamin E and selenium on performance and oxidative stability of meat of broiler chickens in a hot climate', authors: 'D. A. Ekunseitan, A. O. Yusuf, O. F. Ekunseitan, S. O. Alao, A. Z. Allinson', venue: 'Agricultura Tropica et Subtropica 54(1), 24–31', year: '2021', type: 'Journal article', note: 'Antioxidant nutrition and meat stability under hot-climate conditions.' },
  { title: 'Nutritional evaluation and phytochemical screening of common plants used in smallholder farming system', authors: 'A. O. Yusuf, R. O. Muritala', venue: 'Pacific Journal of Science and Technology 14(2), 456–462', year: '2013', type: 'Journal article', note: 'Nutritional and phytochemical assessment of plants used by smallholders.' },
  { title: 'Growth, physiological performance, and pork quality of weaner Large White piglets to different inclusion levels of nano zinc oxide', authors: 'B. Mokone, L. E. Motsei, A. O. Yusuf, C. F. Egbu, T. O. Ajayi', venue: 'Tropical Animal Health and Production 54(1), 22', year: '2022', type: 'Journal article', note: 'Nano-zinc supplementation and piglet performance and meat quality.' },
  { title: 'Nano zinc supplementation in ruminant livestock: Influence on physiological and immune functions and oxidative stability of West African Dwarf goat bucks', authors: 'A. O. Yusuf, T. K. Adeyi, A. O. Oni, A. J. Owalabi, O. S. Sowande', venue: 'Comparative Clinical Pathology 32(4), 629–643', year: '2023', type: 'Journal article', note: 'Mineral supplementation, immune-related outcomes, and oxidative stability.' },
  { title: 'Common plant bioactive components adopted in combating gastrointestinal nematodes in small ruminants—A review', authors: 'A. O. Yusuf, M. B. Surajudeen, B. T. Akinyemi', venue: 'Agricultura Scientia 20(1), 61–73', year: '2023', type: 'Journal article', note: 'Review of plant bioactives and gastrointestinal parasite management.' },
  { title: 'Growth performance and physiological status of intensively raised West African Dwarf goats supplemented with dietary antioxidants', authors: 'A. O. Yusuf, A. A. Raheem, O. S. Sowande, K. O. Adebayo, L. E. Motsei, A. A. Ayoola', venue: 'Egyptian Journal of Veterinary Science 50(1), 65–74', year: '2019', type: 'Journal article', note: 'Dietary antioxidants and physiological status in goats.' },
  { title: 'Nano zinc oxide supplementation improves growth performance and health of West African Dwarf goats', authors: 'A. O. Yusuf, T. K. Adeyi, O. S. Sowande, A. O. Oni, V. O. Olowookere', venue: 'Egyptian Journal of Animal Production 59(2), 69–78', year: '2022', type: 'Journal article', note: 'Nano-mineral nutrition in small-ruminant production.' },
];

const researchAreas = [
  { number: '01', title: 'Ruminant nutrition', text: 'Feed resources, nutrient density, digestibility, and feeding strategies for sheep and goats, including West African Dwarf breeds.', icon: Leaf },
  { number: '02', title: 'Medicinal plants & phytobiotics', text: 'Plant-derived compounds and browse species investigated for nutrition, animal health, and parasite-management applications.', icon: FlaskConical },
  { number: '03', title: 'Animal physiology', text: 'Blood profiles, physiological responses, oxidative-stress biomarkers, and animal welfare across production conditions.', icon: BriefcaseBusiness },
  { number: '04', title: 'Mineral nutrition & nanomaterials', text: 'Research on zinc, copper, nano-mineral sources, nutrient utilization, and health-related responses in livestock and poultry.', icon: FlaskConical },
  { number: '05', title: 'Poultry nutrition & product quality', text: 'Dietary interventions, broiler performance, carcass traits, meat quality, and resilience in hot-climate production.', icon: Leaf },
  { number: '06', title: 'Sustainable feed systems', text: 'Potential use of agroforestry plants and crop by-products, including work on rumen fermentation and methane production.', icon: BriefcaseBusiness },
];

const navItems = [
  ['About', 'about'],
  ['Research', 'research'],
  ['Publications', 'publications'],
  ['Teaching', 'teaching'],
  ['Contact', 'contact'],
];

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');
  const [type, setType] = useState('all');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formNotice, setFormNotice] = useState('');

  const filteredPublications = useMemo(
    () =>
      publications.filter(paper => {
        const term = search.toLowerCase();
        const matchesSearch = [
          paper.title,
          paper.authors,
          paper.venue,
          paper.type,
        ].some(value => value.toLowerCase().includes(term));
        const matchesYear = year === 'all' || paper.year === year;
        const matchesType = type === 'all' || paper.type === type;
        return matchesSearch && matchesYear && matchesType;
      }),
    [search, year, type]
  );

  const goTo = (id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormNotice('');
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setFormError('Please complete every field before continuing.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailto = `mailto:yusufao@funaab.edu.ng?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setFormNotice(
      'Your email application should open with a prepared message. This website has not sent or stored your message.'
    );
    window.location.href = mailto;
  };

  return (
    <div className={dark ? 'site dark' : 'site'}>
      <div className="announcement">
        <span className="status-dot" /> Academic portfolio · Animal science &
        sustainable agriculture
      </div>
      <header className="header">
        <a
          className="brand"
          href="#home"
          onClick={event => {
            event.preventDefault();
            goTo('home');
          }}
          aria-label="Go to homepage"
        >
          <span className="brand-mark">
            <Leaf size={21} strokeWidth={1.8} />
          </span>
          <span className="brand-name">
            AOY<span>.</span>
            <small>ACADEMIC PORTFOLIO</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="button button-dark header-contact"
            onClick={() => goTo('contact')}
          >
            Get in touch <ArrowUpRight size={16} />
          </button>
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => goTo(id)}>
                {label}
                <ArrowRight size={15} />
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> RESEARCH · TEACHING · IMPACT
            </div>
            <h1>
              Science for a more <em>sustainable</em> future.
            </h1>
            <p className="hero-lead">Dr. Azeez Olanrewaju Yusuf</p>
            <p className="hero-description">
              Academic in Animal Production and Health at the Federal University
              of Agriculture, Abeokuta, Nigeria. Exploring research and
              knowledge that can contribute to responsible livestock production.
            </p>
            <div className="hero-actions">
              <button
                className="button button-green"
                onClick={() => goTo('research')}
              >
                Explore research <ArrowDownRight size={17} />
              </button>
              <button
                className="button button-outline"
                onClick={() => goTo('publications')}
              >
                Publication library <ArrowRight size={16} />
              </button>
            </div>
            <div className="hero-footnote">
              <span className="mini-seal">
                <GraduationCap size={17} />
              </span>
              <span>
                Federal University of Agriculture, Abeokuta <b>·</b> Nigeria
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div
              className="hero-image"
              role="img"
              aria-label="Cattle grazing in a green agricultural landscape"
            />
            <div className="profile-portrait">
              <img
                src="https://media.licdn.com/dms/image/v2/C4D03AQGJL7sbZufUcA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1631265528322?e=2147483647&v=beta&t=3wbu-J_t3CZQ2yvWN2VXxOU4hDAmCCrAKHPIgJAZwNk"
                alt="Profile photograph of Dr. Azeez Olanrewaju Yusuf"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <span>Dr. Azeez Olanrewaju Yusuf</span>
              <small>ACADEMIC PROFILE</small>
            </div>
            <div className="image-label">
              <span className="label-icon">
                <Leaf size={16} />
              </span>
              <span>
                <strong>Research with purpose</strong>
                <small>Livestock · Agriculture · Sustainability</small>
              </span>
            </div>
            <div className="image-index">
              01 <span>/</span> 03
            </div>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
          </div>
          <div className="hero-side-note">
            ANIMAL SCIENCE <span>—</span> FIELD TO FUTURE
          </div>
        </section>

        <section className="trust-strip">
          <div className="trust-inner">
            <span className="trust-label">ACADEMIC HOME</span>
            <div className="institution">
              <span className="institution-symbol">
                <GraduationCap size={22} />
              </span>
              <span>
                <strong>Federal University of Agriculture, Abeokuta</strong>
                <small>Department of Animal Production and Health</small>
              </span>
            </div>
            <a
              href="https://funaab.edu.ng/staff/yusuf-azeez-olanrewaju/"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Official university profile <ExternalLink size={14} />
            </a>
          </div>
        </section>

        <section className="section-wrap about-section" id="about">
          <div className="section-kicker">01 / ACADEMIC PROFILE</div>
          <div className="about-grid">
            <div>
              <h2>
                Curiosity that
                <br />
                moves <em>knowledge</em>
                <br />
                forward.
              </h2>
            </div>
            <div className="about-body">
              <p className="large-copy">
              Senior Lecturer in Animal Production and Health, with academic,
              research, and postdoctoral experience in Nigeria and South Africa.
            </p>
            <p>
              The supplied curriculum vitae records a B.Agric., M.Agric., and
              PhD, alongside a postdoctoral fellowship at North-West University,
              South Africa, and international training in animal feed. His
              scholarly work spans ruminant nutrition, plant-based feed
              resources, animal physiology, poultry nutrition, and sustainable
              livestock systems.
            </p>
            <p className="verification-note">
              <Check size={16} /> Profile and selected publications are based on
              the CV and Google Scholar details supplied for this portfolio.
              Bibliographic details should be checked against publisher records.
            </p>
              <button
                className="text-link inline-link"
                onClick={() => goTo('contact')}
              >
                Start a conversation <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <div className="researcher-links">
            <div className="researcher-links-heading">
              <div>
                <div className="section-kicker">ACADEMIC PRESENCE</div>
                <h3>Explore the researcher's <em>profiles.</em></h3>
              </div>
              <p>Connect to external scholarly and professional profiles for current records, publications, and affiliations.</p>
            </div>
            <div className="researcher-links-grid">
              <a className="researcher-link-card" href="https://scholar.google.nl/citations?user=Y5iHmxwAAAAJ&hl=en" target="_blank" rel="noreferrer">
                <span className="researcher-link-number">01</span>
                <span><strong>Google Scholar</strong><small>Scholar profile and citation record</small></span>
                <ExternalLink size={16} />
              </a>
              <a className="researcher-link-card" href="https://www.researchgate.net/profile/Azeez-Yusuf" target="_blank" rel="noreferrer">
                <span className="researcher-link-number">02</span>
                <span><strong>ResearchGate</strong><small>Research interests and publications</small></span>
                <ExternalLink size={16} />
              </a>
              <a className="researcher-link-card" href="https://ng.linkedin.com/in/azeez-olanrewaju-yusuf-589910169" target="_blank" rel="noreferrer">
                <span className="researcher-link-number">03</span>
                <span><strong>LinkedIn</strong><small>Professional profile and updates</small></span>
                <ExternalLink size={16} />
              </a>
              <a className="researcher-link-card" href="https://aasciences.africa/affiliates/66" target="_blank" rel="noreferrer">
                <span className="researcher-link-number">04</span>
                <span><strong>African Academy of Sciences</strong><small>Affiliate biography · 2019–2023</small></span>
                <ExternalLink size={16} />
              </a>
              <a className="researcher-link-card" href="https://adscientificindex.com/scientist/azeez-olanrewaju-yusuf/5797651/" target="_blank" rel="noreferrer">
                <span className="researcher-link-number">05</span>
                <span><strong>AD Scientific Index</strong><small>Research metrics and indexed works</small></span>
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="researcher-links-note">External profiles are independently maintained and may show different update dates or citation counts.</p>
          </div>
        </section>

        <section className="research-section" id="research">
          <div className="section-wrap">
            <div className="section-topline">
              <div>
                <div className="section-kicker">02 / AREAS OF INTEREST</div>
                <h2>
                  Research with a<br />
                  <em>real-world purpose.</em>
                </h2>
              </div>
              <p className="section-intro">
                Scientific questions with relevance to animal production,
                agricultural knowledge, and sustainable food systems.
              </p>
            </div>
            <div className="research-grid">
              {researchAreas.map(area => {
                const Icon = area.icon;
                return (
                  <article className="research-card" key={area.number}>
                    <div className="card-top">
                      <span>{area.number}</span>
                      <span className="card-icon">
                        <Icon size={21} />
                      </span>
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                    <div className="card-rule" />
                    <span className="card-caption">RESEARCH THEME</span>
                  </article>
                );
              })}
            </div>
            <p className="section-disclaimer">
              These are broad themes for the portfolio structure, not a complete
              or definitive list of current projects. Specific research
              activities should be confirmed with the researcher.
            </p>
          </div>
        </section>

        <section
          className="section-wrap publications-section"
          id="publications"
        >
          <div className="section-kicker">03 / SCHOLARLY WORK</div>
          <div className="section-topline publications-heading">
            <div>
              <h2>
                Selected <em>publications.</em>
              </h2>
              <p className="section-intro">
                Selected journal articles from the supplied CV and Google Scholar
                record. Search by title, author, journal, or year.
              </p>
            </div>
            <a
              className="button button-outline"
              href="https://scholar.google.nl/citations?user=Y5iHmxwAAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              Open Google Scholar <ExternalLink size={15} />
            </a>
          </div>
          <div className="publication-tools">
            <label className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search title, author, journal…"
                aria-label="Search publications"
              />
            </label>
            <label className="select-wrap">
              <span>Year</span>
              <select
                value={year}
                onChange={event => setYear(event.target.value)}
                aria-label="Filter by year"
              >
                <option value="all">All years</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
              </select>
              <ChevronDown size={14} />
            </label>
            <label className="select-wrap">
              <span>Type</span>
              <select
                value={type}
                onChange={event => setType(event.target.value)}
                aria-label="Filter by publication type"
              >
                <option value="all">All types</option>
                <option value="Journal article">Journal article</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
          <div className="publication-list">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((paper, index) => (
                <article className="publication-row" key={paper.title}>
                  <div className="publication-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="publication-main">
                    <span className="publication-type">
                      {paper.type} · {paper.year}
                    </span>
                    <h3>{paper.title}</h3>
                    <p>{paper.authors}</p>
                    <p className="publication-venue">{paper.venue}</p>
                    <small className="publication-note">{paper.note}</small>
                  </div>
                  <span className="publication-arrow">
                    <BookOpen size={18} />
                  </span>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <Search size={22} />
                <strong>No matching records</strong>
                <p>Try another keyword or clear the filters.</p>
                <button
                  className="text-link"
                  onClick={() => {
                    setSearch('');
                    setYear('all');
                    setType('all');
                  }}
                >
                  Clear filters <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
          <div className="publication-foot">
            <span>
              <BookOpen size={16} /> Selected records from the supplied academic profile; consult Google Scholar
              and publisher pages for the complete and most current bibliography.
            </span>
            <a
              href="https://funaab.edu.ng/staff/yusuf-azeez-olanrewaju/"
              target="_blank"
              rel="noreferrer"
            >
              Visit staff profile <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <section className="teaching-section" id="teaching">
          <div className="section-wrap teaching-grid">
            <div>
              <div className="section-kicker">04 / TEACHING & KNOWLEDGE</div>
              <h2>
                Learning is part
                <br />
                of the <em>research.</em>
              </h2>
            </div>
            <div className="teaching-content">
              <div className="teaching-icon">
                <GraduationCap size={25} />
              </div>
              <p className="large-copy">
                Connecting scientific thinking with practical questions in
                animal production and health.
              </p>
              <p>
                The supplied CV lists teaching in Ruminant Animal Production,
                Dairy Production and Dairying, Beef Cattle Production, Animal
                Welfare, farm practicals, seminars, and research projects. It
                also records undergraduate project supervision and collaborative
                postgraduate supervision in animal nutrition, feed resources,
                nano-mineral supplementation, and livestock physiology.
              </p>
              <div className="teaching-placeholder">
                <span className="placeholder-dot" /> Course information awaiting
                confirmation <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </section>

        <section className="collab-section" id="contact">
          <div className="section-wrap collab-grid">
            <div className="collab-copy">
              <div className="section-kicker light-kicker">
                05 / CONNECT & COLLABORATE
              </div>
              <h2>
                Good research
                <br />
                starts with a<br />
                <em>conversation.</em>
              </h2>
              <p>
                For academic collaboration, research enquiries, speaking
                invitations, or professional connections, prepare a message
                below.
              </p>
              <div className="collab-direct">
                <Mail size={18} />
                <span>
                  <strong>Academic enquiries</strong>
                  <small>
                    Email: yusufao@funaab.edu.ng
                  </small>
                </span>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact} noValidate>
              <div className="form-heading">
                <span>LET'S CONNECT</span>
                <span className="form-mark">
                  <Send size={17} />
                </span>
              </div>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email address
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="What would you like to discuss?"
                />
              </label>
              <label>
                Message
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us a little about your enquiry…"
                  rows={4}
                />
              </label>
              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              {formNotice && (
                <p className="form-notice" role="status">
                  {formNotice}
                </p>
              )}
              <button className="button button-green form-submit" type="submit">
                Prepare email <ArrowUpRight size={16} />
              </button>
              <p className="form-privacy">
                Your details are not submitted to this website. The form
                prepares a message in your email application.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <a
            className="brand footer-brand"
            href="#home"
            onClick={e => {
              e.preventDefault();
              goTo('home');
            }}
          >
            <span className="brand-mark">
              <Leaf size={20} />
            </span>
            <span className="brand-name">
              AOY<span>.</span>
              <small>ACADEMIC PORTFOLIO</small>
            </span>
          </a>
          <p>
            Research, teaching, and thoughtful progress
            <br />
            in animal science and agriculture.
          </p>
          <button className="back-top" onClick={() => goTo('home')}>
            Back to top <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Academic portfolio · Dr. Azeez
            Olanrewaju Yusuf
          </span>
          <span>
            Independent portfolio concept · Not an official FUNAAB website
          </span>
          <a
            href="https://funaab.edu.ng/staff/yusuf-azeez-olanrewaju/"
            target="_blank"
            rel="noreferrer"
          >
            Official profile <ExternalLink size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
