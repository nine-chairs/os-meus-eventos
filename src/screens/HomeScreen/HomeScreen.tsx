import React from "react";
import { View, Text, Button } from "react-native";
import { logoutUser } from "../../services/authService"; // Adjust the path if necessary
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation"; // Adjust the path if necessary
import EventList from "./EventList";

type HomeScreenProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout function from authService
      setIsLoggedIn(false); // Update the logged-in state
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <EventList />
      <Button
        title="Create Event"
        onPress={() => navigation.navigate("CreateEvent")}
      />
    </View>
  );
};

export default HomeScreen;
