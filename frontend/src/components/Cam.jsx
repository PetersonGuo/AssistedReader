import React, {useEffect, useRef, useState} from 'react';
import './Cam.css';
import Webcam from "react-webcam";
import {createWorker} from "tesseract.js";
import {GoMute, GoUnmute} from "react-icons/go";

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
};

export default function Cam() {
    const webcamRef = useRef(null);
    const [text, setText] = useState("");
    const [textArr, setTextArr] = useState([]); // [text, text, text
    const [speak, setSpeak] = useState(true);
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

    function speakText(iter) {
        speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(textArr[iter]);
        console.log(speech);
        speechSynthesis.rate = 1.4;
        console.log('speech started')
        speechSynthesis.speak(speech);
        speech.onerror = () => {
            console.log('speech error');
            setDone(true);
        };

        speech.onend = () => {
            if (iter + 1 < textArr.length) {
                speakText(iter + 1);
            } else {
                setDone(true);
                console.log('speech ended');
            }
        }
    }

    useEffect(() => {
        if (!done) return;
        const pause = setInterval(async () => {
            if (readData) {
                setDone(false);
                const worker = await createWorker('eng');
                const ret = await worker.recognize(webcamRef.current.getScreenshot());
                let txt = ret.data.text;
                console.log("confidence: " + ret.data.confidence);
                if (ret.data.confidence > 50 && txt.length > 0) {
                    await autoCorrect(txt);
                    console.log('autocorrected: ' + txt);
                    setText(txt);
                    if (speak) {
                        setTextArr(txt.split(/([,.?!\s])/));
                        console.log(textArr);
                        speakText(0);
                    } else {
                        setDone(true);
                    }
                } else {
                    setDone(true);
                }
                await worker.terminate();
            }
        }, 100);
        return () => clearInterval(pause);
    }, [text, readData, speak, done]);

    return (
        <main className={"my-3 w-full"}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={"h-96 border-2 mx-auto border-black rounded-3xl"}
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
                                onClick={() => {
                                    setSpeak(!speak);
                                    speechSynthesis.cancel();
                                    console.log('speech cancelled');
                                }}/>
                }
            </div>
        </main>
    );
}