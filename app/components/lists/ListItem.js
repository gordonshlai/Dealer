import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";
import colors from "../../config/colors";

/**
 *
 * An itme that is presssable and can be swipe to both sides to render some actions,
 * containing an icon, a title, a subtitle, a saved badge, an archive badge, a timestamp, and a unread badge.
 *
 * @param {binary} image - the image to show as an icon
 * @param {component} IconComponent - the component to show as an icon
 * @param {string} title - the title of the list item
 * @param {boolean} saved - boolean to determine for showing the saved icon
 * @param {boolean} archived - boolean to determine for showing the archived icon
 * @param {datetime} time - the timestamp of the list item
 * @param {string} subTitle - the subtitle of the list item
 * @param {boolean} unread - boolean to determine whether the list item is read
 * @param {component} onPress - function to be called when the list item is pressed on
 * @param {function} renderRightActions - component to render when the list item is swipe to the right
 * @param {function} renderLeftActions - component to render when the list item is swipe to the left
 */
function ListItem({
  image,
  IconComponent,
  title,
  saved,
  archived,
  time,
  subTitle,
  unread,
  onPress,
  renderRightActions,
  renderLeftActions,
}) {
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <TouchableHighlight underlayColor={colors.mediumGrey} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <View style={styles.row}>
              {title && (
                <View style={{ width: "50%" }}>
                  <AppText style={styles.title} numberOfLines={2}>
                    {title}
                  </AppText>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  {saved && (
                    <MaterialCommunityIcons
                      name="content-save"
                      color={colors.primary}
                      size={20}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                  {archived && (
                    <MaterialCommunityIcons
                      name="archive"
                      size={20}
                      color={colors.danger}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </View>
                {time && (
                  <AppText
                    style={[
                      styles.time,
                      unread
                        ? { color: colors.primary, fontWeight: "bold" }
                        : { color: colors.mediumGrey },
                    ]}
                  >
                    {time}
                  </AppText>
                )}
              </View>
            </View>
            <View style={styles.row}>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={1}>
                  {subTitle}
                </AppText>
              )}
              {unread && (
                <View style={styles.unreadBadge}>
                  <AppText style={styles.unreadText}>{unread}</AppText>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 2,
  },
  time: {
    fontSize: 12,
  },
  subTitle: {
    color: colors.mediumGrey,
    flex: 1,
  },
  unreadBadge: {
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginLeft: 10,
    justifyContent: "center",
    flex: 0,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ListItem;
