import styles from "./CountryCard.module.css";
import PropTypes from "prop-types";
function CountryCard({ countryData }) {
  return (
    <>
      {countryData.map((country) => (
        <div key={country.flag} className={styles.countryCard}>
          <img src={country.flags.png} alt={country.countryName} />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </>
  );
}

// Prop validation for coming prop 'countryData'
CountryCard.propTypes = {
  countryData: PropTypes.array.isRequired,
};
export default CountryCard;
