import React from 'react';
import PropTypes from 'prop-types';
import stule from './Section.module.css';

const Section = ({ children }) => <section>{children}</section>;

Section.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Section;
