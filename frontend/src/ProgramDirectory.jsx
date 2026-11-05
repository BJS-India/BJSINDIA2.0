import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fetchBaskets, fetchProgramContent } from './api';
import './program-directory.css';

// Basket Theme Config matching the screenshots
const BASKET_THEMES = {
  prarabdh: {
    name: 'Foundation Programs',
    nativeName: 'Prarabdh',
    primary: '#16a34a',
    primaryHover: '#15803d',
    lightTint: '#f0fdf4',
    border: '#bbf7d0',
    topBar: '#22c55e',
    cardActive: '#22c55e',
    tagline: 'Building A Strong Foundation For Community Service.',
  },
  pratibimb: {
    name: 'Inception Programs',
    nativeName: 'Pratibimb',
    primary: '#d97706',
    primaryHover: '#b45309',
    lightTint: '#fefce8',
    border: '#fef08a',
    topBar: '#eab308',
    cardActive: '#eab308',
    tagline: 'Reflecting Social Consciousness. Spreading Compassion.',
  },
  pravah: {
    name: 'Infusion Programs',
    nativeName: 'Pravah',
    primary: '#ea580c',
    primaryHover: '#c2410c',
    lightTint: '#fff7ed',
    border: '#fed7aa',
    topBar: '#f97316',
    cardActive: '#f97316',
    tagline: 'Transforming Lives Through Empowerment & Harmony.',
  },
  parikalpana: {
    name: 'National Programs',
    nativeName: 'Parikalpana',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    lightTint: '#eff6ff',
    border: '#bfdbfe',
    topBar: '#3b82f6',
    cardActive: '#3b82f6',
    tagline: 'Addressing National Challenges. Building Lasting Resilience.',
  },
  prabodhi: {
    name: 'Elevation Programs',
    nativeName: 'Prabodhi',
    primary: '#9333ea',
    primaryHover: '#7e22ce',
    lightTint: '#faf5ff',
    border: '#e9d5ff',
    topBar: '#a855f7',
    cardActive: '#a855f7',
    tagline: 'Building Capabilities. Empowering People To Serve.',
  },
};

