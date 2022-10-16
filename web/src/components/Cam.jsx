import React, {useState} from 'react';
import '../Cam.css';
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import Container from 'react-bootstrap/Container';
import { useSpeechSynthesis } from "react-speech-kit";

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function Cam() {

    const webcamRef = React.useRef(null);
    const [text, setText] = useState("");

    const {speak} = useSpeechSynthesis();

    async function speech(txt) {
        txt = txt.replace(/ +/g, ' ');
        console.log('speech: ' + txt);
        speak({text: ''+txt});
    }
    
    async function correct(txt) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
                'X-RapidAPI-Host': 'jspell-checker.p.rapidapi.com'
            },
            body: '{"language":"enUS","fieldvalues":"thiss is intresting","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}'
        };
        
        fetch('https://jspell-checker.p.rapidapi.com/check', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    const handleClick = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            Tesseract.recognize(
                imageSrc, 'eng',
                {
                    logger: m => console.log(m > 50 ? m : '')
                }
            )
                .catch (err => {
                    console.error(err);
                })
                .then(result => {
                    let text = "";
                    if (result.data.confidence > 50) {
                        for (let i of result.data.text)
                            if ((i <= 'Z' && i >= 'A') || (i <= 'z' && i >= 'a') || (i >= '0' && i <= '9') || i === ' ' || i === ',' || i === '.' || i === '!' || i === '\'' || i === '"')
                                text += i;
                        console.log(text);
                    }

                    setText(text);
                    speech(text);
                })
        }, [webcamRef]);

    return (
        <Container style={{marginTop: "40px", marginBottom: "40px", justifyContent: "center", alignItems: "center", display: "flex"}}>
            <div className="App">
                <main className="App-main">
                    <h1>Extracted text</h1>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints} />
                    <div className="text-box" style={{display: "flex", justifyContent: "center"}}>
                        <p style={{textAlign: "center", maxWidth: "1000px"}}> {text} </p>
                    </div>
                    <button onClick={handleClick} style={{height:50}}> convert to text</button>
                </main>
            </div>
        </Container>
    );
}