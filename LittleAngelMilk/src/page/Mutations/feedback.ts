import { gql } from "@apollo/client";

//Mutation to create feedback
export const FEEDBACK_MUTATION = gql`
  mutation Mutation($data: FeedbackCreateInput!) {
    createFeedback(data: $data) {
      comment
      createdAt
    }
  }
`;
