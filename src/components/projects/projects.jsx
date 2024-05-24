import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from "../../redux/slices/projects";
import './projects.css'; 
import { ProjectCard } from "../projectCard/projectCard";
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations'

export const Projects = () => {
  const [selectedType, setSelectedType] = useState('Django');

  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.projects);
  const userData = useSelector((state) => state.auth.data);

  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleTypeClick = useCallback((type) => {
    setSelectedType(type);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.items.filter(project => project.type === selectedType);
  }, [projects.items, selectedType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="projects-container" id="projects">
      <div className="header">{t.projects}</div>
      <div className="types">
        {['Django', 'Figma', 'React', '3ds Max'].map((type) => (
          <div
            key={type}
            className={`type ${selectedType === type ? 'selected' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </div>
        ))}
      </div>
      <section className="projects">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((obj, index) => (
            <ProjectCard
              key={obj._id}
              index={index + 1}  // Passing the index here, starting from 1
              _id={obj._id}
              title={obj.title}
              description={obj.description}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              type={obj.type}
              isEditable={userData?._id === obj.user._id}
            />
          ))
        ) : (
          <div className="no-projects-message">Нет проектов по данному разделу</div>
        )}
      </section>
    </div>
  );
};
