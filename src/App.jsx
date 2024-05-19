import { useState, useRef } from 'react';
import './App.css';
import circle_icon from './assets/circle.png';
import cross_icon from './assets/cross.png';

const JogoDaVelha = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const boxRefs = Array(9).fill().map(() => useRef(null));

  const toggle = (e, num) => {
    if (lock || data[num]) return;
    
    const newData = [...data];
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    e.target.innerHTML = `<img src='${count % 2 === 0 ? cross_icon : circle_icon}' alt='icon' />`;
    
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Parabéns: <img src=${winner === "x" ? cross_icon : circle_icon} alt='winner' />`;
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    titleRef.current.innerHTML = 'Jogo da Velha com <span>React</span>';
    boxRefs.forEach(ref => {
      ref.current.innerHTML = "";
    });
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Jogo da Velha com <span>React</span></h1>
      <div className='board'>
        {boxRefs.map((ref, index) => (
          <div
            key={index}
            className='boxes'
            ref={ref}
            onClick={(e) => toggle(e, index)}
          ></div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Resetar</button>
    </div>
  );
};

export default JogoDaVelha;