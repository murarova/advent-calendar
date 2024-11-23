import { ActivityIndicator } from "react-native";
import { Box } from "@gluestack-ui/themed";

export const Loader = ({ size }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <ActivityIndicator size={size} />
  </Box>
);
