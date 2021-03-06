import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../../../components/AppText";

import colors from "../../../config/colors";

/**
 * The floating green message used to prompt the user after an API call.
 *
 * @param {string} meesage The message to show after the API call.
 */
function Message({ message }) {
  return message ? (
    <View style={styles.container}>
      <AppText style={styles.message}>{message}</AppText>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.success + "ee",
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 1,
  },
  message: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});

export default Message;
