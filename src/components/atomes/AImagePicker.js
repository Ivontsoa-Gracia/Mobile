import React, { useState } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AButton from './AButton';

const AImagePicker = ({ onImageChange, ButtonProps }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission d'accès à la galerie requise.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      const name = result.uri.split('/').pop(); 
      setImageName(name);
      onImageChange(result.uri); 
    }
  };

  return (
    <View style={styles.container}>
    <AButton 
        title="Parcourir" 
        onPress={pickImage}
        {...ButtonProps}
    />

      {/* <Button title="Parcourir" onPress={pickImage} /> */}
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Text>Nom de l'image : {imageName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePreview: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default AImagePicker;
