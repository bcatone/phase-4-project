import styled from 'styled-components';

export const StyledNavBar = styled.div`
nav {
  text-align: center;
  display: inline-block;
  margin: 1rem 2rem;
  text-decoration: none;
  font-size: 1.5em;
  color: whitesmoke;
  border-bottom: 2px solid whitesmoke;
  transition: 0.1s;
}
nav a:hover,
nav a:active {
  color: grey;
  border-bottom: 2px solid ;
}
`;