import { useState, useLayoutEffect, useRef } from "react";
import { getUserPhotos } from "../services/services";
import { EmptyScreen } from "../components/empty-screen";
import { Loader } from "../components/common";
import { useIsFocused } from "@react-navigation/native";
import { Alert, Dimensions, Platform, StyleSheet, View } from "react-native";
import {
  Box,
  Button,
  Text,
  Center,
  ScrollView,
  ChevronRightIcon,
  ButtonIcon,
  ChevronLeftIcon,
  SafeAreaView,
} from "@gluestack-ui/themed";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { months } from "../constants/constants";
import { Image } from "@gluestack-ui/themed";

const { width } = Dimensions.get("window");
const screenWidth = width - 60;

export function AlbumScreen() {
  const [photos, setPhotos] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const carouselRef = useRef(null);

  function mapDataToCarousel(inputDict) {
    const outputList = [];
    const monthOrder = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
      "year",
    ];
    for (const [month, data] of Object.entries(inputDict)) {
      outputList.push({
        month,
        id: data.id,
        image: data.image,
        text: data.text,
      });
    }
    outputList.sort(
      (a, b) =>
        monthOrder.indexOf(a.month.toLowerCase()) -
        monthOrder.indexOf(b.month.toLowerCase())
    );
    return outputList;
  }

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const goBack = () => {
    carouselRef.current.snapToPrev();
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        const data = await getUserPhotos();
        if (data) {
          const photos = mapDataToCarousel(data);
          setPhotos(photos);
        }
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
    if (isFocused) {
      getTasks();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <Box flex={1} width={screenWidth}>
        <Box
          flexGrow={1}
          backgroundColor="$white"
          p={10}
          borderTopRightRadius={8}
          borderTopLeftRadius={8}
          borderBottomRightRadius={item.text ? 0 : 8}
          borderBottomLeftRadius={item.text ? 0 : 8}
        >
          <Image
            source={{ uri: item?.image?.uri }}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: "contain",
            }}
            alt="user photo"
          />
        </Box>
        {item.text && (
          <ScrollView
            flexBasis="30%"
            p={10}
            flexGrow={0}
            backgroundColor="$white"
            borderBottomRightRadius={8}
            borderBottomLeftRadius={8}
          >
            <Text pb="$4">{item.text}</Text>
          </ScrollView>
        )}
      </Box>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView flex={1} backgroundColor="$backgroundLight50">
      {photos ? (
        <Box flex={1} pt={20} alignItems="center">
          <Carousel
            ref={carouselRef}
            sliderWidth={width}
            onSnapToItem={setActiveSlide}
            itemWidth={screenWidth}
            hasParallaxImages
            data={photos}
            firstItem={activeSlide}
            renderItem={renderItem}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width={screenWidth}
            borderRadius="$full"
            mt="$2"
            mb="$5"
            px="$5"
            backgroundColor="$white"
          >
            <Button onPress={goBack} size="xl" variant="link">
              <ButtonIcon color="$warmGray800" as={ChevronLeftIcon} />
            </Button>
            <Center>
              <Text verticalAlign="middle" fontWeight={600}>
                {months.find(
                  (month) => month.value === photos[activeSlide]?.month
                )?.long || "Рік"}
              </Text>
            </Center>
            <Button onPress={goForward} size="xl" variant="link">
              <ButtonIcon color="$warmGray800" as={ChevronRightIcon} />
            </Button>
          </Box>
        </Box>
      ) : (
        <EmptyScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexGrow: 0,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});
