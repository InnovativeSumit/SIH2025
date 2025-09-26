// import { LinearGradient } from "expo-linear-gradient";
// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//     Alert,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
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

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await authService.login(email, password);
      
//       // Check if onboarding is completed
//       const isOnboardingCompleted = await authService.isOnboardingCompleted();
      
//       if (isOnboardingCompleted) {
//         router.replace('/dashboard');
//       } else {
//         router.replace('/onboarding1');
//       }
//     } catch (error) {
//       Alert.alert("Login Failed", "Invalid email or password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignUp = () => {
//     router.push('/signup');
//   };

//   return (
//     <LinearGradient colors={["#183912", "#010f05"]} style={styles.body}>
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" />
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1, justifyContent: "center" }}
//         >
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.innerContainer}>
//               <View style={styles.header}>
//                 <View style={styles.logoContainer}>
//                   <Image
//                     source={{
//                       uri: "https://i.ibb.co/ksJ9p602/Screenshot-2025-09-12-095804.png",
//                     }}
//                     style={styles.logo}
//                   />
//                 </View>
//                 <Text style={styles.title}>CROPNEXUS</Text>
//               </View>

//               <View style={styles.formContainer}>
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email or Phone</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter your email or phone"
//                     placeholderTextColor="#555"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     value={email}
//                     onChangeText={setEmail}
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter your password"
//                     placeholderTextColor="#555"
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                   />
//                 </View>

//                 <TouchableOpacity style={styles.forgotPassword}>
//                   <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity 
//                   style={[styles.loginButton, isLoading && styles.disabledButton]} 
//                   onPress={handleLogin}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <ActivityIndicator color="white" />
//                   ) : (
//                     <Text style={styles.loginButtonText}>Login</Text>
//                   )}
//                 </TouchableOpacity>

//                 <View style={styles.dividerContainer}>
//                   <View style={styles.divider} />
//                   <Text style={styles.dividerText}>OR</Text>
//                   <View style={styles.divider} />
//                 </View>

//                 <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
//                   <Text style={styles.signupButtonText}>Create New Account</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
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
//     marginBottom: 40,
//   },
//   logoContainer: {
//     marginBottom: 20,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     textAlign: "center",
//     letterSpacing: 2,
//   },
//   formContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     borderRadius: 20,
//     padding: 30,
//     marginHorizontal: 10,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     color: "#4CAF50",
//     fontSize: 16,
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
//   forgotPassword: {
//     alignSelf: "flex-end",
//     marginBottom: 30,
//   },
//   forgotPasswordText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   loginButton: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 12,
//     padding: 18,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   disabledButton: {
//     backgroundColor: "#666",
//   },
//   loginButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   dividerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
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
//   signupButton: {
//     borderWidth: 2,
//     borderColor: "#4CAF50",
//     borderRadius: 12,
//     padding: 18,
//     alignItems: "center",
//   },
//   signupButtonText: {
//     color: "#4CAF50",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // try {
    //   await authService.login(email, password);
      
    //   // Check if onboarding is completed
    //   const isOnboardingCompleted = await authService.isOnboardingCompleted();
      
    //   if (isOnboardingCompleted) {
    //     router.replace('/dashboard');
    //   } else {
    //     router.replace('/onboarding1');
    //   }
    // }
      try {
          await authService.login(email, password);
    
          // Use setTimeout inside Alert to ensure navigation works
          Alert.alert(
            "Login Successful",
            "Welcome back! Let's get you to your dashboard.",
            [
              {
                text: "Continue",
                onPress: () => setTimeout(() => router.push("/onboarding1"), 100),
              },
            ]
          );
        }
     catch (error) {
      Alert.alert("Login Failed", "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <LinearGradient colors={["#183912", "#010f05"]} style={styles.body}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center" }}
        >
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
                <Text style={styles.title}>CROPNEXUS</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email or Phone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email or phone"
                    placeholderTextColor="#555"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#555"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.loginButton, isLoading && styles.disabledButton]} 
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>

                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                  <Text style={styles.signupButtonText}>Create New Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    letterSpacing: 2,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#666",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    color: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 15,
    fontSize: 14,
  },
  signupButton: {
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
  },
});
