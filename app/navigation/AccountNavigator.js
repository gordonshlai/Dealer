import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import routes from "./routes";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Menu from "../components/Menu";
import PaymentCardsScreen from "../screens/account/PaymentCardsScreen";
import NewCardScreen from "../screens/account/NewCardScreen";
import MarginScreen from "../screens/account/MarginScreen";
import UsersScreen from "../screens/account/UsersScreen";
import NewUserScreen from "../screens/account/NewUserScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerTitleStyle: {
        marginHorizontal: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      headerStyle: {
        backgroundColor: colors.secondary,
        shadowColor: "transparent",
        elevation: 0,
      },
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerBackImage: () => (
        <MaterialCommunityIcons
          name="chevron-left"
          size={32}
          color={colors.primary}
          style={{ paddingHorizontal: 10 }}
        />
      ),
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{ title: null }}
    />
    <Stack.Screen name={routes.PAYMENT_CARDS} component={PaymentCardsScreen} />
    <Stack.Screen name={routes.NEW_CARD} component={NewCardScreen} />
    <Stack.Screen name={routes.MARGIN} component={MarginScreen} />
    <Stack.Screen name={routes.USERS} component={UsersScreen} />
    <Stack.Screen name={routes.NEW_USER} component={NewUserScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
