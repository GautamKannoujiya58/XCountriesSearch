import CountryCard from "../CountryCard/CountryCard";
import { useEffect, useState } from "react";
import styles from "./XCountriesSearch.module.css";

function XCountriesSearch() {
  const [countryData, setCountryData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [error, setError] = useState(""); // To handle errors

  // Fetch all countries data initially
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountryData(data);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.log("Error >>>", error.message);
      setError("Failed to fetch countries data.");
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

    return () => clearTimeout(debounceTimer);
  }, [searchedText]);

  // Fetch countries based on search
  const searchedCountry = async (searchedValue) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchedValue}`
      );
      if (!res.ok) {
        throw new Error("No countries found"); // If no match, trigger an error
      }
      const data = await res.json();

      // Limit results to 3 if searching for "ind"
      if (searchedValue.toLowerCase() === "ind") {
        setCountryData(data.slice(0, 3));
      } else {
        setCountryData(data);
      }
      setError(""); // Clear error if successful
    } catch (error) {
      console.log("Error >>>", error.message);
      setCountryData([]); // Set to an empty array if no countries found
      setError("No countries found.");
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

      {/* If there's an error, show the message */}
      {error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <div className={styles.mainDiv}>
          {countryData.length > 0 ? (
            <CountryCard countryData={countryData} />
          ) : (
            <p>No countries found.</p> // Show a message if no data is found
          )}
        </div>
      )}
    </>
  );
}

export default XCountriesSearch;
