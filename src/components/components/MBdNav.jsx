import './MBdNav.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function MBdNav() {
    const { t, i18n } = useTranslation();
    let mov=useNavigate();
    const location = useLocation();
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    
    const navItems = [
        { label: 'IMDb Pro', path: '/pro' },
        { label: 'Watchlist', path: '/watchlist' },
        { label: 'Sign In', path: '/login' }
    ];
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const createParticles = (element, isMobile) => {
        const particleCount = isMobile ? 8 : 12;
        const existingParticles = element.querySelectorAll('.nav-particle');
        existingParticles.forEach(p => p.remove());
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'nav-particle';
            
            const angle = (360 / particleCount) * i * (Math.PI / 180);
            const distance = isMobile ? 40 : 60;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            particle.style.setProperty('--delay', `${i * 50}ms`);
            
            element.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    };
    
    const updateIndicator = (element) => {
        if (!element || !indicatorRef.current) return;
        const rect = element.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        
        indicatorRef.current.style.width = `${rect.width}px`;
        indicatorRef.current.style.left = `${rect.left - navRect.left}px`;
        
        const isMobile = window.innerWidth <= 768;
        createParticles(indicatorRef.current, isMobile);
    };
    
    useEffect(() => {
        const index = navItems.findIndex(item => item.path === location.pathname);
        if (index !== -1) {
            setActiveIndex(index);
            const navLinks = navRef.current?.querySelectorAll('.gooey-nav-item');
            if (navLinks && navLinks[index]) {
                updateIndicator(navLinks[index]);
            }
        }
    }, [location.pathname]);
    
    const handleNavClick = (e, index) => {
        setActiveIndex(index);
        updateIndicator(e.currentTarget);
    };

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setCurrentLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };
  return (
    <div>
            <nav className="navbar">
               
        <div className="logo" onClick={(()=>{
            mov('/')
        })} >IMDb</div>
                
                
        
        <button className="menu-btn" onClick={toggleMobileMenu}>
            <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span className="menu-text">{t('nav.menu')}</span>
        </button>

        <div className={`gooey-nav-container ${mobileMenuOpen ? 'mobile-open' : ''}`} ref={navRef}>
            <div className="gooey-nav-indicator" ref={indicatorRef}></div>
            
            <Link to='/pro' 
                className={`gooey-nav-item ${activeIndex === 0 ? 'active' : ''}`}
                onClick={(e) => { handleNavClick(e, 0); closeMobileMenu(); }}>
                <span className="pro-badge">
                    <span>IMDb</span><span className="pro-text">Pro</span>
                </span>
            </Link>

            <Link to="/watchlist" 
                className={`gooey-nav-item ${activeIndex === 1 ? 'active' : ''}`}
                onClick={(e) => { handleNavClick(e, 1); closeMobileMenu(); }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L3 8V18H7V13H13V18H17V8L10 2Z" fill="currentColor"/>
                </svg>
                {t('nav.watchlist')}
            </Link>

            <Link to="/login" 
                className={`gooey-nav-item ${activeIndex === 2 ? 'active' : ''}`}
                onClick={(e) => { handleNavClick(e, 2); closeMobileMenu(); }}>
                {t('nav.signIn')}
            </Link>

            <select 
                className="lang-dropdown mobile-lang" 
                value={currentLanguage}
                onChange={handleLanguageChange}
            >
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
            </select>
        </div>

        <select 
            className="lang-dropdown" 
            value={currentLanguage}
            onChange={handleLanguageChange}
        >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
        </select>

           
        
    </nav>

    </div>
  )
}

export default MBdNav