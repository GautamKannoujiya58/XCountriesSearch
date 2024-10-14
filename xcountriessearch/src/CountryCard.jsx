import PropTypes from "prop-types";

const CountryCard = ({ countryData }) => {
  return (
    <>
      {countryData.map((country) => (
        <div key={country.flag} className="countryCard">
          {/* Display flag using the img element */}
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="flag"
          />
          {/* Display country name */}
          <p>{country.name.common}</p>
        </div>
      ))}
    </>
  );
};

CountryCard.propTypes = {
  countryData: PropTypes.array.isRequired,
};

export default CountryCard;
