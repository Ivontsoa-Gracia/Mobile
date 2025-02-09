import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MDetail from "../components/molecules/MDetail";

const Page3 = ({ route }) => {
    const { product } = route.params; 

    if (!product) {
        return <Text>Loading...</Text>; 
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <MDetail 
                    product={product} 
                /> 
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: "center"
    },
    scrollContainer: {
        flexGrow: 1,
    }
});

export default Page3;
