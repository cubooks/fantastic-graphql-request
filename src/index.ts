interface Params {
  action: string;
  responseFields: any[];
  variables?: { name: string; type: string }[];
  data?: Record<string, any>;
};

type Context = {
  type: string;
};

class SchemaFetchRequest {
  defaultOptions = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  context: Context = {
    type: 'query Query',
  };

  /**
   * Contructor
   * @param context
   * @param fetch 
   * @param params 
   * @param customOptions 
   */
  constructor(context: Context | false = false) {
    if (context) {
      this.context = context;
    }
  }

  /**
   * Generate a line with the body of the request GraphQL
   * @param responseFields
   */
  getResponseFields = (responseFields: string[]): string =>
    responseFields
      .map(field => {
        if (typeof field === 'object') {
          return `${field[0]}{${this.getResponseFields(field[1])}}`;
        }

        return field;
      })
      .join(',');

  generateRequest = (
    params: Params,
    customOptions: Record<string, any> = {},
  ): Record<string, any> => {
    const { type } = this.context;
    const {
      action,
      variables,
      responseFields: responseFieldsArray,
      data: dataRequest,
    } = params;
    let attributes = '';
    let props = '';

    if (variables) {
      // collect attributes of incoming data
      attributes = variables
        .map(variable => `$${variable.name}: ${variable.type}`)
        .join(',');
      attributes = attributes ? `(${attributes})` : attributes;

      // collect throwable variables in action
      props = variables
        .map(variable => `${variable.name}: $${variable.name}`)
        .join(',');
      props = props ? `(${props})` : props;
    }

    // collect response fields
    const responseFields = this.getResponseFields(responseFieldsArray);

    // collect the final object to send to the server
    const resultOptions = {
      ...this.defaultOptions,
      ...customOptions,
      // collect body from the available parameters
      body: JSON.stringify({
        query: `${type}${attributes}{${action}${props}{${responseFields}}}`,
        variables: { ...dataRequest },
      }),
    };

    return resultOptions;
  };
}

export default SchemaFetchRequest;
