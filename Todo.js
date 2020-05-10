import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      todoValue: props.text,
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    delTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    unCompleted: PropTypes.func.isRequired,
    completed: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };
  render() {
    const { isEdit, todoValue } = this.state;
    const { text, delTodo, id, isCompleted } = this.props;
    return (
      <View style={styles.content}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.complete : styles.unComplete,
            ]}
          />
        </TouchableOpacity>
        {isEdit ? (
          <TextInput
            style={[
              styles.text,
              styles.input,
              isCompleted ? styles.textComplete : styles.textUncomplete,
            ]}
            multiline={true}
            value={todoValue}
            returnKeyType={"done"}
            onChangeText={this._editChange}
          />
        ) : (
          <Text
            style={[
              styles.text,
              isCompleted ? styles.textComplete : styles.textUncomplete,
            ]}
            multiline={true}
          >
            {text}
          </Text>
        )}
        <View style={styles.actions}>
          {isEdit ? (
            <View>
              <TouchableOpacity onPressOut={this._onFinish}>
                <View style={styles.actionBtn}>
                  <Text>✅</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionContainer}>
              <TouchableOpacity onPressOut={this._onEdit}>
                <View style={styles.actionBtn}>
                  <Text>📝</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => delTodo(id)}>
                <View style={styles.actionBtn}>
                  <Text>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
  _toggleComplete = () => {
    const { completed, unCompleted, isCompleted, id } = this.props;
    if (isCompleted) {
      unCompleted(id);
    } else {
      completed(id);
    }
  };
  _onEdit = () => {
    const { text } = this.props;
    this.setState({
      isEdit: true,
      todoValue: text,
    });
  };
  _editChange = (text) => {
    this.setState({
      todoValue: text,
    });
  };
  _onFinish = () => {
    const { todoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, todoValue);
    this.setState({
      isEdit: false,
    });
  };
}

const styles = StyleSheet.create({
  content: {
    width: width - 60,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginRight: 15,
  },
  complete: {
    borderColor: "#bbb",
  },
  unComplete: {
    borderColor: "#F23657",
  },
  text: {
    width: width / 2,
    fontSize: 20,
  },
  textComplete: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  textUncomplete: {
    color: "black",
  },
  actions: {
    width: width / 2,
    flex: 1,
    alignItems: "center",
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  input: {
    width: width / 2,
    lineHeight: 19,
  },
});
