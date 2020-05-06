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
import { AppLoading } from "expo";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newText: "",
    isLoading: true,
  };
  componentDidMount() {
    this._loadComplete();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <AppLoading />
    ) : (
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
            <Todo text={"hello"} />
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
  _loadComplete = () => {
    this.setState({
      isLoading: false,
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
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: -0.5,
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
