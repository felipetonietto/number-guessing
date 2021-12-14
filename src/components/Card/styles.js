import styled, { css } from "styled-components";

export const Background = styled.div`
  background-color: rgba(238, 238, 238, 1);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TitleText = styled.text`
  margin-top: 20px;
  font-size: 36px;
  color: rgba(239, 108, 0, 1);
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Text = styled.text`
  margin-top: 20px;
  font-size: 16px;
  ${({ primary, secundary }) =>
    primary
      ? css`
          color: rgba(255, 102, 0, 1);
        `
      : secundary
      ? css`
          color: rgba(50, 191, 0, 1);
        `
      : css`
          color: rgba(204, 51, 0, 1);
        `}
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
`;

export const TextContainer = styled.div`
  margin-bottom: -10px;
  margin-top: 30px;
`;

export const ButtonText = styled.text`
  /* font-size: 36px; */
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
`;

export const Numbers = styled.text`
  font-size: 100px;
  font-family: "Technology-Bold";
  font-weight: 600;
  z-index: 2;
  text-align: right;
  position: absolute;
  display: inline-block;
  right: 0;
  top: 0;

  ${({ rightNumber, numberError }) =>
    rightNumber
      ? css`
          color: rgba(50, 191, 0, 1);
        `
      : numberError
      ? css`
          color: rgba(204, 51, 0, 1);
        `
      : css`
          color: black;
        `}
`;
export const Char = styled.div`
  margin: 0 2px;
  height: 100px;
  position: relative;
  display: inline-block;
  flex: 1;
`;

export const Placeholder = styled.text`
  font-size: 100px;
  color: rgba(221, 221, 221, 1);
  font-family: "Technology-Bold";
  font-weight: 600;
  position: relative;
  text-align: right;
  display: inline-block;
  z-index: 1;
`;

export const NumbersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 60px;
  margin-top: 10px;
`;

export const HorizontalRule = styled.hr`
  color: rgba(207, 207, 207, 1);
  background-color: rgba(207, 207, 207, 1);
  border: 1px solid rgba(207, 207, 207, 1);
  height: 1px;
  width: 200px;
  margin-right: 40px;
  margin-left: 40px;
  @media (min-width: 768px) {
    width: 290px;
  }
`;

export const SubmitButton = styled.button`
  margin-left: 10px;
  background-image: linear-gradient(
    rgba(239, 108, 0, 1),
    rgba(192, 102, 28, 1)
  );
  border: 1px solid rgba(255, 102, 0, 1);
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: default;
          opacity: 0.5;
        `
      : css`
          &:active {
            transform: scale(0.9);
          }
          &:hover {
            opacity: 0.9;
          }
        `}
`;

export const SubmitContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const NewRoundButton = styled.button`
  margin-bottom: 50px;
  background-image: linear-gradient(
    rgba(67, 72, 84, 1),
    rgba(158, 158, 158, 1)
  );
  align-items: center;
  display: flex;
  border: 1px solid rgba(67, 72, 84, 1);
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

export const Input = styled.input`
  border: 1px solid rgba(255, 102, 0, 1);
  border-radius: 5px;
  padding: 10px;
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: default;
          opacity: 0.5;
        `
      : css`
          &:active {
            transform: scale(0.9);
          }
          &:hover {
            opacity: 0.9;
          }
        `}
`;

export const Loader = styled.div`
  margin-right: 5px;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid rgba(67, 72, 84, 1); /* Blue */
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 2s linear infinite;
`;
