import React, { useState, useEffect } from 'react';

import { useUserProvider } from '../context/userContext';

function Header() {
  return (
    <h2>Header</h2>
  );
}

export default useUserProvider(<Header />);
