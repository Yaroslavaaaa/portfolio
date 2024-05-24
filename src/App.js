import { MainPage } from "./pages/main/mainPage";
import { useEffect } from "react";
import { Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectPage } from "./pages/project/projectPage";
import AddProject from "./pages/addProject/addProject";
import { Navbar } from "./components/navbar/navbar";
import { Login } from "./pages/login/login";
import './App.css'
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])


  return (
    <div className="body">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects/:id/edit" element={<AddProject />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
