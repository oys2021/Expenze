import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from "react-native";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Dimensions } from 'react-native';
// import { VictoryBar,VictoryChart,VictoryTheme,VictoryGroup } from "victory-native";



const data = {
  "labels": [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ],
  "datasets": [
    {
      "data": [
        [0.0, 0.0],  // Monday: Income 0, Expense 0
        [0.0, 0.0],  // Tuesday: Income 0, Expense 0
        [45.0, 0.0], // Wednesday: Income 45, Expense 0
        [25.0, 33.0], // Thursday: Income 25, Expense 33
        [48.0, 0.0], // Friday: Income 48, Expense 0
        [0.0, 0.0],  // Saturday: Income 0, Expense 0
        [0.0, 0.0]   // Sunday: Income 0, Expense 0
      ]
    }
  ]
};

const screenWidth = Dimensions.get("window").width;  // Get screen width to make the chart responsive

export default function Statistics() {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected segmented control index

  // Function to handle segmented control change
  const handleSegmentChange = (index) => {
    setSelectedIndex(index);
  };


  // Prepare chart data for "Day" view
  const prepareChartData = () => {
    const labels = data.labels;  // Days of the week
    const incomeData = data.datasets[0].data.map(item => item[0]); // Extract income data (first element in each pair)
    const expenseData = data.datasets[0].data.map(item => item[1]); // Extract expense data (second element in each pair)

    return {
      labels: labels,
      datasets: [
        {
          data: incomeData,
          color: (opacity = 1) => `rgba(34, 202, 204, ${opacity})`, // Blue for income
          strokeWidth: 2
        },
        {
          data: expenseData,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red for expense
          strokeWidth: 2
        }
      ]
    };
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
      </View>

      <SegmentedControl
        values={['Weekly', 'Monthly', 'Yearly']}
        selectedIndex={selectedIndex}
        onChange={(event) => handleSegmentChange(event.nativeEvent.selectedSegmentIndex)}
      />

      <View style={styles.content}>
        <Text style={styles.totalText}>Income and Expense for Each Day of the Week</Text>

        {/* Bar chart showing income and expense for each day */}
       <Text>Hello</Text>

       <VictoryChart
      theme={VictoryTheme.clean}
      domain={{ y: [0.5, 5.5] }}
      domainPadding={{ x: 40 }}
    >
      <VictoryGroup
        offset={20}
        style={{ data: { width: 15 } }}
      >
        <VictoryBar
          data={[
            { x: "2023 Q1", y: 1 },
            { x: "2023 Q2", y: 2 },
            { x: "2023 Q3", y: 3 },
            { x: "2023 Q4", y: 2 },
          ]}
        />
        <VictoryBar
          data={[
            { x: "2023 Q1", y: 2 },
            { x: "2023 Q2", y: 3 },
            { x: "2023 Q3", y: 4 },
            { x: "2023 Q4", y: 5 },
          ]}
        />
        <VictoryBar
          data={[
            { x: "2023 Q1", y: 1 },
            { x: "2023 Q2", y: 2 },
            { x: "2023 Q3", y: 3 },
            { x: "2023 Q4", y: 4 },
          ]}
        />
      </VictoryGroup>
    </VictoryChart>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    marginVertical: 10,
  }
});
