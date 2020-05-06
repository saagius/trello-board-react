import styled from "styled-components";
import { __GRAY_SCALE } from "../layout/Theme";

interface ExtraProps {
    readonly width?: string;
};

export const Container = styled.div<ExtraProps>`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
  width: ${props => props.width || "auto"};
  position: relative;
  &:not(:first-child) {
    margin-left: 10px;
  }
  > a {
    color: black;
    text-decoration: none;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 32px;
`;

export const Description = styled.p`
  font-size: 15px;
`;

export const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 0.5em 0;
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 0;
`;

export const TomatoButton = styled(Button)<ExtraProps>`
  color: tomato;
  border-color: tomato;
  width: ${props => props.width || "auto"};
  a {
    padding: 0.25em 0;
    color: black;
    text-decoration: none;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const Form = styled.form`
  margin-top: 10px;
  > * {
    float: left;
    clear: both;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }
  input, textarea {
    margin-top: 10px;
    width: 200px;
    border: 1px solid darkgray;
    padding: 5px;
  }
  input {
    height: 24px;
  }
  textarea {
    height: 100px;
  }
  input[type=submit] {
    font-size: 14px;
    width: auto;
    cursor: pointer;
    padding: 2px 5px;
  }
`;