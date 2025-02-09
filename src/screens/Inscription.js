import React from "react";
import { StyleSheet, View } from "react-native";
import MInscription from "../components/molecules/MInscription";

export default Page5 = () => {
    return (
        <View style={styles.container}>
            <MInscription/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});