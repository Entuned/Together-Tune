import axios from 'axios';
import React from 'react';

//we are going to utilize two api calls to get the books by genre then grab their title page

function grabBooksByGenre(genre) {
  return axios.get('http://openlibrary.org/subjects/horror.json');
}