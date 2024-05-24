import React, { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations'
import './addForm.css';

export const AddForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id)
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);


  const { language } = useLanguage();
  const t = translations[language];



  const { register, handleSubmit, setError, formState: { errors, isValid }, getValues, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      gitLink: "",
      hostLink: "",
    },
    mode: 'onChange'
  });

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      alert('Error');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { title, description, type, gitLink, hostLink } = getValues();
      const fields = {
        title,
        description,
        type,
        imageUrl,
        gitLink,
        hostLink,
      };
      const { data } = isEditing 
      ? await axios.patch(`/projects/${id}`, fields) 
      : await axios.post('/projects', fields)
      const _id = isEditing ? id : data._id;
      navigate(`/projects/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Error');
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/projects/${id}`).then((res) => {
        const project = res.data;
        setImageUrl(project.imageUrl);
        reset({
          title: project.title,
          description: project.description,
          type: project.type,
          gitLink: project.gitLink,
          hostLink: project.hostLink,
        });
      }).catch((err) => {
        console.error(err);
        alert('Error loading project');
      });
    }
  }, [id, reset]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">Добавить проект</div>
        <div className="ellipse-left"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="add-form">
          <div className="inputs">
            <div className="input">
              <label className="label">Название</label>
              <input type="text" {...register("title", { required: "Укажите название" })}
                placeholder="Название" className="text-input" />
            </div>
            <div className="input">
              <label className="label">Картинка</label>
              <button type="button" className="upload-image" onClick={() => inputFileRef.current.click()}>Загрузить картинку</button>
              <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
              {imageUrl && (
                <>
                  <div className="add-image-div">
                    <img src={`http://localhost:4000${imageUrl}`} alt="Preview" className="add-image"  />
                  </div>
                  <button type="button" onClick={onClickRemoveImage} className="upload-image">
                    Удалить
                  </button>
                </>
              )}
            </div>
            <div className="input">
              <label className="label">Описание</label>
              <textarea {...register("description", { required: "Укажите описание" })} placeholder="Описание" rows="10" className="description-input"></textarea>
            </div>
            <div className="input">
              <label className="label">Тип</label>
              <input type="text" {...register("type", { required: "Укажите тип" })} placeholder="Тип" className="text-input" />
            </div>
            <div className="input">
              <label className="label">Ссылка на GitHub</label>
              <input type="text" {...register("gitLink", { required: false })} placeholder="Ссылка на GitHub" className="text-input" />
            </div>
            <div className="input">
              <label className="label">Ссылка на хост</label>
              <input type="text" {...register("hostLink", { required: false })} placeholder="Ссылка на хост" className="text-input" />
            </div>
            <div className="input">
              <input type="submit" value={isEditing ? "Сохранить" : "Добавить"} className="submit" />
            </div>
          </div>
        </form>
        <div className="ellipse-right"></div>
      </div>
    </div>
  );
};
