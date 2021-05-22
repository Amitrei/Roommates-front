import { DateRangePicker } from "react-date-range";
import { parse, isAfter, isBefore, isEqual } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTransactions, clearFilteredTransactions } from "../../store/reducers/roomReducer";
import Button from "@material-ui/core/Button";
import DateRangeIcon from "@material-ui/icons/DateRange";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../../styles/filterByDate.scss";

const FilterByDate = () => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const minDate = useSelector((state) => state.entities.room.roomTransactions[0]);
  const maxDate = useSelector(
    (state) => state.entities.room.roomTransactions[state.entities.room.roomTransactions.length - 1]
  );
  const allTransactions = useSelector((state) => state.entities.room.roomTransactions);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const filter = () => {
    return allTransactions.filter(
      (trans) =>
        (isBefore(parse(trans.date, "dd/MM/yyyy", new Date()), dateRange[0].endDate) &&
          isAfter(parse(trans.date, "dd/MM/yyyy", new Date()), dateRange[0].startDate)) ||
        isEqual(parse(trans.date, "dd/MM/yyyy", new Date()), dateRange[0].endDate) ||
        isEqual(parse(trans.date, "dd/MM/yyyy", new Date()), dateRange[0].startDate)
    );
  };

  return (
    <div className="filter-container">
      <div
        className="filter-by-date-icon-btn"
        onClick={() => {
          setShowFilter(!showFilter);
        }}>
        <DateRangeIcon fontSize="large" />
      </div>
      <div className={showFilter ? "filter-by-date-container" : "hidden-filter"}>
        <DateRangePicker
          onChange={(item) => setDateRange([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          minDate={minDate && parse(minDate.date, "dd/MM/yyyy", new Date())}
          maxDate={maxDate && parse(maxDate.date, "dd/MM/yyyy", new Date())}
          // maxDate={new Date()}
          ranges={dateRange}
          direction="horizontal"
        />

        <div className="filter-by-date-btns">
          <Button
            className="filter-by-date-btn"
            variant="contained"
            color="primary"
            onClick={() => {
              setShowFilter(!showFilter);
              dispatch(filterTransactions(filter()));
            }}>
            submit
          </Button>
          <Button
            className="filter-by-date-btn"
            variant="contained"
            color="secondary"
            onClick={() => {
              setShowFilter(!showFilter);
              dispatch(clearFilteredTransactions());
            }}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterByDate;
