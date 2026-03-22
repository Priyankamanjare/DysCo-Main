import React, { useRef, useState, useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import { loadYoloModel, detectYolo } from './yoloUtils';
import Webcam from "react-webcam";
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuthContext } from '../../hooks/useAuthContext';
import './FlashCards.css'
const apiURL = import.meta.env.VITE_BACKEND_URL;

const ObjectDetector = () => {
  const [detection, setDetection] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectWorkerRef = useRef(null);
  const loopActiveRef = useRef(false);

  const { user } = useAuthContext();

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  const stopDetection = () => {
    setIsDetecting(false);
    loopActiveRef.current = false;
    if (detectWorkerRef.current) {
      clearTimeout(detectWorkerRef.current);
    }
    // optionally clear canvas after stopping
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const startDetection = async () => {
    setIsDetecting(true);
    loopActiveRef.current = true;
    toast.success("Loading YOLOv8 model, please wait...");
    const net = await loadYoloModel();
    toast.dismiss();
    toast.success("Model loaded!");
    runDetectionLoop(net);
  }

  const runDetectionLoop = async (net) => {
    if(!loopActiveRef.current) return;
    await detect(net);
    if(!loopActiveRef.current) return;
    detectWorkerRef.current = setTimeout(() => {
      runDetectionLoop(net);
    }, 150); // running at ~6.6 FPS to prevent browser freezing with large tensor maths
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await detectYolo(net, video);

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight); // wipe previous rects
      drawRect(obj, ctx);
    }
  };

  const drawRect = (detections, ctx) => {
    detections.forEach(element => {
        const[x ,y, width, height] = element['bbox'];
        const text = element['class'];
        setDetection(text);

        const color = 'white';
        ctx.strokeStyle = color
        ctx.font = '20px Arial';
        ctx.lineWidth = 5;

        ctx.beginPath();   
        ctx.fillStyle = color
        ctx.fillText(text, x, y > 20 ? y - 5 : y + 20); // Better text placement
        ctx.rect(x, y, width, height); 
        ctx.stroke();
    });
  }

  const createCard = async() => {
    try {
      if(user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        };
        const response = await axios.post(`${apiURL}/card/add/`, { name: detection }, config);
        if(response && response.status == 201) {
          toast.success('Card added successfully');
          setDetection('');
        }
      }
    } catch(error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

  return (
    <div className="object__detector__container">
      <div className="webcam__container">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="webcam" 
        />
        <canvas
          ref={canvasRef} className="canvas"
        />
      </div>
      {isDetecting ? (
        <button onClick={stopDetection} className="primary__btn">
          STOP DETECTION
        </button>
      ) : (
        <button onClick={startDetection} className="primary__btn">
          START DETECTION
        </button>
      )}
      {detection && (
        <div className="detection__placeholder">
          <h2>OBJECT DETECTED : {detection}</h2>
          {!isDetecting && (
            <button onClick={createCard} className="primary__btn">
              CREATE CARD
            </button>
          )}
        </div>
      )}
    </div>
   
  );
}

export default ObjectDetector;
