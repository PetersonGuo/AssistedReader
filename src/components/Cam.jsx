import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Cam.css';
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function Cam() {
    const webcamRef = useRef(null);
    const [text, setText] = useState("");
    const [toggle, setToggle] = useState(true);

    const autoCorrect = useCallback(() => {
        fetch("/autocorrect", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text
            })
        })
            .then(res => res.json())
            .then(response => {
                setText(response.text);
            });
    }, [text]);

    const OCR = useCallback(() => {
        Tesseract.recognize(
            webcamRef.current.getScreenshot(), 'eng'
        )
            .catch(x => {
                console.error(x);
            })
            .then(result => {
                let txt = result.data.text;
                console.log(txt + ": " + result.data.confidence);
                if (result.data.confidence > 50) {
                    autoCorrect();
                    console.log('autocorrected: ' + text);
                }
                console.log('speech: ' + text);
                if (!toggle) {
                    const msg = new SpeechSynthesisUtterance();
                    msg.txt = text;
                    window.speechSynthesis.speak(msg);
                }
            });
    }, [autoCorrect, text, toggle]);

    useEffect(() => {
        setInterval(() => OCR, 10);
    }, [OCR]);

    return (
        <div className={"my-[40px] justify-center items-center flex"}>
            <main className="items-center">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className={"w-[440px] h-[400px] border-[5px] border-black rounded-3xl"}
                />
                <h1 className={"font-[30px] mt-[15px]"}>Extracted Text</h1>
                <p className="text-box extractedText flex justify-center"> {text} </p>
                <button onClick={() => {
                    setToggle(!toggle)
                }} className={"h-[50] m-5"}>
                    {toggle ? 'Start Reading' : 'Stop Reading'}
                </button>
            </main>
        </div>
    );
}