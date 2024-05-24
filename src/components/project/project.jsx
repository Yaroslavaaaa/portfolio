import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './project.css';
import axios from '../../axios';
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations'

export const Project = ({ isEditable }) => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        axios.get(`/projects/${id}`).then(res => {
            setData(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.warn(err);
            alert('Ошибка при получении проекта');
        });
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="project-container">
                <div className="project">
                    <div className="title">{data.title}</div>
                    <img src={`http://localhost:4000${data.imageUrl}`} alt="" className="project-image" />
                    <div className="project-info">
                        <div className="name-project">{t.title}: {data.title}</div>
                        <div className="description">{t.descriptionProject}: {data.description}</div>
                        <div className="project-type">{t.type}: {data.type}</div>
                        <div className="links">
                            {data.hostLink && (
                                <button className="link-button">
                                    <a href={data.hostLink} className="link-to-project" target="_blank" rel="noopener noreferrer">
                                        {data.type === 'Figma' ? "Figma" : t.host}
                                    </a>
                                </button>
                            )}
                            {data.gitLink && (
                                <button className="link-button">
                                    <a href={data.gitLink} className="link-to-project" target="_blank" rel="noopener noreferrer">
                                        {data.type === 'Figma' ? "Behance" : "GitHub"}
                                    </a>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
