import React from "react";
import PropTypes from "prop-types";

const ListItem = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
};

ListItem.propTypes = {
  name: PropTypes.string,
};

export default ListItem;
