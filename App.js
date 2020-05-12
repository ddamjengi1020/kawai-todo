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
  AsyncStorage,
} from "react-native";
import Todo from "./Todo";
import { AppLoading } from "expo";

const { width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    isLoading: true,
    toDos: {},
  };
  componentDidMount() {
    this._loadComplete();
  }
  render() {
    const { isLoading, newToDo, toDos } = this.state;
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
            value={newToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            onChangeText={this._comment}
            autoCorrect={false}
            onSubmitEditing={this._submit}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos)
              .reverse()
              .map((toDo) => (
                <Todo
                  key={toDo.id}
                  unCompleted={this._unCompleted}
                  completed={this._completed}
                  delTodo={this._delToDo}
                  updateTodo={this._updateTodo}
                  {...toDo}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  _comment = (text) => {
    this.setState({
      newToDo: text,
    });
  };
  _loadComplete = async () => {
    try {
      const toDos = await AsyncStorage.getItem("todos");
      const parseToDos = JSON.parse(toDos);
      this.setState({ isLoading: false, toDos: parseToDos });
    } catch (e) {
      console.log(e);
    }
  };
  _submit = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState((prevState) => {
        const ID = Date.now() * Math.floor(Math.random() * 20);
        const newTextObj = {
          [ID]: {
            id: ID,
            text: newToDo,
            isCompleted: false,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newTextObj,
          },
        };
        this._saveTodos(newState.toDos);
        return { ...newState };
      });
    }
  };
  _delToDo = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveTodos(newState.toDos);
      return { ...newState };
    });
  };
  _unCompleted = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      toDos[id].isCompleted = false;
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveTodos(toDos);
      return { ...newState };
    });
  };
  _completed = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      toDos[id].isCompleted = true;
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveTodos(toDos);
      return { ...newState };
    });
  };
  _updateTodo = (id, text) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      toDos[id].text = text;
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveTodos(toDos);
      return { ...newState };
    });
  };
  _saveTodos = (newTodo) => {
    const saveTodos = AsyncStorage.setItem("todos", JSON.stringify(newTodo));
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
