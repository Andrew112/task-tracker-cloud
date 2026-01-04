 import { ddbDocClient } from "../awsClient";
import { PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = "Tasks";

export const createTask = async (task) => {
  const params = { TableName: TABLE_NAME, Item: { id: uuidv4(), ...task } };
  return ddbDocClient.send(new PutCommand(params));
};

export const getTasks = async () => {
  const data = await ddbDocClient.send(new ScanCommand({ TableName: TABLE_NAME }));
  return data.Items;
};

export const updateTask = async (id, updates) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "set #title = :title, #desc = :desc, #status = :status",
    ExpressionAttributeNames: { "#title": "title", "#desc": "description", "#status": "status" },
    ExpressionAttributeValues: { ":title": updates.title, ":desc": updates.description, ":status": updates.status }
  };
  return ddbDocClient.send(new UpdateCommand(params));
};

export const deleteTask = async (id) => {
  return ddbDocClient.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
};
