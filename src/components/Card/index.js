import React, { useEffect, useState } from "react";

import axios from "axios";

import * as Styled from "./styles";

import { CgRedo } from "react-icons/cg";

export default function Card() {
  // Os states criados abaixo com o hook useState são os seguintes:
  // a) number: número trazido da requisição
  // b) rightNumber: booleano caso o número do palpite e o númer da requisição sejam iguais
  // c) greaterGuessedNumber: booleano caso o número do palpite seja maior que o númer da requisição
  // d) guessedNumber: número do palpite
  // e) inputNumber: número do input
  // f) numberError: booleano para erro na requisição utilizado como prop para o css
  // g) loading: booleano para carregamento enquanto se faz a requisição

  const [number, setNumber] = useState(null);
  const [rightNumber, setRightNumber] = useState(false);
  const [greaterGuessedNumber, setGreaterGuessedNumber] = useState(false);
  const [guessedNumber, setGuessedNumber] = useState();
  const [inputNumber, setInputNumber] = useState();
  const [numberError, setNumberError] = useState(false);
  const [loading, setLoading] = useState(false);

  //Função na qual é feita a requisição do número aleatório, na qual são setados alguns states

  async function getNumber() {
    setLoading(true);
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
      setNumber(error.response.data.StatusCode);
    } finally {
      setLoading(false);
    }
  }

  //Função de submit para o palpite

  function submitGuess() {
    setGuessedNumber(+inputNumber);
    setInputNumber("");
  }

  //useEffect que observa o número e o número do palpite (conforme dependências), a fim de setar alguns states

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

        {/* A fim de acertar o display de número de sete segmentos conforme arte do Figma, foi feito número por número, por isso o map().
        O css contempla posição absoluta para o placeholder e posição relativa parar o número do palpite (ou erro),
        eis que o placeholder sempre será um 8, que ocupa o espaço máximo. 
        
        O Placeholder possui praticamente os mesmos atributos de css que o Numbers, com a diferença acima descrita e a cor da fonte.
        Foram passadas duas propriedades, a fim de alterar a cor dos números: sucesso ou erro, sendo que no css há a terceira opção
        do ternário (preto).
        */}

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

      {/* O botão de nova partida somente renderiza caso não haja número para ser palpitado,
          caso o usuário tenha descoberto o número ou caso haja o erro na requisição. */}

      {!number || +guessedNumber === +number || +number === +502 ? (
        <div>
          <Styled.NewRoundButton onClick={getNumber}>
            {loading ? (
              <>
                <Styled.Loader></Styled.Loader>
                <Styled.ButtonText> Carregando...</Styled.ButtonText>
              </>
            ) : (
              <>
                <CgRedo size={20} color="white" />
                <Styled.ButtonText>NOVA PARTIDA</Styled.ButtonText>
              </>
            )}
          </Styled.NewRoundButton>
        </div>
      ) : null}

      {/* Input simples do HTML alterado somente no Styled Components.
      Opção por envolver o input e o botão num form, para o usuário poder
      somente pressionar enter para o submit, o que torna mais agradável
      do que apertar o botão ENVIAR */}

      <Styled.SubmitContainer>
        <form>
          <Styled.Input
            type="number"
            value={inputNumber}
            placeholder="Digite o palpite"
            onChange={({ target }) => {
              if (target.value < 0) {
                return;
              }
              if (target.value > 300) {
                return;
              }
              setInputNumber(() => target.value);
            }}
            disabled={!number || numberError}
          ></Styled.Input>
          <Styled.SubmitButton
            onClick={submitGuess}
            disabled={!inputNumber || !number || numberError}
          >
            <Styled.ButtonText>ENVIAR</Styled.ButtonText>
          </Styled.SubmitButton>
        </form>
      </Styled.SubmitContainer>
    </Styled.Background>
  );
}
