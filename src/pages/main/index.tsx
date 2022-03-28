import React, { useState, useEffect } from 'react';

import { useStoreProvider } from '../../context/storeContext';

function Main() {
  return (
    <h1>Main</h1>
  );
}

export default useStoreProvider(Main());
