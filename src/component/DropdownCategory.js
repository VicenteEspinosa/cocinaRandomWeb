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
            overrideStrings={{
                "allItemsAreSelected": "Todas las categorías seleccionadas.",
                "clearSearch": "Limpiar busqueda",
                "noOptions": "Sin opciones",
                "search": "Buscar",
                "selectAll": "Marcar todo",
                "selectSomeItems": "Categorías..."
              }}
        />
        </div>
    );
};

export default DropdownCategory;