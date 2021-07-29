import React, { useState } from "react";

const DeadField = ({ value }) => {
  return <span>{value}</span>;
};

const ToggledField = ({ name, value, setValue, readOnly, setReadOnly }) => {
  const enableReadOnly = (e) => {
    if (!readOnly) {
      setReadOnly(true);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      enableReadOnly();
    }
  };

  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnterKey}
      ></input>
      <button onClick={enableReadOnly}>Validate</button>
    </div>
  );
};

const EditableField = ({ name }) => {
  const [value, setValue] = useState("Charlie Chaplin");
  const [readOnly, setReadOnly] = useState(true);

  const disableReadOnly = (e) => {
    if (readOnly) {
      setReadOnly(false);
    }
  };

  return (
    <div onClick={disableReadOnly}>
      <span>{name}</span>
      <br />
      {readOnly ? (
        <DeadField value={value} />
      ) : (
        <ToggledField
          name={name}
          value={value}
          setValue={setValue}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
        />
      )}
    </div>
  );
};

export default EditableField;
