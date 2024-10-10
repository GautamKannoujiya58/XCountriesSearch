import CountryCard from "../CountryCard/CountryCard";
import { useEffect, useState } from "react";
import styles from "./XCountriesSearch.module.css";

function XCountriesSearch() {
  const [countryData, setCountryData] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  // For fetching the URL data
  useEffect(() => fetchData(), []);
  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      // console.log("Data >>>", data);
      setCountryData(data);
    } catch (error) {
      console.log("Error >>>", error.message);
    }
  };

  // Debounce implement
  let debounceTimer;

  const handleSearch = (e) => {
    const searchedValue = e.target.value;
    setSearchedText(searchedValue);

    // Clear the previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Setting up new timer to wait before making API call
    debounceTimer = setTimeout(() => {
      searchedCountry(searchedValue);
    }, 3000);
  };
  const searchedCountry = async (searchedValue) => {
    if (searchedValue === "") {
      fetchData();
      return;
    }
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchedValue}`
      );
      const data = await res.json();
      console.log("particularCountry >>>", data);
      setCountryData(data);
    } catch (error) {
      console.log("Error>>>", error.message);
    }
  };

  // console.log("Data array >>>", countryData);
  return (
    <>
      <div className={styles.searchDiv}>
        <input
          placeholder="Search for countries..."
          type="text"
          value={searchedText}
          onChange={handleSearch}
        ></input>
      </div>
      <div className={styles.mainDiv}>
        <CountryCard countryData={countryData} />
      </div>
    </>
  );
}
export default XCountriesSearch;
