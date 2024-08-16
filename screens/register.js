import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const nav = useNavigation();

  const createProfile = async (response) => {
    db().ref(`/users/${response.user.uid}`).set({ name });
  };
  const registerAndGoToMainFlow = async () => {
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        console.log("response", response);

        if (response.user) {
          await createProfile(response);
          nav.replace(SCREENS.PERIOD_OVERVIEW);
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
                  isRequired
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
                  isRequired
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
                  isRequired
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
            onPress={registerAndGoToMainFlow}
          >
            <ButtonText>Register</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Pressable>
    // <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
    //   <SafeAreaView style={styles.contentView}>
    //     <View style={styles.container}>
    //       <View style={styles.titleContainer}>
    //         <Text style={styles.titleText}>Register</Text>
    //       </View>
    //       <View style={styles.mainContent}>
    //         <TextInput
    //           style={styles.loginTextField}
    //           placeholder="Name"
    //           value={name}
    //           onChangeText={setName}
    //         />
    //         <TextInput
    //           style={styles.loginTextField}
    //           placeholder="Email"
    //           value={email}
    //           onChangeText={setEmail}
    //           inputMode="email"
    //           autoCapitalize="none"
    //         />
    //         <TextInput
    //           style={styles.loginTextField}
    //           placeholder="Password"
    //           value={password}
    //           onChangeText={setPassword}
    //           secureTextEntry
    //         />
    //       </View>
    //       <Button
    //         title="Sign Up"
    //         onPress={registerAndGoToMainFlow}
    //         variant="primary"
    //       />
    //       <Button title="Go Back" onPress={nav.goBack} variant="secondary" />
    //     </View>
    //   </SafeAreaView>
    // </Pressable>
  );
};
