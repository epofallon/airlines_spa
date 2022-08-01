import React from 'react';

const Select = ({ filter, options, allTitle, value }) => {
  const onChange = event => {
    event.preventDefault();
    filter(event.target.value);
  };

  const optionsList = options.map(({name, active, id='', code=''}, idx) => (
    <option key={`${name}-${idx}`} disabled={!active} value={id || code}>
      {name}
    </option>
  ));

  optionsList.unshift(<option key='all'>{allTitle}</option>);
  
  return (
    <select onChange={onChange} value={value}>
      {optionsList}
    </select>
  );
};

export default Select;