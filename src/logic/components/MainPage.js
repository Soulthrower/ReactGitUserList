import React from "react";
import MainCenterBlock from "./MainCenterBlock";
import RightDetailsPane from "./RightDetailPane";
import MOCK_DATA from "../models/api";

const MainPage = () => {
  return (
    <div>
      <MainCenterBlock></MainCenterBlock>
      <RightDetailsPane />
    </div>
  );
};

export default MainPage;
