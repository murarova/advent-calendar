import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const AnimatedView = ({ show, children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    if (show) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
};

