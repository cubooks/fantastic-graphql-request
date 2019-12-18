# fantastic-graphql-request
Build queries to graphql conveniently and quickly!

## Install

```yarn add fantastic-graphql-request``` or ```npm i fantastic-graphql-request```

## Usage

1) Default example:

```javascript
import SchemaFetchRequest from 'fantastic-graphql-request';

const schema = new SchemaFetchRequest();

const getUserReq = const schema.generateRequest({
        action: 'getUserInfo',
        responseFields: ['id', 'email'],
});

// Result:
// {
//  "body": "{\\"query\\":\\"query Query{getUserInfo{id,email}}\\",\\"variables\\":{}}",
//  "credentials": "include",
//  "headers": Object {
//    "Accept": "application/json",
//    "Content-Type": "application/json",
//  },
//  "method": "post",
// }


// note: you can use any fetch
fetch('/graphql', getUserReq);

```

2) Custom type example:

```javascript
import SchemaFetchRequest from 'fantastic-graphql-request';

const schema = new SchemaFetchRequest({ type: 'mutation Mutation' });

const updateUserProfileReq = schema.generateRequest({
  action: 'updateUserProfile',
  variables: [{ name: 'data', type: 'UserProfileAttributesType' }],
  responseFields: [
      'profileWrited',
      [
          'profile',
          [
              'firstName',
              'lastName',
              'nickName',
              'gender',
              'photoId',
              'wins',
              'losses',
              'draws',
              'weight',
              'city',
              'tapologyLink',
              'sherdogLink',
          ],
      ],
  ],
  data: { data: [] },
});
   
// Result:   
// {
//  "body": "{\\"query\\":\\"mutation Mutation($data: UserProfileAttributesType){updateUserProfile(data: $data){profileWrited,profile{firstName,lastName,nickName,gender,photoId,wins,losses,draws,weight,city,tapologyLink,sherdogLink}}}\\",\\"variables\\":{\\"data\\":[]}}",
//  "credentials": "include",
//  "headers": Object {
//    "Accept": "application/json",
//    "Content-Type": "application/json",
//  },
//  "method": "post",
// }

// note: you can use any fetch
fetch('/graphql', updateUserProfileReq);

```

## Paramets

todo...
