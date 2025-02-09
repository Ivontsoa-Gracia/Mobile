import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MFooter from "../components/molecules/MFooter";
import icon from "../data/icon";

import MHome from "../components/molecules/MHome";
import { API_URLS } from '@env';
import axios from "axios";


const Produits = () => {
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const fetchPlats = async () => {
          const url = `${API_URLS}api/plats`; 
          console.log("URL API:", url);
      
          try {
            const response = await axios.get(url); 
            setProducts(response.data); 
          } catch (error) {
            console.error("Erreur lors de la récupération des plats :", error);
            Alert.alert("Erreur", "Impossible de récupérer les plats.");
          }
        };
      
        fetchPlats();
      }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <MHome productData={products} icon={icon} style={styles.card}/>
            </ScrollView>
            <MFooter icon={icon} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});

export default Produits;
