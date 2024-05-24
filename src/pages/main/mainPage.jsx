import React from "react";
import { AboutMe } from "../../components/aboutMe/aboutMe";
import { Projects } from "../../components/projects/projects";
import { Contacts } from "../../components/contacts/contacts";
import './mainPage.css'

export const MainPage = () => {

    

    return (
        <div>
            <AboutMe />
            <Projects />
            <Contacts />
        </div>
      );
    };