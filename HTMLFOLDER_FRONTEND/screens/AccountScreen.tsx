import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
    Dashboard: undefined;
};

export default function AccountScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSaveChanges = () => {
        Alert.alert("Profile Updated", "Your changes have been saved successfully.", [
            { text: "OK", onPress: () => navigation.navigate('Dashboard') }
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#4ed960', '#06591c']} style={styles.header}>
                <FontAwesome5 name="user-edit" size={24} color="white" />
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <Text style={styles.headerSubtitle}>Update your personal information</Text>
            </LinearGradient>
            
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile Photo</Text>
                    <View style={styles.profilePhotoContainer}>
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' }}
                            style={styles.profilePhoto}
                        />
                        <View style={styles.photoActions}>
                            <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
                                <Text style={styles.btnTextPrimary}>Change Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, styles.btnOutline]}>
                                <Text style={styles.btnTextOutline}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput style={styles.formControl} defaultValue="Alex Johnson" />
                    </View>
                     <View style={styles.formGroup}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput style={styles.formControl} defaultValue="alexj" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput style={styles.formControl} defaultValue="alex.johnson@example.com" keyboardType="email-address" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput style={styles.formControl} defaultValue="+1 (555) 123-4567" keyboardType="phone-pad"/>
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSave} onPress={handleSaveChanges}>
                        <Text style={styles.btnSaveText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f5f7fa' },
    header: {
        padding: 25,
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 28,
        color: 'white',
        marginTop: 10,
    },
    headerSubtitle: {
        opacity: 0.9,
        color: 'white',
        marginTop: 8,
    },
    container: {
        padding: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#135618',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f0f4ff',
    },
    profilePhotoContainer: {
        alignItems: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#e6e9ff',
    },
    photoActions: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 20,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    btnPrimary: {
        backgroundColor: '#04ad3f',
    },
    btnTextPrimary: {
        color: 'white',
        fontWeight: '500',
    },
    btnOutline: {
        borderWidth: 1,
        borderColor: '#ddd',
    },
    btnTextOutline: {
        color: '#777',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        fontWeight: '500',
        color: '#555',
    },
    formControl: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    btnSave: {
        backgroundColor: '#0a7621',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    btnSaveText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnCancel: {
        backgroundColor: '#f5f7fa',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    btnCancelText: {
        color: '#777',
        fontSize: 16,
    },
});