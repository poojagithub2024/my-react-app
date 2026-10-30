import './CategoryFilter.css';
function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filters">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            selectedCategory === category
              ? 'category-filter active'
              : 'category-filter'
          }
          onClick={() => onCategoryChange(category)}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
