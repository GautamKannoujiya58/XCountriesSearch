import styles from "./App.module.css";
import CountryCard from "./CountryCard";
import { useEffect, useState } from "react";

function App() {
  // State to hold the fetched country data
  const [countryData, setCountryData] = useState([]);

  // State to store the text typed by the user in the search input
  const [typedText, setTypedText] = useState("");

  // state to store the timeout ID for debouncing
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Fetch all countries when the page loads
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch all countries
  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountryData(data);
    } catch (error) {
      console.log("Error >>>", error.message);
    }
  };

  // Function to fetch searched countries based on user input
  const fetchSearchedCountry = async (typedText) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${typedText}`
      );
      const searchedData = await res.json();

      if (searchedData.status === 404 || searchedData.length === 0) {
        setCountryData([]);
      } else {
        setCountryData(searchedData);
      }
    } catch (error) {
      console.log("Error >>>", error.message);
      setCountryData([]);
    }
  };

  // Debounce mechanism to delay the API call until user stops typing
  const handleChange = (e) => {
    const text = e.target.value.trim();
    setTypedText(text);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Only search if the user has typed (not for space and all)
    if (text.length > 0) {
      // fetch the API endpoint only user stops typing for a given seconds
      const newTimeout = setTimeout(() => fetchSearchedCountry(text), 2000);

      // Store the timeout ID to clear it if the user types again within 1 second
      setDebounceTimeout(newTimeout);
    } else {
      // If the input is cleared, fetch all countries again
      fetchData();
    }
  };

  // fetch searched country

  // console.log("countryData >>>", countryData);
  // console.log("typedText >>>", typedText);

  return (
    <>
      <h1>XCountries Search</h1>
      <input
        type="text"
        placeholder="Search for countries"
        value={typedText}
        onChange={handleChange}
      ></input>
      <div className={styles.countryCard}>
        <CountryCard countryData={countryData} />
      </div>
    </>
  );
}

export default App;
