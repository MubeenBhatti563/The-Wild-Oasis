import React from "react";
import styled, { css } from "styled-components";

type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3"; // 'as' is a special prop in styled-components
};

// Use a generic styled component (like h1) as the base
const StyledHeading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
  line-height: 1.4;
`;

const Heading = ({ children, as }: HeadingProps) => {
  // We pass the 'as' prop directly to the styled component
  return <StyledHeading as={as}>{children}</StyledHeading>;
};

export default Heading;
