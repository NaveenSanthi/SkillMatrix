import React, { useState } from "react";
import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const data = [
  {
    key: "11",
    id: "1",
    name: "Tom",
    age: 22,
  },
  {
    key: "121",
    id: "2",
    name: "TomS",
    age: 21,
  },
  {
    key: "131",
    id: "3",
    name: "Jerry",
    age: 20,
  },
];

const data1 = [];
const TableComp = (props) => {
  if (props.value.length > 0) {
    let difference = props.value.filter((x) => !data1.includes(x));
    data1.push(...difference);
    console.log(data1);

    //

    // console.log(val);
  }
  data1.map((data) => {
    return {
      key: Math.random() * 1000,
      id: Math.random() * 100,
      name: data,
      age: Math.random() * 10000,
    };
  });
  const [dataSource, setDataSource] = useState(data1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const deleteHandler = (record) => {
    Modal.confirm({
      title: "Are you want to delete ?",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((data) => data.id !== record.id);
        });
      },
    });
  };
  const onEditHandler = (record) => {
    setIsEditing(true);
    setEditingRecord({ ...record });
  };
  const column = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditHandler(record);
              }}
            ></EditOutlined>
            <DeleteOutlined
              onClick={() => {
                deleteHandler(record);
              }}
            ></DeleteOutlined>
          </>
        );
      },
    },
  ];

  const btnClick = () => {
    const random = Math.random() * 1000;
    const newStudent = {
      key: random + 1,
      id: random,
      name: random + "name",
      age: random + 20,
    };
    setDataSource((pre) => [...pre, newStudent]);
  };
  return (
    <div>
      <Button onClick={btnClick}> Add Mew Student</Button>
      <Table columns={column} dataSource={dataSource}></Table>
      <Modal
        title="Edit Student"
        visible={isEditing}
        onOk={() => {
          setDataSource((previousValue) => {
            const index = dataSource.findIndex(
              (data) => data.key === editingRecord.key
            );
            let updateRecords = [...previousValue];
            updateRecords[index] = editingRecord;
            return updateRecords;
          });
          setIsEditing(false);
          setEditingRecord(null);
        }}
        onCancel={() => {
          setEditingRecord(null);
          setIsEditing(false);
        }}
      >
        <Input
          value={editingRecord?.id}
          onChange={(e) => {
            setEditingRecord((pre) => {
              return { ...pre, id: e.target.value };
            });
          }}
        ></Input>
        <Input
          value={editingRecord?.name}
          onChange={(e) => {
            setEditingRecord((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        ></Input>
        <Input
          value={editingRecord?.age}
          onChange={(e) => {
            setEditingRecord((pre) => {
              return { ...pre, age: e.target.value };
            });
          }}
        ></Input>
      </Modal>
    </div>
  );
};

export default TableComp;
