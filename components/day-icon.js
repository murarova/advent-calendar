import { Pressable, Box, Text, VStack, Center } from "@gluestack-ui/themed";
import moment from "moment";
import { OPEN_DAYS_FROM_TODAY } from "../constants/constants";

export function DayIcon({ date, onPress }) {
  const day = moment(date).format("DD");
  const dayOfWeek = moment(date).format("ddd");
  //current day hardcoded
  const currentDate = moment("20231214");
  const isCurrentDay = currentDate.isSame(moment(date));

  function isDayAvailableForUser() {
    return moment(date).diff(currentDate, "days") <= OPEN_DAYS_FROM_TODAY;
  }

  function getIconBg(pressed) {
    if (isCurrentDay) {
      return pressed ? "$teal400" : "$teal500";
    } else if (isDayAvailableForUser()) {
      return pressed ? "$primary300" : "$primary400";
    } else {
      return "$warmGray400";
    }
  }

  return (
    <Pressable
      onPress={onPress}
      softShadow="3"
      m="$2"
      flex={1}
      disabled={!isDayAvailableForUser()}
    >
      {({ pressed }) => (
        <Box p="$5" rounded="$xl" bg={getIconBg(pressed)}>
          <VStack space="xs" reversed={false}>
            <Center>
              <Text color="$warmGray200">{dayOfWeek}</Text>
            </Center>
            <Center>
              <Text size="3xl" color="$warmGray200">
                {day}
              </Text>
            </Center>
          </VStack>
        </Box>
      )}
    </Pressable>
  );
}
