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
} from "@gluestack-ui/themed";
import { Alert, Keyboard } from "react-native";
import { SCREENS } from "../constants/constants";
import { signInWithEmailAndPassword } from "../services/services";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigation();

  const goToRegistration = () => {
    nav.push(SCREENS.REGISTER);
  };

  const goToMainFlow = async () => {
    if (email && password) {
      try {
        const user = await signInWithEmailAndPassword(email, password);
        if (user) {
          nav.replace(SCREENS.HOME);
        }
      } catch (e) {
        Alert.alert("Oops", "Please check your form and try again");
      }
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <Box p={20} pt={40}>
          <Box pb={10}>
            <Heading>Login to your account</Heading>
          </Box>
          <Box flexDirection="row" alignItems="center" mb={30}>
            <Text mr={10}>Don't have an account?</Text>
            <Button
              size="md"
              variant="link"
              action="primary"
              onPress={goToRegistration}
            >
              <ButtonText>Sign Up</ButtonText>
            </Button>
          </Box>
          <Box>
            <VStack space="sm" mb={30}>
              <Text>Email</Text>
              <Input>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  inputMode="email"
                  placeholder="Email"
                />
              </Input>
            </VStack>
            <VStack space="sm" mb={30}>
              <Text>Password</Text>
              <Input>
                <InputField
                  value={password}
                  onChangeText={setPassword}
                  type="password"
                  placeholder="Password"
                />
              </Input>
            </VStack>
          </Box>
          <Button
            mb={30}
            size="md"
            variant="primary"
            action="primary"
            onPress={goToMainFlow}
          >
            <ButtonText>Login</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Pressable>
  );
};
