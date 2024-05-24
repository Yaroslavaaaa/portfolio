import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './login.css'
import {useForm} from 'react-hook-form'
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues:{
            email: "",
            password: ""
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))

        if(!data.payload) {
            alert("Не удалось авторизоваться")
        }

        if('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token)
        }else{
            alert("Не удалось авторизоваться")
        }
        dispatch(fetchAuth(values))
    }

    if(isAuth){
        return <Navigate to="/" />
    }


    return (
        <div>
            <div className="container">
            <div className="brand-logo"></div>
            <div className="brand-title">Войти</div>
            <div className="ellipse-left"></div>
            <form onSubmit={handleSubmit(onSubmit)} className="add-form">
                <div className="inputs">
                    <div className="input">
                        <label className="label">Email</label>
                        <input type="email" {...register("email", {required: "Укажите почту"})} placeholder="Email" className="text-input"/>
                    </div>
                    <div className="input">
                        <label className="label">Пароль</label>
                        <input type="password" {...register("password", {required: "Укажите пароль"})} placeholder="Пароль" className="text-input"/>
                    </div>
                    <div className="input">
                        <input type="submit" value="Войти" className="submit" />
                    </div>
                </div>
            </form>
            <div className="ellipse-right"></div>
            </div>
        </div>
      );
    };


    