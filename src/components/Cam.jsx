import React, {useEffect, useRef, useState} from 'react';
import './Cam.css';
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import {GoMute, GoUnmute} from "react-icons/go";

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function Cam() {
    const webcamRef = useRef(null);
    const [text, setText] = useState("");
    const [speak, setSpeak] = useState(false);
    const [readData, setReadData] = useState(false);

    async function talk(text) {
        const speech = new SpeechSynthesisUtterance();
        speech.txt = text;
        window.speechSynthesis.speak(speech);
    }

    useEffect(() => {
        const pause = setInterval(async () => {
            if (readData) {
                console.log('run')
                await Tesseract.recognize(
                    webcamRef.current.getScreenshot(), 'eng'
                )
                    .catch(x => {
                        console.error(x);
                    })
                    .then(async result => {
                        let txt = result.data.text;
                        console.log(txt + ": " + result.data.confidence);
                        if (result.data.confidence > 50) {
                            await fetch("/autocorrect", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    text: txt
                                })
                            })
                                .then(res => res.json())
                                .then(response => {
                                    txt = response.text;
                                    setText(response.text);
                                });
                            console.log('autocorrected: ' + text);
                            if (speak) {
                                console.log('speech: ' + text);
                                await talk(text);
                            }
                        }
                    });
            }
        }, 500);
        return () => clearInterval(pause);
    }, [text, readData, speak]);

    return (
        <div className={"my-[40px] justify-center items-center flex"}>

            <main className="items-center">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className={"h-50 border-2 border-black rounded-3xl"}
                />
                <h1 className={"text-lg my-3"}>Extracted Text</h1>
                <p className="text-box extractedText text-center"> {text} </p>
                <div className={"flex row"}>
                    <button onClick={() => {
                        setReadData(!readData)
                    }} className={"h-[50] m-5"}>
                        {!readData ? 'Start Reading' : 'Stop Reading'}
                    </button>
                    {
                        speak ?
                            <GoUnmute className={"text-white hover:cursor-pointer"}
                                      size={30}
                                      onClick={() => setSpeak(!speak)}/> :
                            <GoMute className={"text-white hover:cursor-pointer"} size={30}
                                    onClick={() => setSpeak(!speak)}/>
                    }
                </div>
            </main>
        </div>
    );
}