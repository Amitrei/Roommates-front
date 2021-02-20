import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories, createdCategoryRecieved } from "../../store/reducers/transactionsReducer";
import "../../styles/categoriesMenu.scss";
const CategoriesMenu = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.entities.transactions.categories);
  const divRef = useRef({});

  const categoryClicked = (i) => {
    for (let index in divRef.current) {
      divRef.current[index].classList.remove("clicked-category-btn");
    }
    divRef.current[i].classList.add("clicked-category-btn");
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, []);
  return (
    <div className="transaction-categories-container">
      <div className="categories-grid-container">
        {categories &&
          categories.map((c, i) => (
            <div
              ref={(ref) => (divRef.current[i] = ref)}
              key={i}
              className="category-btn"
              onClick={() => {
                dispatch(createdCategoryRecieved(c.categoryName));
                categoryClicked(i);
              }}>
              <img src={c.icon} />
              <h3>{c.categoryName}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesMenu;
