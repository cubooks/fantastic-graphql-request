import SchemaFetchRequest from '../src/index';

test('generate default type schema', () => {
    const schema = new SchemaFetchRequest();

    const result = schema.generateRequest({
        action: 'getUserInfo',
        responseFields: ['id', 'email'],
    });

    expect(result).toMatchSnapshot();
});

test('generate custom type schema', () => {
    const schema = new SchemaFetchRequest({
        type: 'mutation Mutation',
    });

    const result = schema.generateRequest({
        action: 'registerUser',
        variables: [{ name: 'data', type: 'UserAttributesType' }],
        responseFields: ['id'],
        data: { data: [] },
    });

    expect(result).toMatchSnapshot();
});

test('generate three response fields schema', () => {
    const schema = new SchemaFetchRequest({
        type: 'mutation Mutation',
    });

    const result = schema.generateRequest({
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

    expect(result).toMatchSnapshot();
});