import React from "react";
import styled, { keyframes } from "styled-components";

// 1. Smooth 360-degree rotation animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 2. Compact, Bootstrap-colored spinner element
const StyledSpinner = styled.div`
  /* Compact layout footprint */
  display: inline-block;
  width: 2rem;
  height: 2rem;

  /* Create the loading ring using borders */
  border: 0.25em solid rgba(13, 110, 253, 0.25); /* Bootstrap blue background track */
  border-top-color: #0d6efd; /* Bootstrap primary blue active tip */
  border-radius: 50%;

  /* Apply the animation */
  animation: ${spin} 0.75s linear infinite;

  /* Allows alignment next to text out of the box */
  vertical-align: text-bottom;
`;

// 3. Simple, self-contained component
const Spinner: React.FC = () => {
  return <StyledSpinner role="status" aria-label="Loading" />;
};

export default Spinner;
