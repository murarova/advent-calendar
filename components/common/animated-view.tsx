import React, { useRef, useEffect } from "react";
import { Animated, ViewStyle } from "react-native";

interface AnimatedViewProps {
  show: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  show,
  children,
  style,
}) => {
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
    <Animated.View
      style={[
        style,
        { opacity: fadeAnim }, // Bind opacity to animated value
      ]}
    >
      {children}
    </Animated.View>
  );
};
