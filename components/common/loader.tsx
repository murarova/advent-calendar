import { ActivityIndicator } from "react-native";
import { Box } from "@gluestack-ui/themed";

export const Loader = ({ size }: { size?: number | "small" | "large" }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <ActivityIndicator size={size} />
  </Box>
);
