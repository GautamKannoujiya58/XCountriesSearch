import "./App.css"; // Import global CSS
import CountryCard from "./CountryCard";
import { useEffect, useState } from "react";

function App() {
  // State to hold the fetched country data
  const [countryData, setCountryData] = useState([]);

  // State to store the text typed by the user in the search input
  const [typedText, setTypedText] = useState("");

  // State to store the timeout ID for debouncing
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
      console.error("Error >>>", error.message);
    }
  };

  // Function to fetch searched countries based on user input
  const fetchSearchedCountry = async (searchText) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const searchedData = await res.json();

      if (searchedData.status === 404 || searchedData.length === 0) {
        setCountryData([]);
      } else {
        // Limit to 3 results when searching for "ind"
        if (searchText.toLowerCase() === "ind") {
          setCountryData(searchedData.slice(0, 3));
        } else {
          setCountryData(searchedData);
        }
      }
    } catch (error) {
      console.error("Error >>>", error.message);
      setCountryData([]);
    }
  };

  // Debounce mechanism to delay the API call until the user stops typing
  const handleChange = (e) => {
    const text = e.target.value;
    setTypedText(text);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const trimmedText = text.trim();

    if (trimmedText.length > 0) {
      const newTimeout = setTimeout(
        () => fetchSearchedCountry(trimmedText),
        1000
      );
      setDebounceTimeout(newTimeout);
    } else {
      fetchData();
    }
  };

  return (
    <>
      <h1>XCountries Search</h1>
      {/* Input field for searching */}
      <input
        type="text"
        placeholder="Search for countries"
        value={typedText}
        onChange={handleChange}
      />
      {/* Container for country cards */}
      <div className="countryCardContainer">
        {/* Pass the countryData prop to the CountryCard component */}
        <CountryCard countryData={countryData} />
      </div>
    </>
  );
}

export default App;
