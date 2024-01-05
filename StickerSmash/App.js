import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';

const PlaceholderImage = require ('./assets/images/background-image.png');

export default function App() {
  const[showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onReset = ()=> {
    setShowAppOptions(false);
  };

  const onAddSticker = ()=> {
    //later
  };

  const onSaveImageAsync = async ()=>{
    //later
  };

  const pickImageAsync = async ()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage (result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style = {styles.imageContainer}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style = {styles.optionsRow}>
          <IconButton icon='refresh' label='Reset' onPress={onReset}/>
          <CircleButton onPress={onAddSticker} />
          <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
      <View style= {styles.footercontainer}>
        <Button theme="primary" label='Choose a Photo' /*@info*/ onPress={pickImageAsync} /*@end*//>
        <Button label='Use this photo'/>
      </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  footercontainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
