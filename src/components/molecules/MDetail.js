import React, { useState, useEffect } from "react"; 
import { View } from "react-native";
import couleurs from "../../couleurs/Couleurs";
import MElementdetail from "./MElementDetail";
import { useNavigation } from "@react-navigation/native";
import { API_URLS } from '@env';

const MDetail = ({ product }) => {
    const [products, setProducts] = useState(null); 
    const primaryColors = couleurs.primaire;
    const secondaryColors = couleurs.secondaire;
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate("Page4"); 
    };

    useEffect(() => {
        if (product) {
            setProducts(product);
        }
    }, [product]);

    return (
        <View>
            <MElementdetail
                ProduitProps={{
                    ImagesProps: {
                        url: `${API_URLS}uploads/${product?.image}`, 
                        width: 350,
                        height: 300,
                        borderRadius: 12,
                        marginBottom: 10,
                    },
                    NameProps: {
                        contenu: product?.nomPlat,
                        fontSize: 26,
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        textColor: primaryColors[0],
                    }
                }}
                TitreProps={{
                    contenu: "Ingredients",  
                    fontSize: 18,
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    textColor: primaryColors[1],
                }}
                ContenuProps={{
                    contenu: product?.nomIngredient || '', 
                    fontSize: 20,
                    fontFamily: 'sans-serif',
                    fontWeight: 'medium',
                    textColor: primaryColors[1],
                }}
                
                PProps={{
                    contenu: `${product?.prixUnitaire} Ar`, 
                    fontSize: 22,
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    textColor:  primaryColors[0],
                }}
                ButtonProps={{
                    borderRadius: 12,
                    width: "50%",
                    height: 45,
                    value: "Buy Now",
                    fontSize: 15,
                    fontWeight: 'bold',
                    textColor: secondaryColors[4],
                    backgroundColor: primaryColors[0],
                }}
                handleBuyClick={handleClick}
            />
        </View>
    );
};

export default MDetail;
