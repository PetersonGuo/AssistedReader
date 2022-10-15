import React, {useState} from 'react';
import './App.css';
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const videoConstraints = {
    width: 440,
    height: 400,
    facingMode: "user"
};

export default function App() {

    const webcamRef = React.useRef(null);

    const [imagePath, setImagePath] = useState('http://192.168.4.1/picture.png');
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
                    console.log(result.data);
                    let confidence = result.data.confidence;
                    console.log(`confidence is : ${confidence}`);
                    let text = "";
                    for (let i of result.data.text)
                        if ((i <= 'Z' && i >= 'A') || (i <= 'z' && i >= 'a') || (i >= '0' && i <= '9') || i === ' ')
                            text += i;
                    if (confidence > 50) {
                        console.log(`Confidence is greater than 50 so logging text:`);
                        console.log(text);
                    }
                    setText(text);
                })
        }, [webcamRef]);

    return (
        <div className="App">
            <main className="App-main">
                <h3>Extracted text</h3>
                {/*<Camera />*/}
                <Webcam
                audio={false}
                height={600}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={660}
                videoConstraints={videoConstraints} />
                <div className="text-box">
                    <p> {text} </p>
                </div>
                <button onClick={handleClick} style={{height:50}}> convert to text</button>
            </main>
        </div>
    );
}