import React from "react";
import './contacts.css';

export const Contacts = () => {
    return (
        <div className="contacts-container" id="contact">
            <div className="contacts">
              <div className="contact">                                                 
                  <button className="contact-button">
                    <a href="http://t.me/Rossssya" target="_blank" rel="noopener noreferrer" className="contact-link">
                      Telegram
                    </a>
                  </button>                
                  <button className="contact-button">
                    <a href="https://www.instagram.com/rosya_vv/" target="_blank" rel="noopener noreferrer" className="contact-link">
                      Instagram
                    </a>
                  </button>
                  <button className="contact-button">
                    <a href="https://www.behance.net/c3e9ab25" target="_blank" rel="noopener noreferrer" className="contact-link">
                      Behance
                    </a>
                  </button> 
                  <button className="contact-button">
                    <a href="https://www.linkedin.com/in/ярослава-вуйко-9996bb30b/" target="_blank" rel="noopener noreferrer" className="contact-link">
                      Linkedin
                    </a> 
                  </button>                
              </div>
            </div>
        </div>
      );
};
