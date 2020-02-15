import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import UserGuest from './Account/UserGuest';
import Loading from '../components/Loading';
import Toast from 'react-native-easy-toast';
import { NavigationEvents } from 'react-navigation';

import { firebaseApp } from '../utils/FireBase';
import  firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);




export default function Favorites (props) {
    const { navigation } = props;
    const [ restaurants, setRestaurants ] = useState([]);
    const [ login, setLogin ] = useState(false);
    const [ reloadRestaurants, setReloadRestaurants ] = useState(false);
    const [ isVisibleLoading, setIsVisibleLoading ] = useState(false);
    const toastRef = useRef();


    firebase.auth().onAuthStateChanged(user => {
        !user ? setLogin(false) : setLogin(true);
    });

    useEffect(() => {

        if(login) {

            const idUser = firebase.auth().currentUser.uid;
            db.collection("favorites")
                .where("idUser", "==", idUser)
                .get()
                .then(response => {
                    const idRestaurantsArray = [];
                    response.forEach(doc => {
                        idRestaurantsArray.push(doc.data().idRestaurant)
                    });
                  
    
                    getDataRestaurant(idRestaurantsArray).then(response => {
                        
                        const restaurants = [];
                        response.forEach(doc => {
                            let restaurant = doc.data();
                            restaurant.id = doc.id;
                            restaurants.push(restaurant);
                        });
                        setRestaurants(restaurants);
                    });
                });

                
        }

        

        setReloadRestaurants(false);
    }, [setLogin, reloadRestaurants]);

    const getDataRestaurant = idRestaurantsArray => {
        const arrayRestaurants = [];

        idRestaurantsArray.forEach(idRestaurant => {
            const result = db
                            .collection("restaurants")
                            .doc(idRestaurant)
                            .get();
        
            arrayRestaurants.push(result);
        });
        //LLamado que se corre el problema que no siempre este listo
        //return arrayRestaurants;

        //Llamado con una promesa que permite devolver los datos al estar listo
        return Promise.all(arrayRestaurants);
    };

    if(login) {

        if(restaurants.length == 0){
            return <NotFoundRestaurants setReloadRestaurants={setReloadRestaurants}/>; 
        } else {

            return (
                <View style={styles.viewBody}>
                    <NavigationEvents onWillFocus={()=> setReloadRestaurants(true)} />
                        <FlatList 
                            data={restaurants}
                            renderItem={restaurant => (
                                    <Restaurant 
                                        restaurant={restaurant} 
                                        navigation={navigation}
                                        setIsVisibleLoading={setIsVisibleLoading}
                                        setReloadRestaurants={setReloadRestaurants}
                                        toastRef={toastRef}
                                    />
                                    )}
                            keyExtractor={(item, index) => index.toString()}
        
                        />
                        <Toast ref={toastRef} position="center" opacity= {0.7}/>
                        <Loading text="Eliminando Restaurante de Favoritos" isVisible={isVisibleLoading} />
                </View>
            )
        }
    } else{ 
        return (
            <UserNoLogged 
            setReloadRestaurants={setReloadRestaurants}
            navigation={navigation}
            />
        )
    } 

    // return (
    //     <View style={styles.viewBody}>
    //         {restaurants ? (
    //             <FlatList 
    //                 data={restaurants}
    //                 renderItem={restaurant => (
    //                         <Restaurant 
    //                             restaurant={restaurant} 
    //                             navigation={navigation}
    //                         />
    //                         )}
    //                 keyExtractor={(item, index) => index.toString()}

    //             />
    //         ) : (
    //             <View style={styles.loaderRestaurant}>
    //                 <ActivityIndicator size="large" />
    //                 <Text>No has guardado en restaurantes favoritos...</Text>
    //             </View>
    //         )}
    //     </View>
    // )

     
    
    
}

function Restaurant(props) {
    const { restaurant, navigation, setIsVisibleLoading, setReloadRestaurants, toastRef } = props;
    const { id, name, images } = restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState(null); 

    console.log('name');
    console.log(name);

    useEffect(()=>{
        const image = images[0];
        console.log('image');
        console.log(image);
        firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then(response =>{
            setImageRestaurant(response);
        })

    },[imageRestaurant, setImageRestaurant])

    const confirmRemoveFavorite = () => {
        Alert.alert(
            "Eliminar Restaurantes de Favoritos",
            "¿Estas seguro de que quieres eliminar el Restaurante de favoritos?",
            [
                {
                    text: "Cancelar",
                    style:"cancel"
                },
                {
                    text: "Eliminar",
                    onPress: removeFavorite
                }
            ],
            { cancelable: false }
        );
    };

    const removeFavorite = () => {
        setIsVisibleLoading(true);

        db.collection("favorites")
            .where("idRestaurant","==", id)
            .where("idUser","==", firebase.auth().currentUser.uid)
            .get()
            .then(response => {
                response.forEach(doc =>{
                    const idFavorite = doc.id;
                    db.collection('favorites').doc(idFavorite).delete().then(()=> {
                        setIsVisibleLoading(false);
                        setReloadRestaurants(true);
                        toastRef.current.show("Restaurante Eliminado correctamente");
                    }).catch(()=>{
                        toastRef.current.show("Error al eliminar el restaurante, intentelo mas tarde");
                    })
                })
            })
    }

    return (
        <View style={styles.restaurant}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Restaurant", { restaurant: restaurant.item })}
            >
                <Image 
                    resizeMode="cover"
                    source={{uri: imageRestaurant}}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator  color="#fff"/>}
                />
            
            </TouchableOpacity> 
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Icon 
                    type="material-community"
                    name="heart"
                    color="#00a680"
                    containerStyle={styles.favorite}
                    onPress={confirmRemoveFavorite}
                    size={40}
                    underlayColor="transparent"
                />
            </View>
        </View>
    )
}

function NotFoundRestaurants (props) {
    const { setReloadRestaurants } = props;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <NavigationEvents onWillFocus={()=> setReloadRestaurants(true)} />
        <Icon 
            type="material-community"
            name="alert-outline"
            size={50}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
            No tienes restaurantes en tu lista
        </Text>
        </View>
    )
}

function UserNoLogged (props) {
    const { setReloadRestaurants, navigation } = props;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <NavigationEvents onWillFocus={()=> setReloadRestaurants(true)} />
        <Icon 
            type="material-community"
            name="alert-outline"
            size={50}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center" }}>
            Necesitas estar logeado para ver esta sección.   
        </Text>
        <Button title="Ir al login"  
            onPress={()=>  navigation.navigate("Login")}
            containerStyle={{ marginTop: 20, width: "80%"}}
            buttonStyle={{ backgroundColor: "#00a680" }}
        />
        </View>
    )
}


const styles = StyleSheet.create({
    loaderRestaurant: {
        marginTop: 10,
        marginBottom: 10
    },
    viewBody: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    restaurant: {
        margin: 10,

    },
    image: {
        width: "100%",
        height: 180
    },
    info: {
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#fff"
    },
    name: {
        fontWeight: "bold",
        fontSize: 20
    },
    favorite:{
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100,

    }
})



