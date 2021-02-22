import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

// import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import {
  AppErrorMessage,
  AppInfoMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import client from "../api/client";

import colors from "../config/colors";
import routes from "../navigation/routes";

/**
 * The login screen, allowing user to input their login details and handling the
 * login operation based on the user input.
 * @module screens/ResetPasswordScreen
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

/**
 * The reset password screen functional component
 */
const ResetPasswordScreen = ({ navigation }) => {
  // const loginApi = useApi(authApi.login);
  // const { logIn } = useAuth();
  const [error, setError] = useState();
  const [info, setInfo] = useState();

  /**
   * Handles the submit operation
   * @param {string} email - the user input in the email field
   */
  // const handleSubmit = async ({ email, password }) => {
  //   const result = await loginApi.request(email, password);
  //   if (!result.ok) return setError(result.data);
  //   logIn(result.data);
  // };
  const endpoint = "auth/reset";
  const resetPasswordApi = useApi(({ email }) =>
    client.post(endpoint, { email })
  );

  const handleSubmit = async ({ email }) => {
    const result = await resetPasswordApi.request({ email });
    if (!result.ok) {
      setError(result.data.message);
      setInfo(null);
      return;
    }
    setError(null);
    setInfo(result.data.message);
  };

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      ></LinearGradient>

      <ActivityIndicator visible={resetPasswordApi.loading} />
      <View style={styles.container}>
        <Screen style={styles.screen}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              />
              <AppForm
                initialValues={{ email: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppErrorMessage error={error} visible={error} />
                <AppInfoMessage info={info} visible={info} />
                <View style={styles.formFieldContainer}>
                  <AppText style={styles.fieldName}>Email</AppText>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    name="email"
                    placeholder="Type Your Email"
                    textContentType="emailAddress"
                  />
                </View>

                <SubmitButton title="Send Password Reset" />
                <AppButton
                  title="Back"
                  backgroundColor={null}
                  onPress={() => navigation.goBack()}
                />
              </AppForm>
            </ScrollView>
          </KeyboardAvoidingView>
        </Screen>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  screen: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 226,
    height: 80,
    alignSelf: "center",
    marginVertical: 30,
  },
  formFieldContainer: {
    marginVertical: 15,
  },
  fieldName: {
    color: colors.lightGrey,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
