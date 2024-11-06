// orderService.js
import {
    collection,
    addDoc,
    getDocs,
    Timestamp
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Agrupar items por nombre y sumar cantidades
const groupOrderItems = (orderItems) => {
    const groupedItems = {};

    orderItems.forEach((item) => {
        if (groupedItems[item.name]) {
            groupedItems[item.name].quantity += 1;
        } else {
            groupedItems[item.name] = { ...item, quantity: 1 };
        }
    });

    return Object.values(groupedItems);
};

// Crear nueva orden
const createOrder = async (orderItems, total) => {
    try {
        // Agrupar items antes de guardar
        const groupedItems = groupOrderItems(orderItems);

        const orderData = {
            date: Timestamp.now(),
            items: groupedItems,
            payment: "cash",
            total: total,
        };

        const docRef = await addDoc(collection(db, "Orders"), orderData);
        console.log("Order created with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Obtener todas las órdenes
const getOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "Orders"));
    const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(dataList);
    return dataList;
};

export { getOrders, createOrder };
