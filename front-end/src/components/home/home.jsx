import React from "react";
import {connect} from 'react-redux';
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../navbar/navbar";
import LoginComponent from "../login/login";
import RegisterComponent from "../register/register";
import UserView from "../view/view";
import AddContactComponent from "../addContact/add-contact";
import './home.css';

const Home = () => {

    const location = useLocation();

    console.log(location);

    return(
        <>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={<LoginComponent/>}/>
            <Route exact path="/signup" element={<RegisterComponent/>}/>
            <Route exact path="/view" element={<UserView/>}/>
            <Route exact path="/add-contact" element={<AddContactComponent/>}/>
        </Routes>
        </>
    );
}


export default connect(null,null)(Home);