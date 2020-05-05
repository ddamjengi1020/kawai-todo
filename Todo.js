import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class Todo extends React.Component {
  state = {
    isEdit: false,
    isComplete: false,
  };
  render() {
    const { isComplete } = this.state;
    return (
      <View style={styles.content}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isComplete ? styles.complete : styles.unComplete,
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Hello, This is Todo area</Text>
        <Button title={"📐"} color={"white"} style={styles.editBtn} />
      </View>
    );
  }
  _toggleComplete = () => {
    this.setState((prestate) => {
      return { isComplete: !prestate.isComplete };
    });
  };
}

const styles = StyleSheet.create({
  content: {
    width: width - 60,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#bbb",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
  },
  complete: {
    borderColor: "#bbb",
  },
  unComplete: {
    borderColor: "#F23657",
  },
  text: {
    fontSize: 20,
  },
  editBtn: {},
});
