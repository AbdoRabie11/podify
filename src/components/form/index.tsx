import React, {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik, FormikHelpers, useFormikContext} from 'formik';

interface Props<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
  children:ReactNode
}

const Form =  <T extends object> (props: Props<T>) => {
  
  return (

    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}>
      {props.children}
    </Formik>
  );
};

export default Form;


