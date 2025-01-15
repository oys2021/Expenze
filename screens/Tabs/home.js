import React,{useState,useEffect,useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function home({ navigation }) {
const [loading,setLoading]=useState(true)
const [balance,setBalance]=useState(null)
const [error,setError]=useState(null)
const [username,setUsername]=useState("")
const [user_transactions,setTransactions]=useState([]);
const [totalincome,setTotalIncome]=useState(0);
const [totalexpense,setTotalExpense]=useState(0);
const fetchBalance = async () => {
    const uservalue = await AsyncStorage.getItem('username');
    console.log('newusername', uservalue);
    setUsername(uservalue);

    try {
        const response = await axios.get(`http://172.20.10.2:8080/api/user/total-balance/${uservalue}/`);
        setBalance(response.data.total_balance);
        console.log('API Response:', response.data);
    } catch (error) {
        setError("Failed to Load Data");
        console.log("Error fetching balance:", error);
    } finally {
        setLoading(false);
    }
};

const fetchTransactions = async () => {
    const uservalue = await AsyncStorage.getItem('username');
    try {
        const response = await axios.get(`http://172.20.10.2:8080/api/transactions/${uservalue}/`);
        console.log('Transactions API Response:', response.data); 
        if (response.data.transactions) {
            setTransactions(response.data.transactions);
        } else {
            console.log('No transactions data received.');
        }
        setTotalExpense(parseFloat(response.data.total_expense)); 
        setTotalIncome(parseFloat(response.data.total_income));    
    } catch (error) {
        setError("Failed to Load Transactions");
        console.log("Error fetching transactions:", error);
    }
};


useFocusEffect(
    useCallback(() => {
        setLoading(true); 
        fetchBalance();
        fetchTransactions();
    }, [])
);


  const transactionData = [
    {
      id: "1",
      name: "Salary",
      description: "Monthly salary payment",
      amount: 2500,
      date: "2024-12-01",
      type: "income", 
    },
    {
      id: "2",
      name: "Groceries",
      description: "Monthly grocery shopping",
      amount: -150,
      date: "2024-12-05",
      type: "utilities", 
    },
    {
      id: "3",
      name: "Health Insurance",
      description: "Health insurance payment",
      amount: -200,
      date: "2024-12-10",
      type: "health", 
    },
    {
        id: "4",
        name: "Health Insurance",
        description: "Health insurance payment",
        amount: -200,
        date: "2024-12-10",
        type: "health", 
      },
      {
        id: "5",
        name: "Groceries",
        description: "Monthly grocery shopping",
        amount: -150,
        date: "2024-12-05",
        type: "utilities", 
      },
  ];

  const TransactionItem = ({ transaction_category, description, amount, date, transaction_type }) => {

    const getIcon = (transaction_category) => {
      switch (transaction_category) {
        case "Health":
          return "heartbeat"; 
        case "Salary":
          return "dollar"; 
        case "Utility":
          return "shopping-basket"; 
        default:
          return "question-circle"; 
      }
    };

    const getColor = (transaction_category) => {
      switch (transaction_category) {
        case "Salary":
          return "green"; 
        case "Utility":
          return "yellow"; 
        case "Health":
          return "#FF5733"; 
        default:
          return "yellow"; 
      }
    };

    return (
      <View style={styles.transactionCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={getIcon(transaction_category)}
            size={25}
            color={getColor(transaction_category)} 
          />
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.name}>{transaction_category}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.amount,
              { color: transaction_type === "Income" ? "green" : transaction_type === "Expense" ? "red" : "#FF5733" },
            ]}
          >
            {amount < 0 ? `- $${Math.abs(amount)}` : `$${amount}`}
          </Text>
          <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.head}>
        <View>
          <Text style={styles.h1}>Hello,</Text>
          {
            username && (
                <Text style={styles.h2}>{username}</Text>
            )
          }
        </View>
        <View>
          <Image
            source={require("../../assets/track4.jpg")}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Total Balance
          </Text>
        </View>
        {loading ? ( 
          <View style={{ paddingTop: 5 }}>
            <Text style={{ fontSize: 20, color: "grey" }}>Loading...</Text>
          </View>
        ) : balance !== null ? ( 
          <View style={{ paddingTop: 5 }}>
            <Text style={{ fontSize: 27, fontWeight: "bold" }}>${balance}</Text>
          </View>
        ) : ( 
          <View style={{ paddingTop: 5 }}>
            <Text style={{ fontSize: 27, fontWeight: "bold" }}>
              No Balance Available
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 5,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="arrow-up" />
            <Text style={{ fontSize: 18 }}>Income</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="arrow-down" />
            <Text style={{ fontSize: 18 }}>Expense</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 5,
          }}
        >
                <View>
        {loading ? (
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>
            Loading
            </Text>
        ) : totalincome !== null && totalincome !== undefined ? (
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>
            ${totalincome.toFixed(2)}
            </Text>
        ) : (
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "green" }}>
            No Data 
            </Text>
        )}
        </View>

                    <View>
            {loading ? (
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
                Loading...
                </Text>
            ) : totalexpense !== null && totalexpense !== undefined ? (
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
                ${totalexpense.toFixed(2)}
                </Text>
            ) : (
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
                No Data 
                </Text>
            )}
            </View>

        </View>
      </View>
      <View style={styles.head2}>
        <Text style={styles.head2text}>Recent Transactions</Text>
      </View>
        
      {
  user_transactions && user_transactions.length > 0 ? (
    <FlatList
      data={user_transactions}
      renderItem={({ item }) => (
        <TransactionItem
          transaction_category={item.transaction_category}
          description={item.description}
          amount={item.amount}
          date={item.date}
          transaction_type={item.transaction_type}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContainer}
      style={{ flex: 1 }}
    />
  ) : (
    <Text>No Transaction Data Available</Text>
  )
}

     
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('addtransaction')}
      >
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 30,
  },
  head: {
    paddingTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
  h2: {
    fontSize: 22,
    fontWeight: "bold",
  },
  body: {
    width: "100%",
    height: "28%",
    backgroundColor: "#fff",
    marginTop: "8%",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  head2: {
    paddingTop: "15%",
    marginBottom: "5%",
  },
  head2text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 17,
    color: "#555",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 10, 
    backgroundColor: '#601ef1',
    borderRadius: 50, 
    width: 60, 
    height: 60, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0, 
    elevation: 8, 
  }
});
