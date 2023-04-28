import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getAllPlantImages } from '../../firebase/database';
import { useEffect, useState } from 'react';



const PlantsScreen = () => {

    const [ plantImages, setPlantImages ] = useState<string[] | undefined>([]);

    useEffect(() => {

        getAllPlantImages().then((response) => {

            setPlantImages(response)

        })

    }, []);

    const handlePress = () => {

        
    }

  return (

    <View>
      <Text>Plants</Text>
      <View>
        { plantImages?.map( ( plantImage ) => { 
            
            return (
                <Pressable onPress={ handlePress } key={ plantImage }>
                    <Image style={ styles.plantImages } source={ { uri:plantImage } }></Image>
                </Pressable>
            ) 

          } ) 
        }
        </View>
    </View>

  )

};

export default PlantsScreen;

const styles = StyleSheet.create({plantImages: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "cover",
  },});