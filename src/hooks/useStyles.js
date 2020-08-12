import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const StyledButton = styled(Button)`
  margin:1em;
  padding: 0.5em 1em;
  background-color: #90E0F3;
  font-weight: bold;
  &:hover{
      background-color: #75F4F4;
  }
`

const StyledInput = styled(TextField)`
  margin: 1em;
`

const StyledContainer = styled(Container)`
  margin-top: 5em;
  display: flex;
  flex-direction: column;

 `

export default function useStyles() {
  return {StyledButton,StyledInput,StyledContainer};
}
