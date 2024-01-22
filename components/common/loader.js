import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = ({ size }) => (
  <View style={[styles.container]}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
