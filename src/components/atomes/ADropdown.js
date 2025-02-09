import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import AIcon from './AIcon';

const ADropdown = ({ 
  label, 
  data, 
  selectedValue, 
  onValueChange, 
  placeholder, 
  dropdownStyle, 
  itemStyle,
  IconProps ,
  colorText,
  fontSize,
  fontWeight
}) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleItemPress = (item) => {
    onValueChange(item);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.dropdown, dropdownStyle]} onPress={toggleModal}>
        <View>
            <Text style={[styles.dropdownText, { color: colorText }, fontSize, fontWeight]}>
            {selectedValue ? selectedValue : placeholder}
            </Text>
        </View>
        <View style={styles.icon}>
            <AIcon {...IconProps} style={styles.icon}/> 
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.item, itemStyle]} onPress={() => handleItemPress(item.value)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 2,
    borderRadius: 5,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 20,
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: '#000',
  },
  icon: {
    marginLeft: '20px',
    marginRight: 20,
  }
});

export default ADropdown;
