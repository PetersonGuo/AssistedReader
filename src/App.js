import React, {Component} from "react";
import Description from "./components/Description";
import "./components/Cam";
import Cam from "./components/Cam";
import {APP_NAME} from "./consts";

const h3 = [`What Is ${APP_NAME}?`, `How Do You Use ${APP_NAME}?`, `Now Try It Out!`];
const l1 = [
    "An app designed to grant blind individuals the ability to read text",
    "Position some word(s)/text in front of the camera",
    "Go and find something that contains word(s)/text, and display it in front of the camera"
];
const l2 = [
    "Transforms text recognized through a camera into speech",
    "Press the Convert to Text button to translate it into speech",
    "Click the button and listen as the text gets read out loud"
];

class App extends Component {
    render() {
        return (
            <div className={"w-screen h-screen bg-gray-950 absolute l-[-50%]"}>
                <h1 className="text-3xl py-3 px-10 rounded-2xl bg-blue-500 mx-auto my-3">{APP_NAME}</h1>
                <div className="w-full justify-evenly grid grid-cols-3 px-10 py-10">
                    <Description h3={h3[0]} l1={l1[0]} l2={l2[0]} i={0}/>
                    <Description h3={h3[1]} l1={l1[1]} l2={l2[1]} i={1}/>
                    <Description h3={h3[2]} l1={l1[2]} l2={l2[2]} i={2}/>
                </div>
                <Cam/>
            </div>
        );
    }
}

export default App;