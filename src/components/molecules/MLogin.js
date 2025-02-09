import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Alert, ImageBackground, Dimensions, Platform } from "react-native";
import MEFormulaire from "./MEFormulaire";
import couleurs from "../../couleurs/Couleurs"; 
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";


const { height, width } = Dimensions.get("window"); 

const MLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("tokenClient");
            console.log("Token récupéré :", token);

            if (token) {
                try {

                    const payload = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (payload.exp && payload.exp > currentTime) {
                        console.log("Email du token:", payload.email);

                        await AsyncStorage.setItem("emailClient", payload.email);
                        navigation.navigate("Produits");
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification du token :", error);
                }
            }
        };

        checkToken();
    }, []);



    const handleClick = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez entrer votre email et mot de passe.");
            return;
        }
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            console.log("token= "+token);
            
            await AsyncStorage.setItem("tokenClient", token);
        
            navigation.navigate("Produits");
        } catch (error) {
            console.error("Erreur d'authentification :", error);
            alert("Erreur: "+error);
        }
    };

    const primaryColors = couleurs.primaire;

    return (
        <ImageBackground source={require('../../assets/background.jpeg')} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Sign in</Text>
                    <Text style={styles.subHeaderText}>Login and enjoy our services.</Text>
                </View>

                <MEFormulaire
                    EmailProps={{
                        label: "Entrez votre email",
                        value: email,
                        onChangeText: setEmail,
                        borderColor: "#A167A5",
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        width: "100%",
                        height: height * 0.065, 
                        borderWidth: 1,
                        fontSize: 14,
                        textColor: "#000",
                        keyboardType: "email-address",
                        onFocus: () => setEmailFocused(true),
                        onBlur: () => setEmailFocused(false),
                    }}
                    label2={{
                        contenu: "Mot de passe: ",
                        fontSize: 15,
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        textColor: primaryColors[1],
                        textAlign: "left",
                        marginBottom: passwordFocused ? -15 : -5,
                        lineHeight: 50,
                    }}
                    MdpProps={{
                        label: "Entrez votre mot de passe",
                        value: password,
                        onChangeText: setPassword,
                        borderColor: "#A167A5",
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        width: "100%",
                        height: height * 0.065, 
                        borderWidth: 1,
                        fontSize: 14,
                        textColor: "#000",
                        secureTextEntry: true,
                        onFocus: () => setPasswordFocused(true),
                        onBlur: () => setPasswordFocused(false),
                    }}
                    Soummettre={{
                        borderRadius: 12,
                        width: "100%",
                        height: height * 0.065, 
                        value: "Sign in",
                        fontSize: 15,
                        fontWeight: 'bold',
                        textColor: primaryColors[3],
                        marginTop: 20,
                        backgroundColor: primaryColors[0],
                    }}
                    handleSoummettreClick={handleClick}
                />

                <View style={styles.loginLinkContainer}>
                    <Text style={styles.loginText}>Don't have account ? </Text>
                    <Text
                        style={styles.linkText}
                        onPress={() => navigation.navigate("Inscription")}
                    >
                        Sign up
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 50, 
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',  
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    
    header: {
        marginBottom: height * 0.05, 
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32, 
        fontWeight: 'bold',
        color: '#A167A5',
        marginBottom: 5,
    },
    subHeaderText: {
        fontSize: 18, 
        color: '#A167A5',
        marginTop: 5,
        textAlign: 'center',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
        color: '#A167A5',
    },
    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#A167A5',
        textDecorationLine: 'underline',
    },
});

export default MLogin;