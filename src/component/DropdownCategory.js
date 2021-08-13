import React from "react";
import MultiSelect from "react-multi-select-component";


const DropdownCategory = ({categories, selected, setSelected}) => {

    const options = categories

    return (
        <div>
        <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            // isLoading={true}
        />
        </div>
    );
};

export default DropdownCategory;