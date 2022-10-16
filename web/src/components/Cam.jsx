import React, {useState} from 'react';
import '../Cam.css';
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import Container from 'react-bootstrap/Container';

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function Cam() {

    const webcamRef = React.useRef(null);
    const [text, setText] = useState("");

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
                })
        }, [webcamRef]);

    return (
        <Container>
            <div className="App">
                <main className="App-main">
                    <h1>Extracted text</h1>
                    <Webcam
                        audio={false}
                        height={500}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={665}
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