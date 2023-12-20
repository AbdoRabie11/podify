import colors from '@utils/colors';
import React, {FC, ReactNode} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';

interface Props {
  icon: ReactNode;
  btnTitle: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions<SupportedPlatforms>;
}

const FileSelector: FC<Props> = ({
  icon,
  btnTitle,
  style,
  onSelect,
  options,
}) => {
  const handelDocumentSubmit = async () => {
    try {
      const document = await DocumentPicker.pick(options);
      const file = document[0];
      onSelect(file);
      // [{"fileCopyUri": null, "name": "soap-8429699_640.JPG", "size": 26106, "type": "image/jpeg", "uri": "file:///Users/adamromano/Library/Developer/CoreSimulator/Devices/CEA786E1-8753-4B5E-B3F8-3C9317955B00/data/Containers/Data/Application/360E2794-A15E-41AE-B8B7-0699F6E682DF/tmp/org.reactjs.native.example.podifyPlayer-Inbox/soap-8429699_640.JPG"}]
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Pressable
      onPress={handelDocumentSubmit}
      style={[styles.btnContainer, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.btnTitle}> {btnTitle} </Text>
    </Pressable>
  );
};

export default FileSelector;

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    margin: 5,
  },
});
