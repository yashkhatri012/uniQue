
import { FlatList , ScrollView , View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';


import { useEffect, useState } from "react";
import { connectSocket, socket } from "../services/socket";



type Lead = {
    _id: string;
    leadgenId: string;
    name: string;
    email: string;
    createdAt: string;
  };
const API_URL = "https://glasses-midi-loc-engaged.trycloudflare.com/api/leads";

export default function HomeScreen() {

  const [leads, setLeads] = useState<Lead[]>([]);
 

  const fetchLeadsFromDB = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setLeads(result.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } 
  };

 useEffect(() => {
  

  fetchLeadsFromDB();

  connectSocket();

  const handleNewLead = () => {
      console.log("New lead  received, refreshing...");
      fetchLeadsFromDB();
    };

  socket.on("new-lead", handleNewLead);


  return () => {
    socket.off("new-lead", handleNewLead);
  };
}, []);

 return (
  <SafeAreaView>
    <ThemedText>Leads: ({leads.length})</ThemedText>

    <FlatList
      data={leads}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View>
          <ThemedText>{item.name}</ThemedText>
          <ThemedText>{item.email}</ThemedText>
        </View>
      )}
    />
  </SafeAreaView>
);
}
