import React, {useState, useEffect} from 'react';
import './Cam.css';
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function Cam() {
    const webcamRef = React.useRef(null);
    const [text, setText] = useState("");
    const [toggle, setToggle] = useState(true);

    const msg = new SpeechSynthesisUtterance();

    useEffect (() => {
            const imageSrc = webcamRef.current.getScreenshot();
            Tesseract.recognize(
                imageSrc, 'eng',
                {
                    logger: m => m
                }
            )
                .catch (x => {
                    console.error(x);
                })
                .then(result => {
                    let txt = "";
                    console.log(result.data.text + ": " + result.data.confidence);
                    if (result.data.confidence > 50) {
                        txt = result.data.text.replaceAll('[^\w\d\s.,!?]', '');
                        console.log(txt);
                    }

                    console.log('speech: ' + text);
                    if (txt.length > 0) {
                        setText(txt);
                        msg.text = txt;
                        if (!toggle) window.speechSynthesis.speak(msg);
                    }
                });
            const interval = setTimeout(() => {}, 200);
            return () => clearInterval(interval);
        }, [webcamRef.current, text, toggle]);

    return (
        <div className={"my-[40px] justify-center items-center flex"}>
            <main className="items-center">
                <h1 className={"font-bold font-[30px] mt-[15px]"}>Extracted Text</h1>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints} />
                <p className="text-box extractedText flex justify-center"> {text} </p>
                <button onClick={()=> {setToggle(!toggle)}} className={"h-[50] m-5"}>
                    {toggle?'Start Reading':'Stop Reading'}
                </button>
            </main>
        </div>
    );
}