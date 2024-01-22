import React, { useState, useCallback } from "react";
import { View, Alert } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

export function YoutubePlayer({ videoId }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View>
      <YoutubeIframe
        height={250}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
}
