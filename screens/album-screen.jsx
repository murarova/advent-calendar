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
} from "@gluestack-ui/themed";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { months } from "../constants/constants";

const { width: screenWidth } = Dimensions.get("window");

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
        const photos = mapDataToCarousel(data);
        setPhotos(photos);
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

  const renderItem = ({ item }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.image.uri }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <ScrollView style={styles.text} maxHeight="40%">
          <Text>{item.text}</Text>
        </ScrollView>
      </View>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {photos ? (
        <View style={styles.container}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            onSnapToItem={setActiveSlide}
            itemWidth={screenWidth - 60}
            hasParallaxImages
            data={photos}
            firstItem={activeSlide}
            renderItem={renderItem}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width={screenWidth - 60}
            borderRadius="$full"
            mt="$2"
            mb="$5"
            px="$5"
            backgroundColor="$primary50"
          >
            <Button onPress={goBack} size="xl" variant="link">
              <ButtonIcon color="$warmGray800" as={ChevronLeftIcon} />
            </Button>
            <Center>
              <Text style={styles.title}>
                {
                  months.find(
                    (month) => month.value === photos[activeSlide].month
                  )?.long
                }
              </Text>
            </Center>
            <Button onPress={goForward} size="xl" variant="link">
              <ButtonIcon color="$warmGray800" as={ChevronRightIcon} />
            </Button>
          </Box>
        </View>
      ) : (
        <EmptyScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pagination: {
    display: "flex",
    justifyContent: "flex-start",
    width: screenWidth - 60,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  text: {
    marginTop: 20,
  },
  title: {
    verticalAlign: "middle",
    fontWeight: "600",
  },
  item: {
    flex: 1,
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
