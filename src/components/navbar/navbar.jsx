import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import './navbar.css';
import logo from '../../images/logo2.png';
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations';
import { LanguageSwitcher } from '../langugeSwitcher/languageSwitcher';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { language } = useLanguage();
  const t = translations[language];

  const onClickLogout = () => {
    if (window.confirm("Вы уверены что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" className='logo-img' />
        </Link>
      </div>
      <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-menu-open' : 'desktop-only'}`}>
        {location.pathname === '/' && !mobileMenuOpen && (
          <>
            <li className="navbar-item desktop-item">
              <a href="#about">{t.aboutMe}</a>
            </li>
            <li className="navbar-item desktop-item">
              <a href="#projects">{t.projects}</a>
            </li>
            <li className="navbar-item desktop-item">
              <a href="#contact">{t.contacts}</a>
            </li>
          </>
        )}
        {!isAuth && location.pathname !== '/' && (
          <li className="navbar-item desktop-item">
            <Link to="/">{t.main}</Link>
          </li>
        )}

        {isAuth && (
          <>
            <li className="navbar-item">
              <Link to="/add-project">{t.add}</Link>
            </li>
            <li className="navbar-item">
              <a onClick={onClickLogout}>{t.logout}</a>
            </li>
          </>
        )}
        <li className="navbar-item">
          <LanguageSwitcher />
        </li>
      </ul>
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        &#9776;
      </div>
    </nav>
  );
};
