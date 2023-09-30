import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from "../styles/colors";

function DayGoalsItem({ day, dayOfWeek, onPress }) {
  return (
    <View style={ styles.gridItem }>
      <Pressable
        android_ripple={ { color: '#ccc' } }
        style={ ({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ] }
        onPress={ onPress }
      >
        <View style={ styles.innerContainer }>
          <View style={ styles.dayOfWeek }>
            <Text style={ styles.dayOfWeekText }>{ dayOfWeek }</Text>
          </View>
          <View style={ styles.day }>
            <Text style={ styles.dayText }>{ day }</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default DayGoalsItem;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 90,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: colors.darkColor,
    shadowColor: colors.darkColor,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  dayOfWeekText: {
    color: colors.white,
    fontSize: 16
  },
  dayOfWeek: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
    position: "absolute",
    bottom: 0,
    height: 26,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    color: colors.white,
    backgroundColor: "#12486B",
    elevation: 1,
    shadowColor: colors.darkColor,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  day: {
    display: "flex",
    alignItems: "center",
    flex: 2,
    color: "#12486B",
    paddingTop: 1,
  },
  dayText: {
    paddingTop: 5,
    fontSize: 45,
    letterSpacing: -1,
    color: "#12486B",
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
