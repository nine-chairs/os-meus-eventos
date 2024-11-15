import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchEvents } from '../../services/eventService';

type Event = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  capacity: number;
};

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventItem}>
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.description}</Text>
          <Text>Starts At: {new Date(event.startsAt).toLocaleString()}</Text>
          <Text>Capacity: {event.capacity}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  eventItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default EventList;
