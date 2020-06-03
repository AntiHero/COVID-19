import React, { useState, useEffect } from "react";
import styles from "./CountryPicker.module.scss";
import { fetchCountries } from "../../api/index";
import { Select } from "react-materialize";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries() {
      const data = await fetchCountries();

      setCountries(data.countries.map((country) => country.name));
    }

    getCountries();
  }, []);

  return (
    <div className={styles.formControlWrapper}>
      <Select
        id="Select-9"
        label="Choose country"
        onChange={(e) => handleCountryChange(e.target.value)}
        multiple={false}
        options={{
          classes: "",
          dropdownOptions: {
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          },
        }}
        value="2"
      >
       <option value="">Global</option>
          {countries.map((country, idx) => (
            <option value={country} key={idx}>
              {country}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default CountryPicker;
