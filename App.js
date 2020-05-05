import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Todo from "./Todo";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newText: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={this.state.newText}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            onChange={this._comment}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <Todo />
          </ScrollView>
        </View>
      </View>
    );
  }
  _comment = (text) => {
    console.log(text);
    this.setState({
      newText: text,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 35,
    marginTop: 40,
    marginBottom: 30,
    fontWeight: "200",
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: -1,
        },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  input: {
    padding: 25,
    fontSize: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
  },
  toDos: {
    alignItems: "center",
  },
});
