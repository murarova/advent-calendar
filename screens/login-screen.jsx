// @ts-nocheck
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Box,
  ButtonText,
  Heading,
  Input,
  InputField,
  Pressable,
  SafeAreaView,
  Text,
  VStack,
  Button,
  InputSlot,
} from "@gluestack-ui/themed";
import { Alert, Keyboard } from "react-native";
import { SCREENS } from "../constants/constants";
import { signInWithEmailAndPassword } from "../services/services";
import { useTranslation } from "react-i18next";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { InputIcon } from "@gluestack-ui/themed";
import { Loader } from "../components/common";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const nav = useNavigation();

  const goToRegistration = () => {
    nav.push(SCREENS.REGISTER);
  };
  const handleState = () => setShowPassword((prevState) => !prevState);

  const goToMainFlow = async () => {
    if (email && password) {
      try {
        setIsLoading(true);
        const user = await signInWithEmailAndPassword(email, password);
        setIsLoading(false);
        if (user) {
          nav.replace(SCREENS.HOME);
        }
      } catch (e) {
        Alert.alert(
          t("screens.loginScreen.errorTitle"),
          t("screens.loginScreen.errorMessage")
        );
      }
    } else {
      Alert.alert(
        t("screens.loginScreen.errorTitle"),
        t("screens.loginScreen.emptyFieldsMessage")
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <Box p={20} pt={40}>
          <Box pb={10}>
            <Heading>{t("screens.loginScreen.title")}</Heading>
          </Box>
          <Box flexDirection="column" alignItems="flex-start" mt={20} mb={30}>
            <Text mr={10}>{t("screens.loginScreen.noAccount")}</Text>
            <Button
              size="md"
              variant="link"
              action="primary"
              onPress={goToRegistration}
            >
              <ButtonText>{t("screens.loginScreen.signUpButton")}</ButtonText>
            </Button>
          </Box>
          <Box>
            <VStack space="sm" mb={30}>
              <Text>{t("screens.loginScreen.email")}</Text>
              <Input>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  inputMode="email"
                  placeholder={t("screens.loginScreen.emailPlaceholder")}
                />
              </Input>
            </VStack>
            <VStack space="sm" mb={30}>
              <Text>{t("screens.loginScreen.password")}</Text>
              <Input>
                <InputField
                  value={password}
                  onChangeText={setPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("screens.loginScreen.passwordPlaceholder")}
                />
                <InputSlot pr="$3" onPress={handleState}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </VStack>
          </Box>
          <Button
            mb={30}
            size="md"
            variant="primary"
            action="primary"
            isDisabled={!email || !password}
            onPress={goToMainFlow}
          >
            <ButtonText>{t("screens.loginScreen.loginButton")}</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Pressable>
  );
};
