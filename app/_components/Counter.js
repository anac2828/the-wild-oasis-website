'use client';
// This is a client component becuase it uses the useState hook.
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

export default Counter;
