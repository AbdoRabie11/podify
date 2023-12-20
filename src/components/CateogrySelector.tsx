import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {number} from 'yup';

interface Props<T> {
  data: any[];
  visible?: boolean;
  title?: string;
  renderItem(item: T): JSX.Element;
  onSelect(item:T, index:number):void
  onRequestClose?():void
}

const CateogrySelector = <T extends any>({
  data,
  visible = false,
  title,
  renderItem,
  onSelect,
  onRequestClose
}: Props<T>) => {
  const [selelctedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleSubmit = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item,index)
    onRequestClose  && onRequestClose()
  };

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={styles.modalContainer}>
      <Pressable style={styles.backDrop}  />
        <View style={styles.modal}>
          <Text style={styles.title}> {title} </Text>
          <ScrollView>
            {data.map((item, index) => {
              return (
                <Pressable
                  onPress={() => handleSubmit(item, index)}
                  key={index}
                  style={styles.selectorContainer}>
                  {selelctedIndex == index ? (
                    <MaterialComIcon
                      name="radiobox-marked"
                      color={colors.SECONDARY}
                    />
                  ) : (
                    <MaterialComIcon
                      name="radiobox-blank"
                      color={colors.SECONDARY}
                    />
                  )}
                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CateogrySelector;

const styles = StyleSheet.create({
  container: {},
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparet',
    zIndex: 1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
