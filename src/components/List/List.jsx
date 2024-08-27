import React, { useState, useEffect, useRef } from "react";
import './List.css'
const animals = [
  { type: `turtle`, icon: `🐢` },
  { type: `octopus`, icon: `🐙` },
  { type: `fish`, icon: `🐠` },
  { type: `flamingo`, icon: `🦩` },
  { type: `penguin`, icon: `🐧` },
];

export default function List() {
  const [list, setList] = useState(animals);
  const [size, setSize]= useState('25px')
  useEffect(() => {
    const intervalId = setInterval(() => {
      setList((list) => {
        
        const inactItems = list.filter((item) => !item.active);

        if (inactItems.length === 0) {
          clearInterval(intervalId); 
          return list;
        }

        
        const randomIndex = Math.floor(Math.random() * inactItems.length);
        const randomItem = inactItems[randomIndex];
        console.log(`Random item : ${randomItem.type} ${randomItem.icon}`);
        const updatedList = list.map((item) =>
        
          item === inactItems[randomIndex] ? { ...item, active: true } : item
          
        );
        

        return updatedList;
      });
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th style={{fontSize:size}}>Name</th>
          <th style={{fontSize:size}}>Icons</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={index} className={item.active ? "active" : ""}>
            <td style={{fontSize:size}}>{item.type}</td>
            <td style={{fontSize:size}}>{item.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}