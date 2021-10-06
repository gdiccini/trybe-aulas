import React, { useState, useEffect } from 'react';

function App() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100));
  const [messageOn, setMessageOn] = useState(false);

  const timer = () => {
    setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * 100));
    }, 10000);
  }

  // const handleMessage = () => {
  //   if (randomNumber % 3 === 0 || randomNumber % 5 === 0) {
  //     setMessageOn(true);
  //   }
  // }

  useEffect(() => {
    timer();
  }, [])

  // useEffect(() => {
  //   handleMessage();
  // }, [randomNumber])

  return (
    <div className="App">
      <h1>{randomNumber}</h1>
      {(messageOn) && <h2>Acerto</h2>}
      {console.log(randomNumber)}
      {console.log(messageOn)}
    </div>
  );
}

export default App;
