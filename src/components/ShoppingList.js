import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemList, setItemList] = useState(items); 

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleItemFormSubmit(newItem) {
    setItemList([...itemList, newItem]); 
  }

  const itemsToDisplay = itemList
    .filter((item) => {
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        search={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;