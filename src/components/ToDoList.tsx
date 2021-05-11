import React, { FunctionComponent } from "react";

import { Item } from "../models/items";
import { ListItem } from "./ToDoItem";


interface Props {
  items: Item[];
  onDelete: (item: Item) => void;
}

export const ToDoList: FunctionComponent<Props> = ({ items, onDelete }) => (
  <ul className="paddingLeftTodo">
    {items.map(item=> (<ListItem item={item} onDelete={onDelete} />))}
  </ul>
);