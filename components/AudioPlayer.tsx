import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAnnotation } from '../hooks/useAnnotation';

export const AudioPlayer = () => {

    const {audioPlayer} = useAnnotation()

  return (
    <div hidden={audioPlayer != '' ? false : true}>
      <ReactAudioPlayer
        src={audioPlayer}
        autoPlay={true}
        controls
      />
    </div>
  );
};