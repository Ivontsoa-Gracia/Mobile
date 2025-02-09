import React, { useState, useEffect, useRef } from "react"; 
import { View, TextInput, Text, Animated, StyleSheet } from "react-native";

const FloatingLabelInput = ({ 
    borderColor,
    backgroundColor,
    borderRadius,
    width,
    height,
    borderWidth,
    fontSize,
    textColor,
    label, 
    value, 
    onFocus, 
    onBlur, 
    ...props 
}) => {
        
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedLabel, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: "absolute",
        left: 12,
        top: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: [11, -9], 
        }),
        fontSize: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12], 
        }),
        color: isFocused ? "#A167A5" : "#aaa",
        backgroundColor: backgroundColor || "#A167A5",
        paddingHorizontal: 4, 
    };

    return (
        <View 
            style={[ 
                styles.container, 
                { 
                    borderColor: isFocused ? "#A167A5" : borderColor || "#A167A5", 
                    borderRadius, 
                    borderWidth, 
                    backgroundColor, 
                    width, 
                    height, 
                    shadowColor: "#A167A5",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: isFocused ? 0.5 : 0, 
                    shadowRadius: 5, 
                    elevation: isFocused ? 5 : 0, 
                    outline: 'none', 
                    }
            ]}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
                style={[styles.input, { fontSize, color: textColor }]}
                value={value}
                onFocus={() => {
                    setIsFocused(true);
                    if (onFocus) onFocus();
                }}
                onBlur={() => {
                    setIsFocused(false);
                    if (onBlur) onBlur();
                }}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20,
        position: "relative",
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    input: {
        // styles pour l'input
    },
});

export default FloatingLabelInput;
