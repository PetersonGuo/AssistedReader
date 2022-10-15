import Webcam from "react-webcam";
import React from "react";

export function ScreenShot() {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return () => (
        <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}>
            getScreenshot();)
        </Webcam>
    );
}

class VideoCapture extends React.Component {
    render() {
        const videoConstraints = {
            facingMode: "user"
        };

        return <Webcam videoConstraints={videoConstraints} />;
    }
} export default VideoCapture;