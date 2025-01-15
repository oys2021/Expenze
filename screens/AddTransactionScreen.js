import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from "react-native-vector-icons/FontAwesome";

const AddTransactionScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [subtype, setSubtype] = useState('');

  // Options for transaction type
  const transactionTypeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  const incomeSubtypes = [
    { label: 'Salary', value: 'Salary' },
    { label: 'Freelance', value: 'Freelance' },
    { label: 'Investment', value: 'Investment' },
  ];

  const expenseSubtypes = [
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Rent', value: 'Rent' },
    { label: 'Utilities', value: 'Utilities' },
    { label: 'Insurance', value: 'Insurance' },
  ];

  const [subtypeOptions, setSubtypeOptions] = useState([]);

  useEffect(() => {
    if (transactionType === 'income') {
      setSubtypeOptions(incomeSubtypes);
    } else if (transactionType === 'expense') {
      setSubtypeOptions(expenseSubtypes);
    }
  }, [transactionType]);

  const handleSubmit = () => {
    if (description && amount && date && transactionType && subtype) {
      const newTransaction = {
        id: Math.random().toString(),
        description,
        amount: parseFloat(amount),
        date,
        transactionType,
        subtype,
      };

      console.log('New Transaction:', newTransaction);

      navigation.goBack();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <View style={styles.head}> 
        <Text style={styles.headtext}>Add Transaction</Text>
      </View>

      <Dropdown
        data={transactionTypeOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Type"
        value={transactionType}
        onChange={item => setTransactionType(item.value)}
        style={styles.dropdown}
      />

      {transactionType && (
        <Dropdown
          data={subtypeOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Category"
          value={subtype}
          onChange={item => setSubtype(item.value)}
          style={styles.dropdown}
        />
      )}

      {/* <TextInput
        placeholder="Transaction Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      /> */}

      {/* Input for Description */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      {/* Input for Amount */}
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      {/* Input for Date */}
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    margin: 16,
    height: 50,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
  },
  head: {
    paddingTop: '10%',
    alignItems: 'center',
  },
  headtext: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
