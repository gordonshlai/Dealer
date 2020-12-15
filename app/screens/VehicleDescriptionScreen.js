import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import Info from "../components/Info";
import {
  AppErrorMessage,
  AppFormDateTimePicker,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import client from "../api/client";
import { Formik } from "formik";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  sales_status: Yup.string().required().label("Sales Status"),
  tagline: Yup.string().label("Tagline"),
  retail_price: Yup.string().required().label("Retail Sale Price"),
  price_asking: Yup.string().label("Trade Sale Price"),
  price_civ: Yup.string().label("Stand Sale Price"),
  price_cap: Yup.string().label("Guide Sale Price"),
  description: Yup.string().label("Description"),
});

const sales_statusArray = ["In Stock", "Sold", "Listed For Trade"];

function VehicleDescriptionScreen({ navigation, route }) {
  const { vehicleDetailInput, vehicleDetail } = route.params;

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const inventoryApi = useApi((data, onUploadProgress) =>
    client.post("api/inventory/vehicles", data, {
      onUploadProgress: (progress) => {
        onUploadProgress(progress.loaded / progress.total);
      },
    })
  );

  const [error, setError] = useState();

  const handleSubmit = async (vehicleDescriptionInput) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await inventoryApi.request(
      {
        make: vehicleDetailInput.make,
        model: vehicleDetailInput.model,
        registration_date: vehicleDetailInput.registration_date,
        engine_capacity: vehicleDetailInput.engine_capacity,
        retail_price: vehicleDescriptionInput.retail_price,
        registration: vehicleDetailInput.registration,
        year: vehicleDetailInput.year,
        mileage: vehicleDetailInput.mileage,
        colour: vehicleDetailInput.colour,
        body_style: vehicleDetailInput.body_style,
        fuel: vehicleDetailInput.fuel,
        transmission: vehicleDetailInput.transmission,
        title: vehicleDescriptionInput.title,
        seats: vehicleDetailInput.seats,
        doors: vehicleDetailInput.doors,
        tagline: vehicleDescriptionInput.tagline,
        description: vehicleDescriptionInput.description,
        price_asking: vehicleDescriptionInput.price_asking
          ? vehicleDescriptionInput.price_asking
          : "0.00",
        price_civ: vehicleDescriptionInput.price_civ
          ? vehicleDescriptionInput.price_civ
          : "0.00",
        price_cap: vehicleDescriptionInput.price_cap
          ? vehicleDescriptionInput.price_cap
          : "0.00",
        sales_status: vehicleDescriptionInput.sales_status,
        mot_expiry: vehicleDetailInput.mot_expiry,
      },
      (progress) => setProgress(progress)
    );
    console.log(result);
    if (!result.ok) return setError(result.data.message);
    console.log("posted!");
  };
  return (
    <>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 100}
      >
        <ScrollView>
          <View style={styles.screen}>
            <Formik
              initialValues={{
                title:
                  vehicleDetail && vehicleDetail.title
                    ? vehicleDetail.title
                    : "",
                sales_status:
                  vehicleDetail && vehicleDetail.sales_status
                    ? vehicleDetail.sales_status
                    : "In Stock",
                tagline: "",
                retail_price: "",
                price_asking: "",
                price_civ: "",
                price_cap:
                  vehicleDetail && vehicleDetail.price_cap
                    ? vehicleDetail.price_cap
                    : "",
                description: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors }) => (
                <>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="alpha-t-circle"
                      text="Title"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="title"
                      placeholder="Title"
                      multiline={true}
                      textAlignVertical="top"
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="alpha-s-circle"
                      text="Sale Status"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormPicker
                      name="sales_status"
                      placeholder="Please select"
                      items={sales_statusArray}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="tag"
                      text="Tagline"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="tagline"
                      placeholder="Tagline"
                      multiline={true}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="currency-gbp"
                      text="Retail Sale Price"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="retail_price"
                      placeholder="Retail Sale Price"
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="currency-gbp"
                      text="Trade Sale Price"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="price_asking"
                      placeholder="Trade Sale Price"
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="currency-gbp"
                      text="Stand Sale Price"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="price_civ"
                      placeholder="Stand Sale Price"
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="currency-gbp"
                      text="Guide Sale Price"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="price_cap"
                      placeholder="Guide Sale Price"
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Info
                      name="card-text"
                      text="Description"
                      color={defaultStyles.colors.mediumGrey}
                    />
                    <AppFormField
                      name="description"
                      placeholder="Description"
                      multiline={true}
                    />
                  </View>
                  <AppErrorMessage
                    error="Please fix the errors above before moving on."
                    visible={
                      !(
                        Object.keys(errors).length === 0 &&
                        errors.constructor === Object
                      )
                    }
                  />
                  <AppErrorMessage error={error} visible={error} />
                  <SubmitButton
                    icon="check"
                    color={defaultStyles.colors.success}
                    title="Save"
                  />
                </>
              )}
            </Formik>
            <AppButton
              icon="arrow-left"
              title="back"
              color={defaultStyles.colors.secondary}
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
});

export default VehicleDescriptionScreen;
