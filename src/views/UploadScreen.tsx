import CateogrySelector from '@components/CateogrySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {categories} from '@utils/categories';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {Pressable, ScrollView, Text, TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import client from 'src/api/client';
import * as yup from 'yup';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined,
};

const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is missing!'),
  category: yup.string().oneOf(categories, 'Category is missing!'),
  about: yup.string().trim().required('About is missing!'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing!'),
    name: yup.string().required('Audio file is missing!'),
    type: yup.string().required('Audio file is missing!'),
    size: yup.number().required('Audio file is missing!'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

interface Props {}

const UploadScreen: FC<Props> = props => {
  const [showModal, setShowModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});
  var timestamp = Math.round(new Date().getTime() / 1000);




  const handleUpload = async () => {
    try {
      const finalData = await audioInfoSchema.validate(audioInfo);

      const formData = new FormData();

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });

      if (finalData.poster.uri)
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        console.log('=========token===========================');
        console.log(token);
        console.log('====================================');
       
        
      const {data} = await client.post('/audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data;',
        },
      });
      console.log(data);
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        console.log('validatain error', error);
      } else console.log(error.response.data);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <FileSelector
          icon={
            <MaterialComIcon
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
          options={{type: [types.images]}}
          onSelect={file => {
            setAudioInfo({...audioInfo, file});
          }}
        />
        <FileSelector
          icon={
            <MaterialComIcon
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
          options={{type: [types.audio]}}
          onSelect={poster => {
            setAudioInfo({...audioInfo, poster});
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          style={styles.input}
          onChangeText={text => {
            setAudioInfo({...audioInfo, title: text});
          }}
        />

        <Pressable
          onPress={() => {
            setShowModal(true);
          }}
          style={styles.categorySelector}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          style={styles.input}
          multiline
          numberOfLines={10}
          onChangeText={text => {
            setAudioInfo({...audioInfo, about: text});
          }}
        />
        <CateogrySelector
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
          title="category"
          data={categories}
          renderItem={(item: any) => {
            return <Text style={styles.category}> {item} </Text>;
          }}
          onSelect={item => {
            setAudioInfo({...audioInfo, category: item});
          }}
        />
        <View style={{marginBottom: 20}} />
        <AppButton title="Submit" borderRadius={7} onPress={handleUpload} />
      </View>
    </ScrollView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
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
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});
