import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';

import { FireSQL } from 'firesql';
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id"});

export default function Search(props) {
    const { navigation } = props; 
    const [ restaurants, setRestaurants ] = useState([]);
    const [ search, setSearch ] = useState("");



    useEffect(()=>{
        if(search){
            fireSQL
                .query(`SELECT * FROM restaurants WHERE name LIKE '${search}'`)
                .then(response => {
                    setRestaurants(response);
                });
        }
    },[search])

    return (
        <View>
            <SearchBar 
               placeholder="Busca tu restaurante"
               onChangeText={e => setSearch(e)}
               value={search}
               containerStyle={styles.searchBar} 
            />
            {restaurants.length === 0 ? (
                <View>
                    <Text>No hay restaurantes</Text>
                </View>
            ): (
                <FlatList
                    data={restaurants}
                    renderItem={restaurant => <Restaurant restaurant={restaurant}/>}
                    keyExtractor={(item, index) => index.toString()}

                />
            )}
        </View>
    )
}

function Restaurants(props){
    const { restaurant } = props
    const { name, images } = restaurant.item;
    const { imageRestaurant, setImageRestaurant } = useState(null);



    return (
        <View>
            <Text>Restaurantes...</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    }
})