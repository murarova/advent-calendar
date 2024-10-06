import {
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  HStack,
  VStack,
} from "@gluestack-ui/themed";

export const HappySlider = ({ isDisabled, rate, setRate }) => {
  const getRatingEmoji = () => {
    if (rate >= 0 && rate < 20) {
      return "😢";
    }

    if (rate >= 20 && rate < 40) {
      return "🙁";
    }

    if (rate >= 40 && rate < 60) {
      return "😐";
    }

    if (rate >= 60 && rate < 80) {
      return "🙂";
    }

    if (rate >= 80) {
      return "😁";
    }
  };

  const getRatingText = () => {
    if (rate >= 0 && rate < 20) {
      return "Погано";
    }

    if (rate >= 20 && rate < 40) {
      return "Не дуже";
    }

    if (rate >= 40 && rate < 60) {
      return "Нормально";
    }

    if (rate >= 60 && rate < 80) {
      return "Добре";
    }

    if (rate >= 80) {
      return "Круто";
    }
  };

  return (
    <VStack space="2xl" mt="$4" mb="$10">
      <Box>
        <Text textAlign="center" fontSize="$6xl" pb="$2">
          {getRatingEmoji()}
        </Text>
        <Text textAlign="center">{getRatingText()}</Text>
      </Box>
      <HStack space="lg">
        <Center w="$80">
          <Slider
            sliderTrackHeight={4}
            value={rate}
            isDisabled={isDisabled}
            onChange={(v) => {
              setRate(Math.floor(v));
            }}
          >
            <SliderTrack>
              <SliderFilledTrack
                bg={isDisabled ? "$warmGray400" : "$primary300"}
              />
            </SliderTrack>
            <SliderThumb bg={isDisabled ? "$warmGray400" : "$primary400"} />
          </Slider>
        </Center>
      </HStack>
    </VStack>
  );
};
