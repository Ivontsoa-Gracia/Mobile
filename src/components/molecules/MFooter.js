import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MElementFooter from "./MElementFooter";
import { useNavigation } from "@react-navigation/native";

const MFooter = ({ icon }) => {
    const [icons, setIcons] = useState([]);
    const navigation = useNavigation();

    const handleCard = () => {
        console.log("Navigation vers Commande");
        navigation.navigate("Commande");
    };

    const handleDelivery = () => {
        console.log("Navigation vers Delivery");
        navigation.navigate("Delivery");
    };

    useEffect(() => {
        if (Array.isArray(icon?.image)) {
            setIcons(icon.image);
        }
    }, [icon?.image]);

    return (
        <View style={styles.container}>
            {icons.length > 2 && ( 
                <MElementFooter
                    cardIcon={{
                        url: icons[1],
                        width: 35,
                        height: 35,
                        handleClick: handleCard,  
                    }}
                    delivryIcon={{
                        url: icons[2],
                        width: 35,
                        height: 35,
                        handleClick: handleDelivery,  
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

export default MFooter;
