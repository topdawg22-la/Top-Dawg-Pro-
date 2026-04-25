import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getWorkOrders } from "../services/WorkOrderService";
import { WorkOrder } from "../models/WorkOrder";

export default function WorkOrdersScreen() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getWorkOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.asset}>{item.assetName} ({item.type})</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total Cost: ${item.totalCost}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  card: { padding: 10, borderWidth: 1, borderRadius: 6, marginBottom: 10 },
  asset: { fontWeight: "bold", fontSize: 16 },
});
