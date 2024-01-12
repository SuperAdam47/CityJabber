import { useState, useEffect } from "react";

const CategoryFilter = ({handleCategoryLevel}) => {
  const [categorySet, setCategorySet] = useState([]);
  const [categoryLevel, setCategoryLevel] = useState([
    {
      active: false,
      category: 'SIC2Category'
    },
    {
      active: false,
      category: 'SIC4Category'
    },
    {
      active: false,
      category: 'SIC8Category'
    },
  ]);

  const [categories, setCategories] = useState([
    { label: "Legal" },
    { label: "Food" },
    { label: "Healthcare" },
    { label: "Legal Services" },
    { label: "Meats and Meat Products" },
    { label: "Restaurants & Bars" },
    { label: "Restaurants" },
    { label: "Grills (Eating Places)" },
    { label: "Church of Christ" },
  ]);

  const handleCategoryClick = (i) => {
    let newCategoryLevel = [...categoryLevel];
    newCategoryLevel[i].active = !newCategoryLevel[i].active;
    setCategoryLevel(newCategoryLevel);
    handleCategoryLevel(categoryLevel);
  }

  return (
    <>
      {categoryLevel.map((c, i) => (
        <div className="col-auto" key={i}>
          <button
            className={`button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100 ${
              c.active ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(i)}
          >
            {c.category.slice(0,4)}
          </button>
        </div>
      ))}

      {categories.map((category, index) => (
        <div className="" key={index}>
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">{category.label}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryFilter;
