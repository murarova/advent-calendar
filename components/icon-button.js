import { Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function IconButton({ icon, color, onPress, size }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <FontAwesome name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
