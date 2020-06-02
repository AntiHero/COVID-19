import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core'; 
import styles from './CountryPicker.module.scss';
import { fetchCountries } from '../../api/index';

const CountryPicker = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries() {
      const data = await fetchCountries();
      setCountries(data.countries);
    };

    getCountries();
  }, [])


  return (
    <FormControl className={styles.formControl}>
      <NativeSelect>
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;