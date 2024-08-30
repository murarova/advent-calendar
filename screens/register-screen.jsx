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
import {
  createProfile,
  createUserWithEmailAndPassword,
} from "../services/services";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigation();

  const registerAndGoToMainFlow = async () => {
    if (email && password) {
      try {
        const user = await createUserWithEmailAndPassword(email, password);
        if (user) {
          await createProfile(user.uid, name);
          nav.replace(SCREENS.HOME);
        }
      } catch (e) {
        Alert.alert("Oops", "Please check your form and try again");
      }
    }
  };

  const goToLogin = () => {
    nav.push(SCREENS.LOGIN);
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <Box p={20} pt={40}>
          <Box pb={10}>
            <Heading>Register</Heading>
          </Box>
          <Box flexDirection="row" alignItems="center" mb={30}>
            <Text mr={10}>Already have an account?</Text>
            <Button
              size="md"
              variant="link"
              action="primary"
              onPress={goToLogin}
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </Box>
          <Box>
            <VStack space="sm" mb={30}>
              <Text>Name</Text>
              <Input>
                <InputField
                  value={name}
                  onChangeText={setName}
                  inputMode="text"
                  placeholder="Name"
                />
              </Input>
            </VStack>
            <VStack space="sm" mb={30}>
              <Text>Email</Text>
              <Input>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  inputMode="text"
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
          <Button mb={30} size="md" onPress={registerAndGoToMainFlow}>
            <ButtonText>Register</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Pressable>
  );
};
