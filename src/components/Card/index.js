import React, { useEffect, useState } from "react";

import axios from "axios";

import * as Styled from "./styles";

import { CgRedo } from "react-icons/cg";

export default function Card() {
  const [number, setNumber] = useState(null);
  const [rightNumber, setRightNumber] = useState(false);
  const [greaterGuessedNumber, setGreaterGuessedNumber] = useState(false);
  const [guessedNumber, setGuessedNumber] = useState();
  const [inputNumber, setInputNumber] = useState();
  const [numberError, setNumberError] = useState(false);

  async function getNumber() {
    setRightNumber(false);
    setGuessedNumber();
    try {
      const response = await axios.get(
        "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
      );
      setNumber(response.data.value);
      setNumberError(false);
    } catch (error) {
      setNumberError(true);
      setNumber(502);
    }
  }

  function submitGuess() {
    setGuessedNumber(inputNumber);
    setInputNumber("");
  }

  useEffect(() => {
    if (+guessedNumber === +number) {
      setRightNumber(true);
      setGreaterGuessedNumber(null);
      return;
    }
    if (guessedNumber > number) {
      setRightNumber(false);
      setGreaterGuessedNumber(true);
    } else {
      setRightNumber(false);
      setGreaterGuessedNumber(false);
    }
  }, [guessedNumber, number]);

  return (
    <Styled.Background className="d-flex justify-content-center align-center mt-5">
      <Styled.TitleText className="mt-3">QUAL É O NÚMERO?</Styled.TitleText>
      <Styled.HorizontalRule></Styled.HorizontalRule>
      <Styled.TextContainer>
        {rightNumber && <Styled.Text secundary>Você acertou!!!</Styled.Text>}
        {+number === +502 && <Styled.Text>ERRO</Styled.Text>}
        {greaterGuessedNumber && <Styled.Text primary>É menor</Styled.Text>}
        {!greaterGuessedNumber && guessedNumber && !rightNumber && (
          <Styled.Text primary>É maior</Styled.Text>
        )}
      </Styled.TextContainer>

      <Styled.NumbersContainer>
        {!guessedNumber && number !== 502 && (
          <Styled.Char>
            <Styled.Placeholder>8</Styled.Placeholder>
            <Styled.Numbers>0</Styled.Numbers>
          </Styled.Char>
        )}
        {+number === +502 && (
          <Styled.Char>
            <Styled.Placeholder>888</Styled.Placeholder>
            <Styled.Numbers numberError={numberError}>502</Styled.Numbers>
          </Styled.Char>
        )}
        {guessedNumber
          ?.toString()
          .split("")
          .map((item) => {
            return (
              <Styled.Char>
                <Styled.Placeholder>8</Styled.Placeholder>
                <Styled.Numbers
                  rightNumber={rightNumber}
                  numberError={numberError}
                >
                  {item}
                </Styled.Numbers>
              </Styled.Char>
            );
          })}
      </Styled.NumbersContainer>
      {!number || +guessedNumber === +number || +number === +502 ? (
        <div>
          <Styled.NewRoundButton onClick={getNumber}>
            <CgRedo size={20} color="white" />
            <Styled.ButtonText>NOVA PARTIDA</Styled.ButtonText>
          </Styled.NewRoundButton>
        </div>
      ) : null}
      <Styled.SubmitContainer>
        <Styled.Input
          type="number"
          value={inputNumber}
          placeholder="digite o palpite"
          onChange={({ target }) => {
            if (target.value < 0) {
              return;
            }
            if (target.value > 300) {
              return;
            }
            setInputNumber(() => target.value);
          }}
          disabled={!number}
        ></Styled.Input>
        <Styled.SubmitButton
          onClick={submitGuess}
          disabled={!inputNumber || !number}
        >
          <Styled.ButtonText>ENVIAR</Styled.ButtonText>
        </Styled.SubmitButton>
      </Styled.SubmitContainer>
    </Styled.Background>
  );
}
