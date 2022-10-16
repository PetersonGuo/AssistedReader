import React, {useState, useEffect} from 'react';
import '../Cam.css';
import "react-convert-image";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import Container from 'react-bootstrap/Container';
import { waitFor } from '@testing-library/react';

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function Cam() {
    const webcamRef = React.useRef(null);
    const [text, setText] = useState("");

    const msg = new SpeechSynthesisUtterance();

    const handleClick = React.useCallback (
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            Tesseract.recognize(
                imageSrc, 'eng',
                {
                    logger: m => m
                }
            )
                .catch (x => {
                    console.err(x);
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

    async function speech(txt) {
        txt = txt.replace(/ +/g, ' ');
        console.log('speech: ' + txt);
        if (txt.length > 0) {
            msg.text = txt;
            window.speechSynthesis.speak(msg);
            msg.onend = function(e) {
                handleClick();
            }
        } else 
            handleClick();
    }
    
    // async function correct(txt) {
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    //             'X-RapidAPI-Host': 'jspell-checker.p.rapidapi.com'
    //         },
    //         body: '{"language":"enUS","fieldvalues":"thiss is intresting","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}'
    //     };
        
    //     fetch('https://jspell-checker.p.rapidapi.com/check', options)
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err));
    // }

    return (
        <Container style={{marginTop: "40px", marginBottom: "40px", justifyContent: "center", alignItems: "center", display: "flex"}}>
            <div className="App">
                <main className="App-main">
                    <h1 style={{fontWeight: "bold", fontSize: "30px", marginTop: "15px"}}>Extracted Text</h1>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints} />
                    <div className="text-box" style={{display: "flex", justifyContent: "center"}}>
                        <p className="extractedText"> {text} </p>
                    </div>
                        <button onClick={handleClick} style={{height:50}}> Convert To Text</button>
                </main>
            </div>
        </Container>
    );
}