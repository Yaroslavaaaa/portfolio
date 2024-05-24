import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slices/auth';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuth) {
        navigate('/');
      }
    }, [isAuth, props]);

    return isAuth ? <WrappedComponent /> : null;
  };

  return WithAuth;
};

export default withAuth;
