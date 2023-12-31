import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding:20
  },
  container1: {
    flex: 1,
    //justifyContent: "space-between",
    //flexDirection: "row"
  },
  containerSub: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 2,
    fontSize: 18,
    borderRadius: 6
  },
  inputs: {
    flexBasis: "48%",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: "#3B5998",
    fontSize: 18,
    borderRadius: 6
  },
  animatedCircular: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  bar:{
    addingTop: 15, 
    margin:0,
    padding: 100,
  
  }

  
});
