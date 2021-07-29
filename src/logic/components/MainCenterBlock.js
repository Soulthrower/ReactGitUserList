import { darken } from "@material-ui/core";
import React from "react";
import ListItem from "./ListItem";
import { listItems } from "../models/api";

const MainContentBlock = () => {
  let data = listItems().then((result) => {
    return result.data;
  });

  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return <ListItem name={item.name}></ListItem>;
      })}
    </div>
  );
};

export default MainContentBlock;
