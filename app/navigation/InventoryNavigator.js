import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InventoryScreen from "../screens/InventoryScreen";
import InventoryDetailScreen from "../screens/InventoryDetailScreen";
import routes from "./routes";
import colors from "../config/colors";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import VehicleDescriptionScreen from "../screens/VehicleDescriptionScreen";

const Stack = createStackNavigator();

const InventoryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerTitleStyle: { marginHorizontal: 10 },
      headerBackImage: () => (
        <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          color={colors.primary}
          style={{ paddingHorizontal: 10 }}
        />
      ),
    }}
  >
    <Stack.Screen
      name={routes.INVENTORY}
      component={InventoryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.INVENTORY_DETAIL}
      component={InventoryDetailScreen}
      options={({ route }) => ({
        headerTitle: route.params.title
          ? route.params.title
          : route.params.make + " " + route.params.model,
      })}
    />
    <Stack.Screen
      name={routes.VEHICLE_DETAIL}
      component={VehicleDetailScreen}
    />
    <Stack.Screen
      name={routes.VEHICLE_DESCRIPTION}
      component={VehicleDescriptionScreen}
    />
  </Stack.Navigator>
);

export default InventoryNavigator;