import styled, { css } from "styled-components";

export const NumberContainer = styled.div`
  margin: 5px 0;
`;

export const NumberDiv = styled.div`
  display: inline-block;
  position: relative;
`;

export const NumberP = styled.text`
  font-size: 100px;
  color: rgba(38, 42, 52, 1);
  position: relative;
  z-index: 100;

  ${(props) =>
    props.placeholder &&
    css`
      color: rgba(221, 221, 221, 1);
      position: absolute;
      top: 0;
      z-index: 50;
    `}
`;
