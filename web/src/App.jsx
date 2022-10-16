import "./App.css";
import "./style.css";
import React, { useState, Component } from "react";
import Header from "./components/Header";
import Description from "./components/Description";
import "./components/Cam";
import Cam from "./components/Cam";

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Description
                        sub="What Is Assistance Reader?"
                        l1="An app designed to grant blind individuals the ability to read text"
                        l2="Transforms text recognized through a camera into speech"
                    />
                    <Description
                        sub="How Do You Use Assistance Reader?"
                        l1="Position some word(s)/text in front of the camera"
                        l2="Press the Convert to Text button to translate it into speech"
                    />
                    <Description
                        sub="Now Try It Out!"
                        l1="Go and find something that contains word(s)/text, and display it in front of the camera"
                        l2="Click the button and listen as the text gets read out loud"
                    />
                </div>
            <Cam/>
        </div>
    ); 
    } 
}

export default App;