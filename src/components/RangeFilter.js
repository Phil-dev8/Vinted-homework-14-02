import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 0;
const MAX = 500;

export const DEFAULT_RANGE_VALUES = [10, 100];

export const RangeFilter = ({ setRangeValues }) => {
  const [rangeDefaultValues, setRangeDefaultValues] =
    useState(DEFAULT_RANGE_VALUES);

  return (
    <Range
      step={5}
      min={MIN}
      max={MAX}
      values={rangeDefaultValues}
      onChange={(values) => setRangeDefaultValues(values)}
      onFinalChange={(values) => setRangeValues && setRangeValues(values)}
      renderTrack={({ props, children }) => (
        <div
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "50%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: rangeDefaultValues,
                colors: ["#ccc", " #2cb1ba", "#ccc"],
                min: MIN,
                max: MAX,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ index, props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            border: isDragged ? "" : "1px solid white",
            backgroundColor: "#2cb1ba",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-28px",
              color: "#fff",
              fontSize: "12px",
              fontFamily: "Maison Neue",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor: "#2cb1ba",
            }}
          >
            {rangeDefaultValues[index]}€
          </div>
        </div>
      )}
    />
  );
};
