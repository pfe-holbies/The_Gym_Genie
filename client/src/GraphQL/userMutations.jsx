import { gql } from '@apollo/client';

const REGISTER_USER = gql`
   mutation RegisterUser($reg: reg!) {
    RegisterUser(test: $reg) {
      id
      username
      email
      token
    }
  }
`;

const LOG_USER = gql`
  mutation loginMutation($email: String!, $password: String!) {
    loginMutation(email: $email, password: $password)
  }
`;

export { REGISTER_USER, LOG_USER };
