import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert, ScrollView } from "react-native";
import { createWorkOrder } from "../services/WorkOrderService";

export default function WorkOrderForm({ navigation }: any) {
  const [type, setType] = useState("automotive");
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [partsCost, setPartsCost] = useState("");

  const handleSubmit = async () => {
    if (!assetName || !description) {
      Alert.alert("Error", "Asset name and description are required");
      return;
    }

    const totalCost = Number(laborHours || 0) * 50 + Number(partsCost || 0); // Example calculation

    try {
      await createWorkOrder({
        type,
        assetName,
        description,
        laborHours: Number(laborHours),
        partsCost: Number(partsCost),
        totalCost,
        status: "open",
        createdAt: new Date(),
      });
      Alert.alert("Success", "Work Order created!");
      // Reset form
      setAssetName("");
      setDescription("");
      setLaborHours("");
      setPartsCost("");
      navigation.navigate("Work Orders"); // go back to list
    } catch (err) {
      Alert.alert("Error", "Failed to create Work Order");
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Work Order</Text>

      <Text>Type</Text>
      <Picker selectedValue={type} onValueChange={(val) => setType(val)}>
        <Picker.Item label="Automotive" value="automotive" />
        <Picker.Item label="Poultry" value="poultry" />
      </Picker>

      <Text>Asset Name</Text>
      <TextInput style={styles.input} value={assetName} onChangeText={setAssetName} />

      <Text>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

      <Text>Labor Hours</Text>
      <TextInput
        style={styles.input}
        value={laborHours}
        onChangeText={setLaborHours}
        keyboardType="numeric"
      />

      <Text>Parts Cost</Text>
      <TextInput
        style={styles.input}
        value={partsCost}
        onChangeText={setPartsCost}
        keyboardType="numeric"
      />

      <Button title="Create Work Order" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
