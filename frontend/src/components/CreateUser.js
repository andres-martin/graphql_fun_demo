import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { from } from 'apollo-boost';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: {name: $name, email: $email}) {
      user {
        id
        name
        email
        postsCount
      }
      errors
    }
  }
`;

class CreateUser extends Component {
  state = {
    name: '',
    email: ''
  }

  onSubmit = (e, createUser) => {
    e.preventDefault();
    createUser({ variables: this.state });
    this.setState({ name: '', email: '' });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        update={this.props.onCreateUser}
      >
        {createUserMutation => (
          <div className="lg:fixed bottom-o left-0 w-full bg-white border-t border-gray-300">
            <form className="lg:px-8 pt-2 pb-2" onSubmit={e => this.onSubmit(e, createUserMutation)}>
              <div className="lg:flex flex-wrap flex-between items-center justify-center lg:p-0 p-6"></div>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}