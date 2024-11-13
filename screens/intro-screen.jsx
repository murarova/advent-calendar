import {
  Box,
  Text,
  Heading,
  Center,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { SnowAngel, Decorating, Grandma, Dog } from "../assets/svg";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/constants";

const { width: screenWidth } = Dimensions.get("window");

export function IntroScreen() {
  const { t } = useTranslation();
  const nav = useNavigation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const data = [
    {
      title: "Jingle plan",
      subtitle: "Наповни своє життя цілями",
      image: <Decorating />,
    },
    {
      title: "Виконуй щоденні завдання",
      subtitle: "Lorem ipsum dolor sit amet consectetur.",
      image: <SnowAngel />,
    },
    {
      title: "Jingle plan 3",
      subtitle: "Наповни своє життя цілями",
      image: <Grandma />,
    },
    {
      title: "Jingle plan 4",
      subtitle: "Наповни своє життя цілями",
      image: <Dog />,
    },
  ];
  function renderItem({ item }) {
    return (
      <Box alignItems="center">
        <Center mb="$10">{item.image}</Center>
        <Heading mb="$5">{item.title}</Heading>
        <Text>{item.subtitle}</Text>
      </Box>
    );
  }
  return (
    <Box flex={1} justifyContent="center">
      <Box pt="$10">
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          onSnapToItem={setActiveSlide}
          itemWidth={screenWidth - 60}
          data={data}
          firstItem={activeSlide}
          renderItem={renderItem}
        />
        <Box mt="$6">
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              marginHorizontal: -2,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
        </Box>
      </Box>
      <Box mt="$3" width={screenWidth - 60} alignSelf="center">
        <Button onPress={() => nav.replace(SCREENS.REGISTER)} mt="$2">
          <ButtonText>{t("screens.intro.loginBtn")}</ButtonText>
        </Button>
        <Button
          onPress={() => nav.replace(SCREENS.LOGIN)}
          mt="$2"
          variant="outline"
        >
          <ButtonText>{t("screens.intro.signupBtn")}</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
