import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import couleurs from "../../couleurs/Couleurs";
import MECommande from "./MECommande";
import AButton from "../atomes/AButton";
import AText from "../atomes/AText";
import { API_URLS } from '@env';
import 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get("window");

const MCommande = ({ visuelData, iconData = [], productData = [] }) => {
  const [visuel, setVisuel] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const calculateTotalAmount = () => {
    return products.reduce((total, product) => total + parseFloat(product.prixUnitaire), 0);
  };

  const handleConfirmer = async () => {
    console.log("handleConfirmer a été appelé");
  
    const emailClient = await AsyncStorage.getItem("emailClient");
  
    if (!emailClient) {
      alert("Vous devez être connecté pour passer une commande.");
      return;
    }
  
    console.log("Client connecté :", emailClient);
  
    const tokenClient = await AsyncStorage.getItem("tokenClient");
  
    if (!tokenClient) {
      alert("Vous devez être connecté pour passer une commande.");
      return;
    }
  
    console.log("Token du client récupéré :", tokenClient);
  
    const dateCommande = new Date().toISOString();
    const montantTotal = calculateTotalAmount();
    const montantTotalString = montantTotal.toString();  
  
    try {
      const clientResponse = await axios.post(`${API_URLS}api/clients/findByEmail`, {
        email: emailClient,  
      });
  
      const clientData = clientResponse.data; 
  
      if (!clientData || !clientData.id) {
        console.error("Erreur : client non trouvé.");
        alert("Client non trouvé, veuillez vérifier votre connexion.");
        return;
      }
  
      const idClient = clientData.id;  
      console.log("ID du client récupéré : " + idClient);
  
      const commandeResponse = await axios.post(
        `${API_URLS}api/commandes`,
        {
          idclient: idClient,
          dateCommande: dateCommande,
          montantTotal: montantTotalString,
          status: "EN_COURS"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenClient}`  
          }
        }
      );

      console.log("Données de la commande :", {
        idClient: idClient,
        dateCommande: dateCommande,
        montantTotal: montantTotalString,
        status: "EN_COURS"
      });
      
      const idCommandeResponse = await axios.get(`${API_URLS}api/commandes/last-id`);

      const idCommande = idCommandeResponse.data.idCommande;  

      if (!idCommande) {
        console.error("Erreur : ID de la commande non trouvé.");
        alert("Une erreur est survenue lors de la création de la commande.");
        return;
      }

      console.log("ID de la commande est :", idCommande);

      const products = await AsyncStorage.getItem("cart");
      const parsedProducts = products ? JSON.parse(products) : [];

      if (parsedProducts.length === 0) {
        console.error("Erreur : Aucun produit dans le panier.");
        alert("Votre panier est vide.");
        return;
      }

      const idPlats = parsedProducts.map(product => product.id);
      console.log("ID des produits dans la commande avant l'insertion :", idPlats);

      for (const product of parsedProducts) {
        const idPlat = product.id;  

        if (!idPlat) {
          console.error("Erreur : ID du produit non trouvé.");
          continue; 
        }

        try {
          const response = await axios.post(
            `${API_URLS}api/detailCommande`,
            {
              idCommande: idCommande, 
              idPlat: idPlat,   
              status: "en cours"       
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenClient}`, 
              }
            }
          );

          console.log("Données insérées dans detailCommande :", response.data);

        } catch (error) {
          console.error("Erreur lors de l'insertion dans detailCommande :", error);
          alert("Une erreur est survenue lors de l'insertion des détails de la commande.");
        }
      }

       await AsyncStorage.removeItem("cart");
       console.log("Panier vidé après confirmation de la commande.");

      alert("Commande confirmée avec succès !");
  
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande :", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
};

  
  const totalAmount = calculateTotalAmount();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.conf}>
        <AText
          contenu={`Montant total: ${totalAmount.toFixed(2)} Ar`}
          fontSize={18}
          fontWeight="bold"
        />
        <AButton
        style={styles.btn}  
        borderRadius={12}
        width="87%"
        height={height * 0.05}
        value="Confirmation"
        fontSize={16}
        fontWeight="bold"
        textColor={primaryColors[3]}
        marginTop={20}
        backgroundColor={primaryColors[0]}
        onPress={() => handleConfirmer()} 
        />
      </View>
      <View style={styles.listeCommande}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <View key={index} style={styles.cardContainer}>
              <MECommande
                ImagesProps={{
                  url: `${API_URLS}uploads/${product.image}`,
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
                NameProps={{
                  contenu: product.nomPlat,
                  fontSize: 25,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textColor: primaryColors[0],
                }}
                PrixProps={{
                  contenu: `${product.prixUnitaire} Ar`,
                  fontSize: 20,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textColor: primaryColors[1],
                }}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
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
    paddingHorizontal: 10,
  },
  listeCommande: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: width,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    alignSelf: 'center',  
    marginBottom: 50, 
  },
});

export default MCommande;

