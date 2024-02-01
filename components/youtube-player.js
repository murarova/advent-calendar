import React, { useState, useCallback } from "react";
import { Alert } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import Loader from "./common/loader";
import AnimatedView from "./common/animated-view";
import { Box } from "@gluestack-ui/themed";

export function YoutubePlayer({ videoId }) {
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  function onReady() {
    setIsLoading(false);
  }

  return (
    <Box flex="1">
      {isLoading && (
        <Box
          position="absolute"
          top="$0"
          bottom="$0"
          left="$0"
          right="$0"
          zIndex="1"
        >
          <Loader />
        </Box>
      )}
      <AnimatedView style={{ zIndex: 2 }} show={!isLoading}>
        <YoutubeIframe
          height={250}
          play={playing}
          videoId={videoId}
          onReady={onReady}
          onChangeState={onStateChange}
        />
      </AnimatedView>
    </Box>
  );
}
