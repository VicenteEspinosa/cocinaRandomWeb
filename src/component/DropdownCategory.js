import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";


const DropdownCategory = ({categories}) => {

    const options = categories

    const [selected, setSelected] = useState([]);

    return (
        <div>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
        />
        </div>
    );
};

export default DropdownCategory;