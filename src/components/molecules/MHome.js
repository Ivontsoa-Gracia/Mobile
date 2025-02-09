import React, { useState, useEffect } from "react"; 
import { View, StyleSheet, Dimensions, Alert, Text } from "react-native"; 
import { useNavigation } from "@react-navigation/native"; 
import couleurs from "../../couleurs/Couleurs"; 
import MERecherche from "./MERecherche"; 
import MElementCard from "./MElementCard"; 
import icon from "../../data/icon"; 
import { API_URLS } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const { height, width } = Dimensions.get("window");

const MHome = ({ visuelData, iconData = [], productData = [] }) => {
  const [visuel, setVisuel] = useState({}); 
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [icones, setIcons] = useState([]); 
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    setIcons(icon.image);
  }, [icon.image]);

  const addToCart = async (product) => {
    try {
      console.log("Produit ajouté au panier:", product); 
      const newCart = [...cart, product]; 
      setCart(newCart); 
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      Alert.alert("Produit ajouté au panier");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier", error);
    }
  };
  
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigation.navigate("Page3", { product });
  };

  return (
    <View style={styles.container}>
      <MERecherche
        RechercheProps={{
          placeholder: "Search food",
          borderColor: primaryColors[0],
          backgroundColor: primaryColors[3],
          borderRadius: 12,
          borderWidth: 1,
          width: "82%",
          height: 50,
          fontSize: 14,
          textColor: primaryColors[0],
          keyboardType: "web-search",
        }}
        FiltreProps={{
          borderRadius: 12,
          width: 17,
          height: 17,
          url: icones.length > 7 ? icones[7] : null,
          widthback: 50,
          heightBack: 50,
          backgroundColor: primaryColors[0],
        }}
        ImagesProps={{
          url: require("../../assets/img4.jpeg"),
          width: "100%",
          height: 170,
          borderRadius: 12,
          marginBottom: 10,
        }}
      />

      <View style={styles.productsContainer}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <View key={index} style={styles.cardContainer}>
              <MElementCard
                ImagesProps={{
                  url: `${API_URLS}uploads/${product.image}`,
                  width: 150,
                  height: 150,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
                NameProps={{
                  contenu: product.nomPlat,
                  fontSize: 18,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textColor: primaryColors[0],
                }}
                PrixProps={{
                  contenu: `${product.prixUnitaire} Ar`,
                  fontSize: 16,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textColor: primaryColors[1],
                }}
                IconProps={{
                  borderRadius: 12,
                  width: 13,
                  height: 13,
                  url: icones.length > 4 ? icones[4] : null,
                  widthback: 40,
                  heightBack: 40,
                  backgroundColor: primaryColors[0],
                  handleClick: () => addToCart(product), 
                }}
                handleProductClick={() => handleProductClick(product)}
                // onIconClick={() => addToCart(product)}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    marginTop: -20,
    paddingHorizontal: 10, 
  },
  productsContainer: {
    width: '105%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  cardContainer: {
    width: '48%',
    marginBottom: 15,
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
});

export default MHome;
