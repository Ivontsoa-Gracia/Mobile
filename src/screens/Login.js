import React from "react";
import { StyleSheet, View } from "react-native";
import MLogin from "../components/molecules/MLogin";

export default Page5 = () => {
    return (
        <View style={styles.container}>
            <MLogin/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});