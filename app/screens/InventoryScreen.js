import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Modal } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppButton from "../components/AppButton";
import Loading from "../components/Loading";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Picker from "../components/Picker";

import client from "../api/client";
import useApi from "../hooks/useApi";

import colors from "../config/colors";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import useDidMountEffect from "../hooks/useDidMountEffect";
import { TouchableHighlight } from "react-native";
import OptionButton from "../components/OptionButton";

const statusArray = ["stock", "listed", "sold"];

function InventoryScreen({ navigation }) {
  const { loadInventoryFlag } = useContext(AuthContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [makesArray, setMakesArray] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [make, setMake] = useState("all");
  const [status, setStatus] = useState(statusArray[0]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState("");

  const [serachBarVisible, setSearchBarVisible] = useState(false);

  // const [filterModalVisible, setFilterModalVisible] = useState(false);
  // const [filter, setFilter] = useState({
  //   status: status,
  //   make: make,
  // });

  let endpoint =
    "api/inventory/vehicles?make=" +
    make +
    "&status=" +
    status +
    "&page=" +
    pageCurrent +
    "&search=" +
    search;
  const getVehiclesApi = useApi(() => client.get(endpoint));

  useEffect(() => {
    getData();
    getMakes();
  }, [reload]);

  useDidMountEffect(() => {
    handleRefresh();
  }, [loadInventoryFlag]);

  const getData = async () => {
    const result = await getVehiclesApi.request();
    console.log(endpoint);
    if (!result.ok) return;
    const newVehicles = result.data.data;
    const newVehiclesArray = parseObjectToArray(newVehicles);
    setVehicles([...vehicles, ...newVehiclesArray]);
  };

  const getMakes = async () => {
    const result = await client.get("api/inventory/makes");
    if (!result.ok) return;
    const makes = result.data;
    const makesArray = parseObjectToArray(makes);
    setMakesArray(["all", ...makesArray]);
  };

  const handleRefresh = () => {
    setVehicles([]);
    setPageCurrent(1);
    setReload(!reload);
  };

  const parseObjectToArray = (obj) => {
    let arr = [];
    for (let x in obj) {
      arr.push(obj[x]);
    }
    return arr;
  };

  let searchCheck;
  const handleSearch = (text) => {
    searchCheck = text;
    setTimeout(() => {
      if (searchCheck == text) {
        setSearch(text);
        handleRefresh();
      }
    }, 500);
  };

  // const applyFilter = () => {
  //   setFilterModalVisible(false);
  //   if (filter.status === status && filter.make === make) return;
  //   setStatus(filter.status);
  //   setMake(filter.make);
  //   handleRefresh();
  // };

  const handleLazyLoading = async () => {
    if (!getVehiclesApi.loading && getVehiclesApi.data.next_page_url) {
      setPageCurrent(pageCurrent + 1);
      setReload(!reload);
    }
  };

  return (
    <>
      {getVehiclesApi.error ? (
        <Screen style={[styles.screen, { paddingBottom: tabBarHeight / 2 }]}>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve the vehicles.
          </AppText>
          <AppButton title="RETRY" onPress={handleRefresh} />
        </Screen>
      ) : (
        <>
          <View style={styles.vehicleStatusContainer}>
            <TouchableHighlight
              style={[
                styles.vehicleStatusTextContainer,
                {
                  borderBottomColor:
                    status === "stock" ? colors.primary : "transparent",
                },
              ]}
              onPress={() => {
                setStatus("stock");
                handleRefresh();
              }}
            >
              <AppText
                style={[
                  styles.vehicleStatusText,
                  {
                    color:
                      status === "stock" ? colors.primary : colors.mediumGrey,
                  },
                ]}
              >
                In Stock
              </AppText>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.vehicleStatusTextContainer,
                {
                  borderBottomColor:
                    status === "listed" ? colors.primary : "transparent",
                },
              ]}
              onPress={() => {
                setStatus("listed");
                handleRefresh();
              }}
            >
              <AppText
                style={[
                  styles.vehicleStatusText,
                  {
                    color:
                      status === "listed" ? colors.primary : colors.mediumGrey,
                  },
                ]}
              >
                Trade Listed
              </AppText>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.vehicleStatusTextContainer,
                {
                  borderBottomColor:
                    status === "sold" ? colors.primary : "transparent",
                },
              ]}
              onPress={() => {
                setStatus("sold");
                handleRefresh();
              }}
            >
              <AppText
                style={[
                  styles.vehicleStatusText,
                  {
                    color:
                      status === "sold" ? colors.primary : colors.mediumGrey,
                  },
                ]}
              >
                Sold
              </AppText>
            </TouchableHighlight>
          </View>
          <Screen style={[styles.screen, { paddingBottom: tabBarHeight / 2 }]}>
            <View style={styles.optionBar}>
              {/* <AppButton
                title="Filter"
                backgroundColor={null}
                color={colors.primary}
                border={false}
                icon="filter-variant"
                size={16}
                badge={status !== statusArray[0] || make !== "all"}
                onPress={() => setFilterModalVisible(true)}
              /> */}
              <OptionButton
                title={make.toUpperCase()}
                backgroundColor={null}
                color={colors.primary}
                border={false}
                icon="car"
                size={16}
                initialValue="all"
                value={make}
                queryArray={makesArray}
                displayArray={makesArray}
                setValue={setMake}
                handleRefresh={handleRefresh}
              />
              <AppButton
                icon={serachBarVisible ? "magnify-close" : "magnify"}
                backgroundColor={null}
                color={colors.primary}
                border={false}
                size={20}
                badge={search !== ""}
                onPress={() => setSearchBarVisible(!serachBarVisible)}
              />
            </View>
            <View
              style={
                serachBarVisible ? { opacity: 1 } : { height: 0, opacity: 0 }
              }
            >
              <AppTextInput
                icon="magnify"
                placeholder="Enter Your Registration"
                style={{ backgroundColor: "white" }}
                onChangeText={handleSearch}
              />
            </View>
            {vehicles.length === 0 && !getVehiclesApi.loading && (
              <AppText style={styles.noMatchingVehicles}>
                No matching vehicles
              </AppText>
            )}
            <FlatList
              data={vehicles}
              keyExtractor={(vehicle) => vehicle.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  make={item.make}
                  model={item.model}
                  year={item.year}
                  mileage={item.mileage}
                  engineCapacity={item.engine_capacity}
                  priceAsking={item.price_asking}
                  registration={item.registration}
                  imageUrl={item.thumb ? item.thumb.url : ""}
                  onPress={() =>
                    navigation.navigate(routes.INVENTORY_DETAIL, item)
                  }
                />
              )}
              numColumns={2}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={handleLazyLoading}
              onEndReachedThreshold={0.1}
              ListFooterComponent={<Loading visible={getVehiclesApi.loading} />}
            />
          </Screen>
        </>
      )}
      {/* <Modal visible={filterModalVisible} animationType="slide">
        <Screen style={styles.modal}>
          <AppText style={styles.modalTitle}>Filter</AppText>
          <AppText>Status</AppText>
          <ButtonGroup
            buttonStyle={{ paddingHorizontal: 10 }}
            buttonContainerStyle={{}}
            buttons={["In stock", "Trade Listed", "Sold"]}
            containerStyle={{ height: 50, marginBottom: 30 }}
            onPress={(statusIndex) =>
              setFilter({
                status: statusArray[statusIndex],
                make: filter.make,
              })
            }
            selectedButtonStyle={{
              backgroundColor: colors.secondary,
            }}
            selectedIndex={statusArray.indexOf(filter.status)}
            textStyle={{
              fontSize: 16,
              color: colors.secondary,
              textAlign: "center",
            }}
          />
          <AppText>Vehicle Make</AppText>
          <Picker
            icon="car-side"
            items={makesArray}
            onSelectItem={(make) => {
              setFilter({
                status: filter.status,
                make: make.toLowerCase(),
              });
            }}
            selectedItem={filter.make.toUpperCase()}
          />
          <AppButton icon="check" title="APPLY FILTER" onPress={applyFilter} />
        </Screen>
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  vehicleStatusContainer: {
    flexDirection: "row",
  },
  vehicleStatusTextContainer: {
    flex: 1,
    borderBottomWidth: 3,
  },
  vehicleStatusText: {
    backgroundColor: colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  optionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchBarContainer: {
    marginBottom: 10,
  },
  noMatchingVehicles: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.primary,
    paddingTop: 20,
  },
  // modal: {
  //   padding: 20,
  //   backgroundColor: colors.white,
  // },
  // modalTitle: {
  //   alignSelf: "center",
  //   color: colors.primary,
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  // },
});

export default InventoryScreen;
