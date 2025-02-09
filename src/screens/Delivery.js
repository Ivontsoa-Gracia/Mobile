import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import MFooter from "../components/molecules/MFooter";
import MDelivery from "../components/molecules/MDelivery";
import { API_URLS } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Delivery = () => {
  const [products, setProducts] = useState([]);
  const [idClient, setIdClient] = useState(null);

  const fetchClientData = useCallback(async () => {
    try {
      const emailClient = await AsyncStorage.getItem("emailClient");

      if (!emailClient) {
        Alert.alert("Erreur", "Vous devez être connecté pour voir vos commandes.");
        return;
      }

      console.log("Client connecté :", emailClient);

      const response = await axios.post(`${API_URLS}api/clients/findByEmail`, { email: emailClient });
      const clientData = response.data;

      if (!clientData || !clientData.id) {
        console.error("Client non trouvé.");
        Alert.alert("Erreur", "Client non trouvé, veuillez vérifier votre connexion.");
        return;
      }

      setIdClient(clientData.id);
      console.log("ID du client récupéré :", clientData.id);
    } catch (error) {
      console.error("Erreur lors de la récupération du client :", error);
      Alert.alert("Erreur", "Impossible de récupérer les informations du client.");
    }
  }, []);

const fetchPlats = useCallback(async () => {
    if (!idClient) return;
  
    try {
      const response = await axios.get(`${API_URLS}api/detailsCommandeByClient/${idClient}`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
      Alert.alert("Erreur", "Impossible de récupérer les plats.");
    }
  }, [idClient]);
  


  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  useEffect(() => {
    fetchPlats();
  }, [fetchPlats]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <MDelivery productData={products} iconData={[]} style={styles.card} />
      </ScrollView>
      <MFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default Delivery;
