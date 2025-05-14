import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import DrawerMenu from "../components/DrawerMenu";

export default function HomeScreen() {
  return (
    <DrawerMenu>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Paquetes de Internet</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/packages/basic_package.jpeg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/packages/school_package.jpeg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/packages/pro_package.jpeg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </DrawerMenu>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: "column",
    gap: 16,
  },
  image: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 16,
  },
});
