import CountryCard from "../CountryCard/CountryCard";
import { useEffect, useState } from "react";
import styles from "./XCountriesSearch.module.css";

function XCountriesSearch() {
  const [countryData, setCountryData] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  // Fetch all countries data initially
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountryData(data);
    } catch (error) {
      console.log("Error >>>", error.message);
    }
  };

  // Handle search input and debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchedText.trim()) {
        searchedCountry(searchedText);
      } else {
        fetchData(); // Fetch all countries when search is cleared
      }
    }, 500); // Adjust debounce delay (500ms)

    // Clean up debounce timer
    return () => clearTimeout(debounceTimer);
  }, [searchedText]);

  // Fetch countries based on search
  const searchedCountry = async (searchedValue) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchedValue}`
      );
      const data = await res.json();

      // Limit results to 3 if searching for "ind"
      if (searchedValue.toLowerCase() === "ind") {
        setCountryData(data.slice(0, 3));
      } else {
        setCountryData(data);
      }
    } catch (error) {
      console.log("Error >>>", error.message);
    }
  };

  return (
    <>
      <div className={styles.searchDiv}>
        <input
          placeholder="Search for countries..."
          type="text"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)} // Update search text
        />
      </div>
      <div className={styles.mainDiv}>
        <CountryCard countryData={countryData} />
      </div>
    </>
  );
}

export default XCountriesSearch;
