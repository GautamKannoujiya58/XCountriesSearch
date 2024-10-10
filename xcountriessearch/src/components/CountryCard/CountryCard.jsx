import styles from "./CountryCard.module.css";
import PropTypes from "prop-types";

function CountryCard({ countryData }) {
  return (
    <>
      {countryData.map((country) => (
        <div key={country.name.common} className={styles.countryCard}>
          <img src={country.flags.svg} alt={`${country.name.common} flag`} />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </>
  );
}

CountryCard.propTypes = {
  countryData: PropTypes.array.isRequired,
};

export default CountryCard;
