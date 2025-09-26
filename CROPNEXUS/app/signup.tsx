// import { LinearGradient } from "expo-linear-gradient";
// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//     Alert,
//     Image,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
//     ActivityIndicator,
// } from "react-native";
// import authService from "./services/authService";

// export default function SignupScreen() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [strength, setStrength] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const checkPasswordStrength = (text: string) => {
//     setPassword(text);
//     let score = 0;
//     if (text.length >= 8) score += 25;
//     if (/[A-Z]/.test(text)) score += 25;
//     if (/[0-9]/.test(text)) score += 25;
//     if (/[^A-Za-z0-9]/.test(text)) score += 25;
//     setStrength(score);
//   };

//   const getStrengthColor = () => {
//     if (strength < 50) return "#e74c3c";
//     if (strength < 75) return "#f39c12";
//     return "#2ecc71";
//   };

//   const getStrengthText = () => {
//     if (strength < 25) return "Very Weak";
//     if (strength < 50) return "Weak";
//     if (strength < 75) return "Good";
//     return "Strong";
//   };

//   const validateForm = () => {
//     if (!name.trim()) {
//       Alert.alert("Error", "Please enter your name");
//       return false;
//     }
//     if (!email.trim()) {
//       Alert.alert("Error", "Please enter your email");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       Alert.alert("Error", "Please enter a valid email address");
//       return false;
//     }
//     if (!password) {
//       Alert.alert("Error", "Please enter a password");
//       return false;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return false;
//     }
//     if (strength < 50) {
//       Alert.alert("Error", "Password is too weak. Please choose a stronger password.");
//       return false;
//     }
//     return true;
//   };

//   const handleCreateAccount = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       await authService.register(email, password, name, phone);
      
//       Alert.alert(
//         "Account Created",
//         "Your account has been created successfully! Let's complete your profile setup.",
//         [{ text: "Continue", onPress: () => router.push("/onboarding1") }]
//       );
//     } catch (error) {
//       Alert.alert("Registration Failed", "An error occurred while creating your account. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBackToLogin = () => {
//     router.back();
//   };

//   return (
//     <LinearGradient colors={["#183912", "#010f05"]} style={styles.body}>
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" />
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.innerContainer}>
//             <View style={styles.header}>
//               <View style={styles.logoContainer}>
//                 <Image
//                   source={{
//                     uri: "https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png",
//                   }}
//                   style={styles.logo}
//                 />
//               </View>
//               <Text style={styles.title}>Create Account</Text>
//               <Text style={styles.subtitle}>Join CropNexus Community</Text>
//             </View>

//             <View style={styles.formContainer}>
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your full name"
//                   placeholderTextColor="#555"
//                   value={name}
//                   onChangeText={setName}
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Email Address</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your email"
//                   placeholderTextColor="#555"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={email}
//                   onChangeText={setEmail}
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Phone Number (Optional)</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your phone number"
//                   placeholderTextColor="#555"
//                   keyboardType="phone-pad"
//                   value={phone}
//                   onChangeText={setPhone}
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Create a strong password"
//                   placeholderTextColor="#555"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={checkPasswordStrength}
//                 />
//                 {password.length > 0 && (
//                   <View style={styles.strengthContainer}>
//                     <View style={styles.strengthBar}>
//                       <View
//                         style={[
//                           styles.strengthFill,
//                           {
//                             width: `${strength}%`,
//                             backgroundColor: getStrengthColor(),
//                           },
//                         ]}
//                       />
//                     </View>
//                     <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
//                       {getStrengthText()}
//                     </Text>
//                   </View>
//                 )}
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Confirm Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Confirm your password"
//                   placeholderTextColor="#555"
//                   secureTextEntry
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                 />
//               </View>

//               <TouchableOpacity 
//                 style={[styles.createButton, isLoading && styles.disabledButton]} 
//                 onPress={handleCreateAccount}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <ActivityIndicator color="white" />
//                 ) : (
//                   <Text style={styles.createButtonText}>Create Account</Text>
//                 )}
//               </TouchableOpacity>

//               <View style={styles.dividerContainer}>
//                 <View style={styles.divider} />
//                 <Text style={styles.dividerText}>OR</Text>
//                 <View style={styles.divider} />
//               </View>

