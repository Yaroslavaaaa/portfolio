import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchRemoveProject } from "../../redux/slices/projects";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations'

export const ProjectCard = ({
  index,
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  description,
  type,
  isEditable,
}) => {

  const dispatch = useDispatch();

  const { language } = useLanguage();
  const t = translations[language];

  const onClickRemove = useCallback(() => {
    if (window.confirm("Вы уверены что хотите удалить проект?")) {
      dispatch(fetchRemoveProject(_id));
    }
  }, [dispatch, _id]);

  return (
    <div className="project-card">
      <div className="number">{index < 10 ? `0${index}` : index}</div>
      <div className="card">
        <div className="about-project">
          <div className="title-project">{title}</div>
          <div className="description-project">
            {description}
          </div>
          <div className="more">
            <button className="more-button">
              <Link to={`/projects/${_id}`} className="link-to-project">
                {t.readMore}
              </Link>
            </button>
            {isEditable && (
              <>
                <button className="more-button">
                  <Link to={`/projects/${_id}/edit`} className="link-to-project">
                    Редактировать
                  </Link>
                </button>
                <button className="more-button" onClick={onClickRemove}>
                  Удалить
                </button>
              </>
            )}
          </div>
        </div>
        <div className="card-image-div">
          <LazyLoadImage
            src={`http://localhost:4000${imageUrl}`}
            alt={title}
            effect="blur"
            className="card-image"
          />
        </div>
      </div>
    </div>
  );
};
