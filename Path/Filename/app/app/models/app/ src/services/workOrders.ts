import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { WorkOrder } from "../models/WorkOrder";

const workOrdersCollection = collection(db, "workOrders");

export const createWorkOrder = async (workOrder: WorkOrder) => {
  return await addDoc(workOrdersCollection, {
    ...workOrder,
    createdAt: new Date(),
  });
};

export const getWorkOrders = async (): Promise<WorkOrder[]> => {
  const q = query(workOrdersCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkOrder));
};
