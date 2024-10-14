import styles from "./CountryCard.module.css";
import PropTypes from "prop-types";

const CountryCard = ({ countryData }) => {
  return (
    <>
      {/* Map over the countryData array to create a card for each country */}
      {countryData.length > 0 ? (
        countryData.map((country, index) => (
          <div key={index} className={styles.countryCard}>
            {/* Display flag using the img element */}
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className={styles.flag}
            />
            {/* Display country name */}
            <p>{country.name.common}</p>
          </div>
        ))
      ) : (
        <p>No countries found matching your search.</p>
      )}
    </>
  );
};
CountryCard.propTypes = {
  countryData: PropTypes.array.isRequired,
};

export default CountryCard;
