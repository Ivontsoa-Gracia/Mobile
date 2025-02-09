import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import couleurs from "../../couleurs/Couleurs";
import MEDelivery from "./MEDelivery";
import { API_URLS } from "@env";
import axios from "axios";

const { height, width } = Dimensions.get("window");

const MDelivery = ({ visuelData, iconData = [], productData = [] }) => {
  const [visuel, setVisuel] = useState({});
  const [products, setProducts] = useState([]);
  const [icones, setIcons] = useState([]);

  const primaryColors = couleurs.primaire;
  const secondaryColors = couleurs.secondaire;
  const navigation = useNavigation();

  useEffect(() => {
    if (visuelData) setVisuel(visuelData);
  }, [visuelData]);

  useEffect(() => {
    if (iconData.length) setIcons(iconData);
  }, [iconData]);

  useEffect(() => {
    if (productData.length) setProducts(productData);
  }, [productData]);

  const handleConfirmer = async (product) => {
    console.log("Button clicked for product:", product);
    Alert.alert('Confirmer', 'Bouton cliqué!');
  
    const productData = {
      id: product.id,
      status: 'recuperer',  
    };
  
    try {
      const response = await axios.put(`${API_URLS}api/detailCommandeEdit/${product.id}`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Response:", response.data);
  
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande :", error);
      Alert.alert("Erreur", "Impossible de mettre à jour la commande.");
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.listeCommande}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <View key={index} style={styles.cardContainer}>
              <MEDelivery
                ImagesProps={{
                  url: `${API_URLS}uploads/${product.idPlat.image}`,
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
                NameProps={{
                  contenu: product.idPlat.nomPlat,
                  fontSize: 20,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textColor: primaryColors[0],
                }}
                PrixProps={{
                  contenu: `${product.idPlat.prixUnitaire} Ar`,
                  fontSize: 18,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textColor: primaryColors[1],
                }}
                StatusPros={{
                  contenu: `Commande ${product.status}`,
                  fontSize: 12,
                  fontFamily: "sans-serif",
                  fontWeight: "normal",
                  textColor: primaryColors[2],
                }}
                Confirmer={product.status === 'fini' ? { 
                  borderRadius: 12,
                  width: "100%",
                  height: height * 0.05,
                  value: "Récupérer",
                  fontSize: 16,
                  fontWeight: "bold",
                  textColor: primaryColors[3],
                  marginTop: 20,
                  backgroundColor: primaryColors[0],
                } : null}
                handleConfirmer={product.status === 'fini' ? () => handleConfirmer(product) : null}
              />
              {/* <Text>{product.status}</Text> */}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun produit disponible</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    paddingHorizontal: 10,
  },
  listeCommande: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: width,
  },
  cardContainer: {
    width: "100%",
    marginBottom: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MDelivery;


