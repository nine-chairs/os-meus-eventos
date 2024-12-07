import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation"; // Adjust the path if necessary
import { createEvent } from "../../services/eventService";

type CreateEventScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateEvent"
>;

const CreateEventScreen: React.FC = () => {
  const navigation = useNavigation<CreateEventScreenNavigationProp>();

  const [loading, setLoading] = useState(false); // To handle loading state

  // Placeholder for token; replace with actual token retrieval logic
  const token = "your_access_token_here"; // Replace this with a valid access token

  const handleCreateEvent = async () => {
    setLoading(true); // Start loading
    try {
      // Test event details
      const newEvent = await createEvent(
        "Test Event",
        "This is a test event",
        "2024-12-18T08:58:55.556Z",
        10,
        token // Pass the token dynamically
      );

      // Log the created event
      console.log("Created Test Event:", newEvent);

      Alert.alert("Success", "Test event created successfully!");
      navigation.navigate("Home"); // Navigate back to Home screen
    } catch (error) {
      console.error("Error creating test event:", error);
      Alert.alert("Error", "Failed to create test event. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <Button title="X" onPress={() => navigation.navigate("Home")} />
      </View>
      <Text style={styles.title}>Create Test Event</Text>
      <Text>
        Press the button below to create a predefined test event.
      </Text>
      <Button
        title={loading ? "Creating Test Event..." : "Create Test Event"}
        onPress={handleCreateEvent}
        disabled={loading} // Disable the button during loading
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default CreateEventScreen;
