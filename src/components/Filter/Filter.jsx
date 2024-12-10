import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import styles from "./Filter.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilterChange = (e) => {
    dispatch(setNameFilter(e.target.value));
  };

  return (
    <div className={styles.filter}>
      <Input
        placeholder="İsme veya Telefon Numarasına Göre Ara"
        value={filter}
        onChange={handleFilterChange}
        allowClear
      />
    </div>
  );
};

export default Filter;
