import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";



export default function InfoUser(props) {

    const { 

        userInfo: { uid, displayName, email, photoURL } 
        } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if(resultPermissionCamera === "denied") {
            console.log("Es necesario dar los permisos en la galeria")
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:  true,
                aspect: [ 4, 3 ]
            });

            if(result.cancelled) {
                console.log("Has cerrado la galeria de imagenes");
            } else {
                uploadImage(result.uri, uid)
            }
        }
    }; 

    const uploadImage = (uri, nameImage) => {
        console.log('URI: '  + uri);
        console.log('nameImage: '  + nameImage);
    }

    return (
    <View style={styles.viewUserInfo}>
        <Avatar 
            rounded
            size= "large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{
                uri: photoURL ? photoURL : "https://api.adorable.io/avatars/266/abott@adorable.png"
            }}
        />
        <View>
            <Text style={styles.displayName}>
                {displayName ? displayName : "Anónimo"}
            </Text>
            <Text>
                {email ? email : "Social Login"}
            </Text>
        </View>
    </View>
   )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight:  20
    },
    displayName: {
        fontWeight: 'bold'
    }
})
