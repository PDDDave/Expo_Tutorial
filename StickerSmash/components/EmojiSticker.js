import { View, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

    

export default function EmojiSticker({ imageSize, stickerSource }) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(()=>{
        if (scaleImage.value !== imageSize * 2) {
            scaleImage.value = scaleImage.value *2;
        }
        else{
            scaleImage.value = scaleImage.value /2;
        }
    });

    const drag = Gesture.Pan().onChange((event)=> {
        if(translateX.value >= 0 && translateX.value <= 280){
            translateX.value += event.changeX;
        }
        else if(translateX.value < 0){
            translateX.value = 0;
        }
        else if (translateX.value > 280){
            translateX.value = 280;
        }
            
        if(translateY.value >= -94 && translateY.value <= 300){
            translateY.value += event.changeY;
        }
        else if(translateY.value <-94){
            translateY.value = -94;
        }
        else if (translateY.value > 300){
            translateY.value = 300;
        }
        
        translateY.value += event.changeY;
    }); 


    const imageStyle = useAnimatedStyle(()=>{
        return{
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    })

    const containerStyle = useAnimatedStyle(()=>{
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });


    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode='contain'
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );

    
}