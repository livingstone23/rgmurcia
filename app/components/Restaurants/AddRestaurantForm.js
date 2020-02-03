import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';




export default function AddRestaurantForm(props) {

    const { toastRef, setIsLoading, navigation } = props;
    const [ imagesSelected, setImagesSelected ] = useState([]);

    return (
        <ScrollView>
            <UploadImage 
                imagesSelected={imagesSelected} 
                setImagesSelected={setImagesSelected}
            />
        </ScrollView>
    )
}

function UploadImage(props) {
    const { imagesSelected, setImagesSelected } = props;

    return (

        <View style={styles.viewImages}>
            <Icon 
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={() => console.log('subiendo imagenes...')}
            />

            <Avatar 
                onPress={() => console.log('Eliminando imagen')}
                style={styles.miniatureStyle}
                //source={{ url miniatura del restaurante}}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    }
})