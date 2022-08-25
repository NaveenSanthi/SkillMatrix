import "./App.css";
import { Select, Button } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import TableComp from "./TableComp";
function App() {
  const [selectedValue, setSelectedValue] = useState();
  const [displayOptions, setDisplayOptions] = useState([]);
  const [allValue, setAllValue] = useState([]);
  const [dummyValue, setDummyValue] = useState([]);
  const fruit = ["apple", "mango", "papaya"];
  const ChangeHandler = (value) => {
    setDummyValue([]);
    setSelectedValue(value);

    if (value === "apple") {
      setDisplayOptions(["apple1", "apppl2"]);
    }
    if (value === "mango") {
      setDisplayOptions(["mango1", "mango2"]);
    }
    if (value === "papaya") {
      setDisplayOptions(["papaya1", "papaya2"]);
    }
  };

  const multipleSelectEvent = (value) => {
    setDummyValue(value);
    console.log(value);
  };
  return (
    <div className="App">
      <Select
        value={selectedValue}
        onChange={ChangeHandler}
        placeholder="Select the Fruit"
        style={{ width: "30%", margin: "10px" }}
      >
        {fruit.map((fruit, index) => {
          return (
            <Select.Option key={index} value={fruit}>
              {fruit}
            </Select.Option>
          );
        })}
      </Select>

      <Select
        mode="multiple"
        placeholder="Select the Fruit"
        allowClear
        autoClearSearchValue={true}
        value={dummyValue}
        style={{ width: "30%" }}
        onChange={multipleSelectEvent}
      >
        {displayOptions.map((fruits, indexs) => {
          return (
            <Select.Option key={indexs + 12} value={fruits}>
              {fruits}
            </Select.Option>
          );
        })}
      </Select>
      <Button type="primary">Upload</Button>
      <TableComp value={dummyValue}></TableComp>
    </div>
  );
}

export default App;
