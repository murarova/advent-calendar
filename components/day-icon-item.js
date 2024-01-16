import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import moment from "moment";
import { OPEN_DAYS_FROM_TODAY } from "../constants/constants";

export function DayIconItem({ date, onPress }) {
  const day = moment(date).format("DD");
  const dayOfWeek = moment(date).format("dddd");
  //current day hardcoded
  const currentDate = moment("20231214");
  const isCurrentDay = currentDate.isSame(moment(date));

  function isDayAvailableForUser() {
    return moment(date).diff(currentDate, "days") <= OPEN_DAYS_FROM_TODAY;
  }

  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        !isDayAvailableForUser() && styles.buttonDisabled,
      ]}
      pointerEvents={isDayAvailableForUser() ? "all" : "none"}
      onPress={onPress}
    >
      <View
        style={[
          styles.innerContainer,
          { backgroundColor: isCurrentDay ? colors.lightColor : colors.white },
        ]}
      >
        <View style={styles.dayOfWeek}>
          <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 16,
    height: 90,
    borderRadius: 20,
    elevation: 4,
    shadowColor: colors.darkColor,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonDisabled: {
    opacity: 0.5,
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
    fontSize: 16,
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
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
