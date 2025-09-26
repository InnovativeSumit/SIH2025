import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FertilizerScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fertilizer Screen</Text>
            <Text>This is a placeholder. All product logic is handled on the main products page.</Text>
            <Link href="/products" style={styles.link}>Go to Products Page</Link>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    link: { marginTop: 20, color: 'blue', fontSize: 16 }
});