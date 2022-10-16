import "./App.css";
import "./style.css";
import React, { Component } from "react";
import Header from "./components/Header";
import Description from "./components/Description";

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Description
                        sub="What Is Assistance Reader?"
                        l1="An app designed to allow blind individuals to read text"
                        l2="Transforms text recognized through a camera into speech"
                    />
                    <Description
                        sub="How To Use Assistance Reader"
                        l1="Put on the pair of glasses"
                        l2="Press and hold button to translate any text it seen by the camera into speech"
                    />
                    <Description
                        sub="Now Try It Out!"
                        l1="Click the Read button with your camera facing some text"
                        l2="Listen as the text gets read out loud"
                    />
                </div>
            </div>
        );
    }
} export default App;