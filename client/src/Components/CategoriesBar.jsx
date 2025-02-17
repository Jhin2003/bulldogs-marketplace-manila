
import useCategories from '../hooks/useCategories';
import  { useState } from 'react';
import './CategoryBar.scss'
import FlexRow from './Layout/FlexRow';

const CategoryTable = ({setSelectedCategory}) => {

  // Assuming useCategory returns an array of categories
  const {categories, loading, error} = useCategories()
  
  const [selectedCategory, setSelected] = useState(null);

  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.id === category.id) {
      // If the same category is clicked again, deselect it
      setSelected(null);
      setSelectedCategory(null);  // Optionally update parent state
    } else {
      // Otherwise, select the category
      setSelected(category);
      setSelectedCategory(category); // Update parent state with the selected category
    }
  };
  return (
    <div className="category-bar">
    
      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory && selectedCategory.id === category.id ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))
      ) : (
        <div>No categories available.</div>
      )}
     
    </div>
  );
};

export default CategoryTable;