//               <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
//                 <Text style={styles.loginButtonText}>Already have an account? Login</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   logoContainer: {
//     marginBottom: 15,
//   },
//   logo: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     textAlign: "center",
//     letterSpacing: 1,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "rgba(255, 255, 255, 0.8)",
//     textAlign: "center",
//     marginTop: 5,
//   },
//   formContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     borderRadius: 20,
//     padding: 25,
//     marginHorizontal: 10,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 12,
//     padding: 15,
//     fontSize: 16,
//     color: "#333",
//   },
//   strengthContainer: {
//     marginTop: 8,
//   },
//   strengthBar: {
//     height: 4,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     borderRadius: 2,
//     overflow: "hidden",
//   },
//   strengthFill: {
//     height: "100%",
//     borderRadius: 2,
//   },
//   strengthText: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: "500",
//   },
//   createButton: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 12,
//     padding: 18,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   disabledButton: {
//     backgroundColor: "#666",
//   },
//   createButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   dividerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//   },
//   dividerText: {
//     color: "rgba(255, 255, 255, 0.7)",
//     marginHorizontal: 15,
//     fontSize: 14,
//   },
//   loginButton: {
//     borderWidth: 2,
//     borderColor: "#4CAF50",
//     borderRadius: 12,
//     padding: 15,
//     alignItems: "center",
//   },
//   loginButtonText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";

import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import authService from "./services/authService";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const checkPasswordStrength = (text: string) => {
    setPassword(text);
    let score = 0;
    if (text.length >= 8) score += 25;
    if (/[A-Z]/.test(text)) score += 25;
    if (/[0-9]/.test(text)) score += 25;
    if (/[^A-Za-z0-9]/.test(text)) score += 25;
    setStrength(score);
  };

  const getStrengthColor = () => {
    if (strength < 50) return "#e74c3c";
    if (strength < 75) return "#f39c12";
    return "#2ecc71";
  };

  const getStrengthText = () => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Good";
    return "Strong";
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    if (strength < 50) {
      Alert.alert("Error", "Password is too weak. Please choose a stronger password.");
      return false;
    }
    return true;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.register(email, password, name, phone);

      // Use setTimeout inside Alert to ensure navigation works
      Alert.alert(
        "Account Created",
        "Your account has been created successfully! Let's complete your profile setup.",
        [
          {
            text: "Continue",
            onPress: () => setTimeout(() => router.push("/onboarding1"), 100),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Registration Failed", "An error occurred while creating your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <LinearGradient colors={["#183912", "#010f05"]} style={styles.body}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={{
                    uri: "https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png",
                  }}
                  style={styles.logo}
                />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join CropNexus Community</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#555"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#555"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#555"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create a strong password"
                  placeholderTextColor="#555"
                  secureTextEntry
                  value={password}
                  onChangeText={checkPasswordStrength}
                />
                {password.length > 0 && (
                  <View style={styles.strengthContainer}>
                    <View style={styles.strengthBar}>
                      <View
                        style={[
                          styles.strengthFill,
                          {
                            width: `${strength}%`,
                            backgroundColor: getStrengthColor(),
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
                      {getStrengthText()}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#555"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity 
                style={[styles.createButton, isLoading && styles.disabledButton]} 
                onPress={handleCreateAccount}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.createButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
                <Text style={styles.loginButtonText}>Already have an account? Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
  innerContainer: { flex: 1, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 30 },
  logoContainer: { marginBottom: 15 },
  logo: { width: 70, height: 70, borderRadius: 35 },
  title: { fontSize: 28, fontWeight: "bold", color: "#4CAF50", textAlign: "center", letterSpacing: 1 },
  subtitle: { fontSize: 16, color: "rgba(255, 255, 255, 0.8)", textAlign: "center", marginTop: 5 },
  formContainer: { backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 20, padding: 25, marginHorizontal: 10 },
  inputGroup: { marginBottom: 20 },
  label: { color: "#4CAF50", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  input: { backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: 12, padding: 15, fontSize: 16, color: "#333" },
  strengthContainer: { marginTop: 8 },
  strengthBar: { height: 4, backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: 2, overflow: "hidden" },
  strengthFill: { height: "100%", borderRadius: 2 },
  strengthText: { fontSize: 12, marginTop: 4, fontWeight: "500" },
  createButton: { backgroundColor: "#4CAF50", borderRadius: 12, padding: 18, alignItems: "center", marginBottom: 20 },
  disabledButton: { backgroundColor: "#666" },
  createButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  divider: { flex: 1, height: 1, backgroundColor: "rgba(255, 255, 255, 0.3)" },
  dividerText: { color: "rgba(255, 255, 255, 0.7)", marginHorizontal: 15, fontSize: 14 },
  loginButton: { borderWidth: 2, borderColor: "#4CAF50", borderRadius: 12, padding: 15, alignItems: "center" },
  loginButtonText: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
});