// Program gallery and media assets
const PROGRAM_ASSETS = {
  'blue-roots': {
    gallery: [
      '/assets/ourImpact/foundation-prog-1.png',
      '/assets/impact/blueroots.png',
      '/assets/ourImpact/disaster-response-1.png',
      '/assets/impact/blueroots.png',
    ],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'disaster-relief-rehabilitation': {
    gallery: [
      '/assets/ourImpact/disaster-response-1.png',
      '/assets/ourImpact/disaster-response-2.png',
      '/assets/impact/diaster.png',
      null,
    ],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'chapter-capacity-building': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'webinar-series': {
    gallery: ['/assets/ourImpact/ccb-2.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'volunteer-development-program': {
    gallery: ['/assets/ourImpact/ccb-3.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'you-waah': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'vidya-daan': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'organ-donation': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'toy-bank': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'business-conclave': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'smart-girl': {
    gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'dil-ka-jigsaw': {
    gallery: ['/assets/ourImpact/dil-ka-jigsaw-1.png', '/assets/ourImpact/dil-ka-jigsaw-2.png', null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'jain-parivarik-adalat': {
    gallery: ['/assets/ourImpact/JPA-1.png', '/assets/ourImpact/JPA-2.png', null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
  'plastic-surgery-camps': {
    gallery: ['/assets/ourImpact/plastic-surgery-1.png', '/assets/ourImpact/plastic-surgery-2.png', null, null],
    impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
  },
};

export default function ProgramDirectory() {
  const [baskets, setBaskets] = useState([]);
  const [selectedBasketId, setSelectedBasketId] = useState(null);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Full Details Modal
  const [modalProgram, setModalProgram] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const pillsScrollRef = useRef(null);

  // Load data from Backend API
  useEffect(() => {
    let isMounted = true;
    const loadBaskets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBaskets({ includePrograms: 'true' });
        if (!isMounted) return;
        const sorted = (data || []).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setBaskets(sorted);

        // Default selection: First basket and its first program
        if (sorted.length > 0) {
          const firstBasket = sorted[0];
          setSelectedBasketId(firstBasket._id);
          const activePrograms = (firstBasket.programs || []).filter((p) => !p.isDeleted);
          if (activePrograms.length > 0) {
            setSelectedProgramId(activePrograms[0]._id);
          }
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('[ProgramDirectory Error]:', err);
        setError(err.message || 'Unable to connect to the backend server.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadBaskets();
    return () => {
      isMounted = false;
    };
  }, []);

  // Currently selected basket
  const selectedBasket = useMemo(() => {
    return baskets.find((b) => b._id === selectedBasketId) || baskets[0] || null;
  }, [baskets, selectedBasketId]);

  // Active theme
  const theme = useMemo(() => {
    if (!selectedBasket) return BASKET_THEMES.prarabdh;
    return BASKET_THEMES[selectedBasket.slug] || BASKET_THEMES.prarabdh;
  }, [selectedBasket]);

  // Programs of the selected basket
  const basketPrograms = useMemo(() => {
    if (!selectedBasket || !selectedBasket.programs) return [];
    return selectedBasket.programs
      .filter((p) => !p.isDeleted)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [selectedBasket]);

  // When basket changes, select its first program
  const handleSelectBasket = (basket) => {
    setSelectedBasketId(basket._id);
    const progs = (basket.programs || []).filter((p) => !p.isDeleted);
    if (progs.length > 0) {
      setSelectedProgramId(progs[0]._id);
    } else {
      setSelectedProgramId(null);
    }
  };

  // Currently selected program
  const selectedProgram = useMemo(() => {
    if (!basketPrograms.length) return null;
    return basketPrograms.find((p) => p._id === selectedProgramId) || basketPrograms[0] || null;
  }, [basketPrograms, selectedProgramId]);

  // Program assets (gallery, impact stats)
  const programAsset = useMemo(() => {
    if (!selectedProgram) return null;
    return (
      PROGRAM_ASSETS[selectedProgram.slug] || {
        gallery: ['/assets/ourImpact/ccb-1.png', null, null, null],
        impact: { value: '14,374+', label: 'Water Bodies Rejuvenated', image: '/assets/impact/blueroots.png' },
      }
    );
  }, [selectedProgram]);

  // Horizontal scroll for program pills
  const scrollPills = (direction) => {
    if (pillsScrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      pillsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Open Full Detail Modal
  const handleOpenModal = async (program) => {
    setModalProgram(program);
    setModalContent(null);
    setModalLoading(true);
    try {
      const content = await fetchProgramContent(program._id);
      setModalContent(content);
    } catch (err) {
      console.warn('Could not load standalone content:', err);
      if (program.content) {
        setModalContent(program.content);
      }
    } finally {
      setModalLoading(false);
    }
  };

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setModalProgram(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalProgram) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalProgram]);

  if (loading) {
    return (
      <div className="bjs-programs-page">
        <div className="bjs-pd-loading">
          <div className="bjs-pd-spinner" style={{ borderColor: '#2563eb transparent' }} />
          <p>Loading Programs Directory from MongoDB...</p>
        </div>
      </div>
    );
  }

  if (error && baskets.length === 0) {
    return (
      <div className="bjs-programs-page">
        <div className="bjs-pd-error">
          <h3>Failed to load programs</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="bjs-pd-retry-btn">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bjs-programs-page"
      style={{
        '--theme-primary': theme.primary,
        '--theme-hover': theme.primaryHover,
        '--theme-tint': theme.lightTint,
        '--theme-border': theme.border,
        '--theme-top-bar': theme.topBar,
        '--theme-active': theme.cardActive,
      }}
    >
      <div className="bjs-pd-container">
        {/* ======================================================== */}
        {/* 1. TOP BASKET LIST CARDS */}
        {/* ======================================================== */}
        <section className="bjs-pd-baskets-row" aria-label="Baskets List">
          {baskets.map((basket) => {
            const bTheme = BASKET_THEMES[basket.slug] || BASKET_THEMES.prarabdh;
            const isSelected = selectedBasket && selectedBasket._id === basket._id;

            return (
              <button
                key={basket._id}
                type="button"
                className={`bjs-basket-card ${isSelected ? 'is-selected' : ''}`}
                style={
                  isSelected
                    ? {
                      backgroundColor: bTheme.cardActive,
                      borderColor: bTheme.cardActive,
                      boxShadow: `0 8px 20px ${bTheme.primary}40`,
                    }
                    : {
                      '--card-top-color': bTheme.topBar,
                    }
                }
                onClick={() => handleSelectBasket(basket)}
                aria-pressed={isSelected}
              >
                {!isSelected && (
                  <div
                    className="bjs-basket-top-bar"
                    style={{ backgroundColor: bTheme.topBar }}
                  />
                )}
                <div className="bjs-basket-card-title">{basket.tagline || basket.name}</div>
                <div className="bjs-basket-card-subtitle">({basket.name})</div>
              </button>
            );
          })}
        </section>

        {/* ======================================================== */}
        {/* 2. SELECTED BASKET DETAILS */}
        {/* ======================================================== */}
        {selectedBasket && (
          <section className="bjs-pd-basket-details" aria-label="Selected Basket Details">
            <h1 className="bjs-basket-details-title">
              {selectedBasket.tagline || selectedBasket.name} ({selectedBasket.name})
            </h1>

            <p className="bjs-basket-details-tagline" style={{ color: theme.primary }}>
              {theme.tagline}
            </p>

            <p className="bjs-basket-details-desc">{selectedBasket.description}</p>

            {/* Special Category Cards for Prarabdh (Image 3) */}
            {selectedBasket.slug === 'prarabdh' && (
              <div className="bjs-prarabdh-categories">
                <div className="bjs-cat-card" style={{ borderTopColor: theme.topBar }}>
                  <h3 className="bjs-cat-title">Tithigram Calendar Programmes</h3>
                  <div className="bjs-cat-subtitle" style={{ color: theme.primary }}>
                    Strengthening The Jain Community
                  </div>
                  <p className="bjs-cat-text">
                    A Calendar Of 13 Programmes Organised Around Designated Dates And Months, Ensuring Consistent,
                    Structured Community Engagement Throughout The Year.
                  </p>
                </div>

                <div className="bjs-cat-card" style={{ borderTopColor: theme.topBar }}>
                  <h3 className="bjs-cat-title">Shunyagram Zero Day Programmes</h3>
                  <div className="bjs-cat-subtitle" style={{ color: theme.primary }}>
                    Serving The Wider Society
                  </div>
                  <p className="bjs-cat-text">
                    Programmes Conducted Once A Year Without A Fixed Date, Offering Flexibility To Organise A
                    Campaign Or Drive At A Suitable Time. This Category Currently Includes One Programme: Yatra.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* 3. PROGRAM LIST (HORIZONTAL PILL CAROUSEL) */}
        {/* ======================================================== */}
        {basketPrograms.length > 0 && (
          <section className="bjs-pd-programs-carousel" aria-label="Program Pills">
            <button
              type="button"
              className="bjs-pill-nav-btn"
              onClick={() => scrollPills('left')}
              aria-label="Previous programs"
            >
              ‹
            </button>

            <div className="bjs-pills-track" ref={pillsScrollRef}>
              {basketPrograms.map((prog) => {
                const isActive = selectedProgram && selectedProgram._id === prog._id;
                return (
                  <button
                    key={prog._id}
                    type="button"
                    className={`bjs-program-pill ${isActive ? 'is-active' : ''}`}
                    style={
                      isActive
                        ? {
                          backgroundColor: theme.primary,
                          borderColor: theme.primary,
                          color: '#ffffff',
                        }
                        : {}
                    }
                    onClick={() => setSelectedProgramId(prog._id)}
                  >
                    {prog.name}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="bjs-pill-nav-btn"
              onClick={() => scrollPills('right')}
              aria-label="Next programs"
            >
              ›
            </button>
          </section>
        )}

        {/* ======================================================== */}
        {/* 4. SELECTED PROGRAM DETAILS & 2X2 GALLERY */}
        {/* ======================================================== */}
        {selectedProgram && (
          <section className="bjs-pd-program-section" aria-label="Selected Program Details">
            {/* Header: Logo / Icon + Program Title */}
            <div className="bjs-prog-header">
              <div className="bjs-prog-icon-card">
                <img
                  src={
                    selectedProgram.thumbnail?.url ||
                    selectedBasket.logo?.url ||
                    '/assets/our-work/basket-prarabdh.png'
                  }
                  alt={selectedProgram.name}
                  className="bjs-prog-icon-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="bjs-prog-title-wrap">
                <h2 className="bjs-prog-main-title">{selectedProgram.name}</h2>
                <p className="bjs-prog-main-tagline" style={{ color: theme.primary }}>
                  {selectedProgram.shortDescription || theme.tagline}
                </p>
              </div>
            </div>

            {/* Two-Column Grid: Left (Details Card) + Right (2x2 Photos) */}
            <div className="bjs-prog-grid">
              {/* Left Column: Details Box */}
              <div
                className="bjs-prog-details-box"
                style={{
                  backgroundColor: theme.lightTint,
                  borderColor: theme.border,
                }}
              >
                <h3 className="bjs-details-box-heading">Program Details</h3>
                <p className="bjs-details-box-desc">{selectedProgram.description}</p>

                {/* Modules list if present */}
                {selectedProgram.content?.modules && selectedProgram.content.modules.length > 0 && (
                  <div className="bjs-details-modules">
                    <h4 className="bjs-modules-heading">Modules Of The Program:</h4>
                    <ul className="bjs-modules-list">
                      {selectedProgram.content.modules.map((mod, idx) => (
                        <li key={idx}>
                          <strong>Module {idx + 1}:</strong> {mod.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Explore Program Button */}
                <div className="bjs-details-action">
                  <button
                    type="button"
                    className="bjs-explore-btn"
                    style={{ backgroundColor: theme.primary }}
                    onClick={() => handleOpenModal(selectedProgram)}
                  >
                    Explore {selectedProgram.name} →
                  </button>
                </div>
              </div>

              {/* Right Column: 2x2 Image Grid */}
              <div className="bjs-prog-gallery-grid">
                {(programAsset?.gallery || ['/assets/ourImpact/ccb-1.png', null, null, null]).map(
                  (imgSrc, idx) => (
                    <div
                      key={idx}
                      className="bjs-gallery-item"
                      style={
                        !imgSrc
                          ? {
                            backgroundColor: '#f1f5f9',
                            borderColor: '#e2e8f0',
                          }
                          : {}
                      }
                    >
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={`${selectedProgram.name} gallery ${idx + 1}`}
                          className="bjs-gallery-img"
                        />
                      ) : (
                        <div className="bjs-gallery-placeholder" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 5. IMPACT SECTION */}
        {/* ======================================================== */}
        <section className="bjs-pd-impact-section" aria-label="Program Impact">
          <h2 className="bjs-impact-title">Impact</h2>

          <div className="bjs-impact-grid">
            {[0, 1, 2, 3].map((cardIdx) => {
              const impactData = programAsset?.impact || {
                value: '14,374+',
                label: 'Water Bodies Rejuvenated',
                image: '/assets/impact/blueroots.png',
              };

              return (
                <div
                  key={cardIdx}
                  className="bjs-impact-card"
                  style={{
                    backgroundColor: theme.lightTint,
                    borderColor: theme.border,
                  }}
                >
                  <div className="bjs-impact-card-body">
                    <div className="bjs-impact-value" style={{ color: theme.primary }}>
                      {impactData.value}
                    </div>
                    <div className="bjs-impact-label">{impactData.label}</div>
                  </div>
                  <div className="bjs-impact-photo-wrap">
                    <img
                      src={impactData.image || '/assets/impact/blueroots.png'}
                      alt={impactData.label}
                      className="bjs-impact-photo"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* 6. FULL PROGRAM DETAIL MODAL (WHEN EXPLORE IS CLICKED) */}
      {/* ======================================================== */}
      {modalProgram && (
        <div
          className="bjs-modal-backdrop"
          onClick={() => setModalProgram(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="bjs-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="bjs-modal-close"
              onClick={() => setModalProgram(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="bjs-modal-header" style={{ borderBottomColor: theme.border }}>
              <div className="bjs-modal-badge" style={{ backgroundColor: theme.primary }}>
                {selectedBasket?.name || 'Program'}
              </div>
              <h2 className="bjs-modal-title">{modalProgram.name}</h2>
              {modalProgram.shortDescription && (
                <p className="bjs-modal-subtitle" style={{ color: theme.primary }}>
                  {modalProgram.shortDescription}
                </p>
              )}
            </div>

            <div className="bjs-modal-content">
              {modalLoading ? (
                <div className="bjs-modal-loading">
                  <div className="bjs-pd-spinner" style={{ borderColor: `${theme.primary} transparent` }} />
                  <p>Loading full curriculum & details...</p>
                </div>
              ) : (
                <>
                  {/* Overview */}
                  <div className="bjs-modal-section">
                    <h3>Overview</h3>
                    <p>{modalContent?.overview || modalProgram.description}</p>
                  </div>

                  {/* Objectives */}
                  {modalContent?.objectives && modalContent.objectives.length > 0 && (
                    <div className="bjs-modal-section">
                      <h3>Core Objectives</h3>
                      <ul className="bjs-objectives-list">
                        {modalContent.objectives.map((obj, i) => (
                          <li key={i}>
                            <span className="bjs-check" style={{ color: theme.primary }}>
                              ✓
                            </span>{' '}
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Target Audience & Duration */}
                  <div className="bjs-modal-meta-grid">
                    {modalContent?.targetAudience && modalContent.targetAudience.length > 0 && (
                      <div className="bjs-meta-item">
                        <h4>Target Audience</h4>
                        <div className="bjs-audience-tags">
                          {modalContent.targetAudience.map((tag, i) => (
                            <span
                              key={i}
                              className="bjs-audience-tag"
                              style={{
                                backgroundColor: theme.lightTint,
                                borderColor: theme.border,
                                color: theme.primary,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {modalContent?.duration && (
                      <div className="bjs-meta-item">
                        <h4>Program Duration</h4>
                        <p>{modalContent.duration}</p>
                      </div>
                    )}
                  </div>

                  {/* Modules with Topics */}
                  {modalContent?.modules && modalContent.modules.length > 0 && (
                    <div className="bjs-modal-section">
                      <h3>Program Curriculum & Modules</h3>
                      <div className="bjs-modules-accordion">
                        {modalContent.modules.map((mod, idx) => (
                          <div
                            key={idx}
                            className="bjs-mod-item"
                            style={{ borderColor: theme.border }}
                          >
                            <div className="bjs-mod-title">
                              <strong>Module {idx + 1}:</strong> {mod.title}
                            </div>
                            {mod.description && <p className="bjs-mod-desc">{mod.description}</p>}
                            {mod.topics && mod.topics.length > 0 && (
                              <div className="bjs-mod-topics">
                                {mod.topics.map((t, tIdx) => (
                                  <span key={tIdx} className="bjs-topic-pill">
                                    • {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {modalContent?.resources && modalContent.resources.length > 0 && (
                    <div className="bjs-modal-section">
                      <h3>Resources & Documentation</h3>
                      <div className="bjs-resources-grid">
                        {modalContent.resources.map((res, i) => (
                          <div
                            key={i}
                            className="bjs-resource-card"
                            style={{
                              backgroundColor: theme.lightTint,
                              borderColor: theme.border,
                            }}
                          >
                            <span className="bjs-res-type">{res.type}</span>
                            <h5>{res.title}</h5>
                            <p>{res.description}</p>
                            {res.url && (
                              <a
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bjs-res-link"
                                style={{ color: theme.primary }}
                              >
                                View / Download ↗
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* 
            <div className="bjs-modal-footer">
              <button
                type="button"
                className="bjs-modal-done-btn"
                style={{ backgroundColor: theme.primary }}
                onClick={() => setModalProgram(null)}
              >
                Close Details
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
