/** @format */

import { Formik } from "formik";
import React from "react";
import { StyleSheet,  View } from "react-native";

const Appformik = ({ schema, initialvalues, submit, children }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialvalues}
      onSubmit={submit}
    >
      {() => <View>{children}</View>}
    </Formik>
  );
};

export default Appformik;

const styles = StyleSheet.create({});
