import React from 'react';
import { Button } from 'react-bootstrap';

export default function SearchBar() {
  return (
    <div className='main-search-bar'>
      <input type='text' />
      <Button variant='outline-dark'>
        Search
      </Button>
    </div>
  );
}
