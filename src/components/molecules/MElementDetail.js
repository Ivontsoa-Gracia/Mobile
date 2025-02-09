import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import MElementCard from "./MElementCard";
import AText from "../atomes/AText";
import AButton from "../atomes/AButton";

const screenWidth = Dimensions.get("window").width;


const MElementDetail = ({
  ProduitProps,
  TextProps,
  TitreProps,
  ContenuProps,
  PProps,
  ButtonProps,
  handleBuyClick,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
      <MElementCard {...ProduitProps} />
      </View>

      <View style={styles.partie2}>
        <View style={styles.contenu}>
          <AText {...TitreProps} />
          <ProductDescription description={<AText {...ContenuProps}/>}/>
          
        </View>

        <View style={styles.buy}>
          <View style={styles.price}>
            <AText {...PProps} />
          </View>
          <AButton {...ButtonProps} style={styles.btn}  onPress={handleBuyClick}/>
        </View>
      </View>
    </View>
  );
};

const ProductDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text style={styles.productDescription} numberOfLines={isExpanded ? undefined : 4} ellipsizeMode="tail">
        {description}
      </Text>
      <TouchableOpacity onPress={toggleDescription} accessible={true} accessibilityLabel={isExpanded ? "See less description" : "See more description"}>
        <Text style={styles.seeMoreText}>{isExpanded ? "Read Less" : "Read More"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    justifyContent: 'center',
    width:"100%",
    height: "100%",

  },

  buy: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
    width: screenWidth,      
    justifyContent: 'space-around', 
    alignItems: 'center',
    borderTopWidth: 1,        
    borderTopColor: '#A167A5', 
    width: "100%",
  },
  price: {
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    width: '30%',
    marginRight: "20%",
    // marginLeft: "-28%"
  },
  btn: {
    marginTop: 18, 
    alignSelf: 'flex-end',
    width: "30%",
  },
  contenu: {
    marginLeft: 6,
    marginTop: 5,
    marginBottom: 120,
  },
  seeMoreText: {
    color: '#FF6B81',
    fontWeight: 'bold',
    marginTop: 5,
  },
  product: {
   alignItems: 'center',
   justifyContent: 'center'
  },
});

export default MElementDetail;
