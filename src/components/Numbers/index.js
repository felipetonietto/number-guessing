import React from "react";

import * as Styled from "./styles";

export default function Numbers({ value }) {
  return (
    <>
      <Styled.NumberContainer>
        <Styled.NumberDiv>
          <Styled.NumberP placeholder>{value}</Styled.NumberP>
        </Styled.NumberDiv>
      </Styled.NumberContainer>
    </>
  );
}
