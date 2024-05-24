import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import avatar1 from '../../images/1.png'
import './aboutMe.css'
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations'

export const AboutMe = () => {

  const navigate = useNavigate();
  const location = useLocation();


  const { language } = useLanguage();
  const t = translations[language];

  
  const handleLinkClick = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      navigate(location.pathname, { replace: true }); 
    }
  };


    return (
        <div className="container" id="about">
          <div className="portfolio-container">
            <section className="about-me">
              <div className="about-content">
                <div className="text">
                  <div className="ellipse"></div>
                  <div className="surname">{t.surname}</div>
                  <div className="name">{t.name}</div>
                  <div className="description">
                      {t.description}
                  </div>
                  <button className="projects-button" onClick={(e) => handleLinkClick(e, 'projects')}>{t.viewProjects}</button>
                </div>
                <div className="avatar">
                    <div className="background"></div>
                    <img className="image" src={avatar1} />
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    };
    