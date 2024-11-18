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
  InputIcon,
} from "@gluestack-ui/themed";
import { Alert, Keyboard } from "react-native";
import { SCREENS } from "../constants/constants";
import {
  createProfile,
  createUserWithEmailAndPassword,
} from "../services/services";
import { useTranslation } from "react-i18next";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { Loader } from "../components/common";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const nav = useNavigation();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleState = () => setShowPassword((prevState) => !prevState);

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError(t("screens.registerScreen.invalidEmail"));
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(t("screens.registerScreen.invalidPassword"));
    } else {
      setPasswordError("");
    }
  };

  const handleRegister = async () => {
    if (
      !emailError &&
      !passwordError &&
      !passwordMatchError &&
      email &&
      password &&
      repeatPassword
    ) {
      try {
        setIsLoading(true);
        const user = await createUserWithEmailAndPassword(email, password);
        setIsLoading(false);
        if (user) {
          await createProfile(user.uid, name);
          nav.replace(SCREENS.HOME);
        }
      } catch (e) {
        if (e.code == "auth/email-already-in-use") {
          Alert.alert("Oops", "Email already in use");
        } else {
          Alert.alert("Oops", "Please check your form and try again");
        }
        setIsLoading(false);
      }
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    validatePassword(value);
  };

  const handleRepeatPasswordChange = (value) => {
    setRepeatPassword(value);
    setPasswordMatchError(
      value !== password ? t("screens.registerScreen.passwordMatchError") : ""
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <Box p={20} pt={40}>
          <Box pb={10}>
            <Heading>{t("screens.registerScreen.title")}</Heading>
          </Box>
          <Box flexDirection="row" alignItems="center" mb={30}>
            <Text mr={10}>{t("screens.registerScreen.subtitle")}</Text>
            <Button
              size="md"
              variant="link"
              action="primary"
              onPress={() => nav.push(SCREENS.LOGIN)}
            >
              <ButtonText>{t("screens.registerScreen.loginBtn")}</ButtonText>
            </Button>
          </Box>
          <Box>
            <VStack space="sm" mb={20}>
              <Text>{t("screens.registerScreen.name")}</Text>
              <Input>
                <InputField
                  value={name}
                  onChangeText={setName}
                  inputMode="text"
                  placeholder={t("screens.registerScreen.name")}
                />
              </Input>
            </VStack>
            <VStack space="sm" mb={20}>
              <Text>{t("screens.registerScreen.email")}</Text>
              <Input>
                <InputField
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    validateEmail(value);
                  }}
                  autoCapitalize="none"
                  inputMode="text"
                  placeholder={t("screens.registerScreen.email")}
                />
              </Input>
              {emailError ? (
                <Text size="sm" color="$red500">
                  {emailError}
                </Text>
              ) : null}
            </VStack>
            <VStack space="sm" mb={10}>
              <Text>{t("screens.registerScreen.password")}</Text>
              <Input>
                <InputField
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChangeText={handlePasswordChange}
                  placeholder={t("screens.registerScreen.password")}
                />
                <InputSlot pr="$3" onPress={handleState}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
              {passwordError ? (
                <Text size="sm" color="$red500">
                  {passwordError}
                </Text>
              ) : null}
            </VStack>
            <VStack space="sm" mb={30}>
              <Text>{t("screens.registerScreen.repeatPassword")}</Text>
              <Input>
                <InputField
                  value={repeatPassword}
                  type={showPassword ? "text" : "password"}
                  onChangeText={handleRepeatPasswordChange}
                  placeholder={t("screens.registerScreen.repeatPassword")}
                />
              </Input>
              {passwordMatchError ? (
                <Text size="sm" color="$red500">
                  {passwordMatchError}
                </Text>
              ) : null}
            </VStack>
          </Box>
          <Button
            mb={30}
            size="md"
            onPress={handleRegister}
            isDisabled={
              !email ||
              !password ||
              !!emailError ||
              !!passwordError ||
              !!passwordMatchError
            }
          >
            <ButtonText>{t("screens.registerScreen.okBtn")}</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Pressable>
  );
};
