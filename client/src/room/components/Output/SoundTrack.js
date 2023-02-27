import React, { useContext, useRef, useEffect, useState } from "react";
import PlaylistContext from "../../../shared/context/playlist-context";
import "./SoundTrack.css";
import Wavedata from "./Sound/wavedata.json";

const SoundTrack = () => {
  const playlistCtx = useContext(PlaylistContext);
  const [newidx, setNewIdx] = useState("0");
  const [clickidx, setClickIdx] = useState(0);
  const [newsrc, setNewSrc] = useState("");
  const canvasRef = useRef(null);
  const layoutRef = useRef(null);
  const audioRef = useRef("");

  useEffect(() => {
    if (newidx !== playlistCtx.musicidx) {
      setNewSrc(playlistCtx.musicsrc);
      setNewIdx(playlistCtx.musicidx);
    }
  }, [playlistCtx.musicidx]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   // const layout = layoutRef.current;
  //   const context = canvas.getContext("2d");
  //   const centerY = canvas.height / 2;
  //   const duration = Wavedata[newidx].duration;
  //   const height = canvas.height;
  //   const width = canvas.width;

  //   context.strokeStyle = "yellow";
  //   context.beginPath();
  //   context.lineWidth = 1;

  //   Wavedata[newidx].peaks.forEach((peak, index) => {
  //     const x =
  //       (index / (Wavedata[newidx].peaks.length * (60 / duration))) * width;
  //     const y = peak * (height / 2) + centerY;
  //     if (index === 0) {
  //       context.moveTo(x, y);
  //     } else if (index < clickidx) {
  //       context.lineTo(x, y);
  //     } else {
  //       return false;
  //     }
  //   });

  //   context.stroke();

  //   for (let i = clickidx; i <= Wavedata[newidx].peaks.length; ) {
  //     const x = (i / (Wavedata[newidx].peaks.length * (60 / duration))) * width;
  //     const y = Wavedata[newidx].peaks[i] * (height / 2) + centerY;
  //     context.beginPath();
  //     context.strokeStyle = "white";
  //     if (i === clickidx) {
  //       context.moveTo(x, y);
  //     } else {
  //       context.lineTo(x, y);
  //     }
  //   }

  //   context.stroke();
  // }, [clickidx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const layout = layoutRef.current;
    // canvas.width = (Wavedata[newidx].duration / 60) * (layout.offsetWidth - 20);
    canvas.width = layout.offsetWidth;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const height = canvas.height;
    const width = canvas.width;
    const actualMusicWidth =
      (Wavedata[newidx].duration / 60) * layout.offsetWidth;
    const centerY = height / 2;
    context.fillStyle = "rgba(255,255,255,0.1)";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.beginPath();

    const duration = Wavedata[newidx].duration;

    Wavedata[newidx].peaks.forEach((peak, index) => {
      const x =
        (index / (Wavedata[newidx].peaks.length * (60 / duration))) * width;
      const y = peak * (height / 2) + centerY;
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();

    function handleClick(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const thatIdx =
        (x * (Wavedata[newidx].peaks.length * 60)) / (duration * width);
      setClickIdx(Math.round(thatIdx));
      // 여기부터 파형 색칠
      context.beginPath();
      context.strokeStyle = "yellow";
      context.lineWidth = 1;

      Wavedata[newidx].peaks.forEach((peak, index) => {
        const x =
          (index / (Wavedata[newidx].peaks.length * (60 / duration))) * width;
        const y = peak * (height / 2) + centerY;
        if (index === 0) {
          context.moveTo(x, y);
        } else if (index < Math.round(thatIdx)) {
          context.lineTo(x, y);
        } else {
          return false;
        }
      });
      context.stroke();

      context.beginPath();
      context.strokeStyle = "white";
      context.lineWidth = 1;

      let tempIdx = Math.round(thatIdx);

      for (let i = tempIdx; i < Wavedata[newidx].peaks.length; i++) {
        const x =
          (i / (Wavedata[newidx].peaks.length * (60 / duration))) * width;
        const y = Wavedata[newidx].peaks[i] * (height / 2) + centerY;
        if (i === tempIdx) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.stroke();
      //여기까지
      const proportion = x / actualMusicWidth;
      const myAudio = audioRef.current;
      myAudio.currentTime = Wavedata[newidx].duration * proportion;
      myAudio.play();
    }

    canvas.addEventListener("click", handleClick);

    function handleKeyDown(event) {
      if (event.keyCode === 32) {
        const myAudio = audioRef.current;
        if (!myAudio.paused) {
          myAudio.pause();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [newidx]);

  return (
    <div className="soundtrack_layout" ref={layoutRef}>
      <audio ref={audioRef} src={newsrc} id="myAudio"></audio>
      <canvas
        className="soundtrack_canvas"
        width={1520}
        height={70}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default SoundTrack;

// audio.currentTime => 초. 단위는 찾아볼 것.
// audio.play
// web audio.api html5
