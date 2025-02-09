import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MFooter from "../components/molecules/MFooter";
import icon from "../data/icon";
import MCommande from "../components/molecules/MCommande";


const Commande = () => {
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const getCartFromStorage = async () => {
          try {
            const cartData = await AsyncStorage.getItem('cart');
            if (cartData) {
              setProducts(JSON.parse(cartData));  
            }
          } catch (error) {
            console.error("Erreur lors de la récupération du panier:", error);
          }
        };
    
        getCartFromStorage(); 
      }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <MCommande productData={products} icon={icon} style={styles.card}/>
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

export default Commande;
