import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AButton from "../atomes/AButton";
import FloatingLabelInput from "../atomes/FloatingLabelInput";

const { width } = Dimensions.get('window');

const MEFormulaire = ({
    EmailProps,
    MdpProps,
    Soummettre,
    handleSoummettreClick
}) => {

    return (
        <View style={styles.container}>
            <FloatingLabelInput {...EmailProps}/>
            <FloatingLabelInput {...MdpProps}/>
            <AButton {...Soummettre} onPress={handleSoummettreClick}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.9, 
        alignSelf: 'center', 
        padding: 20, 
    },
});

export default MEFormulaire;
