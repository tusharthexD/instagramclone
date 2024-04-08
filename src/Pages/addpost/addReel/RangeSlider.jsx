import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import '../../../App.css'; // Import the CSS file

function RangeSlider(props) {
  const [values, setValues] = useState([0, props.end]);
  const thumbnail = props.thumbnails

  const handleChange = (newValues) => {
    setValues(newValues);
    props.changeDuration(newValues)
  };

  return (
    <div className="range-container shadow-lg col-11 mx-2">
      <Range
        step={0.1}
        min={0}
        max={props.end}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="range-track"
            style={{
              ...props.style,
              backgroundColor: getTrackBackground({
                values,
                colors: ['#ccc', '#548BF4', '#ccc'],
                min: 0,
                max: 100,
              }),
            }}
          >
          {children}
          <div className='bg-dark range-track' >
            {thumbnail.map((thumbnail, index) => (
             <img key={index} src={thumbnail} className='sliderImg object-fit-fill' alt={`Thumbnail ${index}`} />))}
          </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            className="range-thumb"
            style={{
              ...props.style,
            }}
          >
            <div className="range-label">
              {values[index]}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default RangeSlider;
