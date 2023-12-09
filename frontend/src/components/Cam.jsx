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
    const [done, setDone] = useState(true);

    async function autoCorrect(txt) {
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
                setText(txt);
            });
    }

    function speakText(txt) {
        const speech = new SpeechSynthesisUtterance(txt);
        speechSynthesis.cancel();
        speechSynthesis.rate = 1.4;
        speechSynthesis.speak(speech);
        setTimeout(() => {
            speech.onend = () => {
                console.log('speech ended');
                setDone(true);
            }
        }, 30000); // 30 seconds timeout
    }

    useEffect(() => {
        if (!done) return;
        const pause = setInterval(async () => {
            if (readData) {
                setDone(false);
                await Tesseract.recognize(
                    webcamRef.current.getScreenshot(), 'eng'
                )
                    .catch(x => {
                        console.error(x);
                    })
                    .then(
                        async result => {
                            let txt = result.data.text;
                            console.log("confidence: " + result.data.confidence);
                            if (result.data.confidence > 50 && txt.length > 0) {
                                await autoCorrect(txt);
                                console.log('autocorrected: ' + txt);
                                if (speak) {
                                    console.log('speech');
                                    speakText(txt);
                                } else {
                                    setDone(true);
                                }
                            } else {
                                setDone(true);
                            }
                        });
            }
        }, 500);
        return () => clearInterval(pause);
    }, [text, readData, speak, done]);

    return (
        <main className={"my-3 w-full"}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={"h-50 border-2 mx-auto border-black rounded-3xl"}
            />
            <h1 className={"text-lg my-3 font-bold"}>Extracted Text</h1>
            <p className="text-center w-[75%] h-[8%] overflow-y-scroll mx-auto bottom-24 fixed inset-x-0"> {text} </p>
            <div className={"fixed bottom-2 w-[75%] inset-x-0 mx-auto flex row"}>
                <button onClick={() => {
                    setReadData(!readData)
                }} className={"h-[50] m-5"}>
                    {!readData ? 'Start Reading' : 'Stop Reading'}
                </button>
                {
                    speak ?
                        <GoUnmute className={"text-white hover:cursor-pointer"} size={30}
                                  onClick={() => setSpeak(!speak)}/> :
                        <GoMute className={"text-white hover:cursor-pointer"} size={30}
                                onClick={() => setSpeak(!speak)}/>
                }
            </div>
        </main>
    );
}