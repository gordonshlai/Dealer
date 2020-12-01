import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

import useAuth from "../auth/useAuth";

function AccountScreen(props) {
  const { authToken, logOut } = useAuth();
  return (
    <View style={styles.container}>
      <AppButton
        title="Log Out"
        onPress={() => {
          logOut();
          console.log("logout");
        }}
      ></AppButton>
      <AppText>Account</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AccountScreen;
