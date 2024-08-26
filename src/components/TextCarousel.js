// import React, { useState, useEffect } from 'react';
// import '../styles/TextCarousel.css'; // Import your CSS file for styling

// const TextCarousel = ({ components, interval = 6000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
//     }, interval);

//     return () => clearInterval(intervalId);
//   }, [components, interval]);

//   return (
//     <div className="text-slider">
//       <div className="text-slider-inner">
//         {components.map((Component, index) => (
//           <div
//             key={index}
//             className={`text-slide ${index === currentIndex ? 'active' : ''}`}
//           >
//            <h1>{ Component.header} </h1>
//            <p>{Component.description}</p>
// <ul>
//   {Component.list.map((listItem, index) => (
//     <li key={index}>{listItem}</li>
//   ))}
// </ul>

           
          
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         {components.map((_, index) => (
//           <div
//             key={index}
//             className={`pagination-item ${index === currentIndex ? 'active' : ''}`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TextCarousel;

import React, { useState, useEffect } from 'react';
import '../styles/TextCarousel.css'; // Import your CSS file for styling

const TextCarousel = ({ components, interval = 6000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [components, interval]);

  return (
    <div className="text-slider">
       
      <div className="text-slider-inner">
       
            <h1>{components[currentIndex].header}</h1>
            <p>{components[currentIndex].description}</p>
            <ul>
              {components[currentIndex].list.map((listItem, index) => (
                <li key={index}>{listItem}</li>
              ))}
            </ul>

            <div className='slidebutons'>
                {components[currentIndex].buttons.map((button, index)=>(
                    <button>{button.buttonText}</button>
                ))}
            </div>
      
    
      </div>
      <div className="pagination">
        {components.map((_, index) => (
          <div
            key={index}
            className={`pagination-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >

          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
