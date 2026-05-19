import styled from "styled-components";
import Heading from "./Heading";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10rem;
  width: auto;
  max-width: 12rem;
  border-radius: 50%;
`;

const Logo = () => {
  return (
    <StyledLogo>
      <Img src="/profile_logo.jpg" />
      <Heading as="h3">The Wild Oasis</Heading>
    </StyledLogo>
  );
};

export default Logo;
