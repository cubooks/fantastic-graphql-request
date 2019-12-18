(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.graphqlRequest = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var SchemaFetchRequest = /** @class */ (function () {
        /**
         * Contructor
         * @param context
         * @param fetch
         * @param params
         * @param customOptions
         */
        function SchemaFetchRequest(context) {
            var _this = this;
            if (context === void 0) { context = false; }
            this.defaultOptions = {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };
            this.context = {
                type: 'query Query',
            };
            /**
             * Generate a line with the body of the request GraphQL
             * @param responseFields
             */
            this.getResponseFields = function (responseFields) {
                return responseFields
                    .map(function (field) {
                    if (typeof field === 'object') {
                        return field[0] + "{" + _this.getResponseFields(field[1]) + "}";
                    }
                    return field;
                })
                    .join(',');
            };
            this.generateRequest = function (params, customOptions) {
                if (customOptions === void 0) { customOptions = {}; }
                var type = _this.context.type;
                var action = params.action, variables = params.variables, responseFieldsArray = params.responseFields, dataRequest = params.data;
                var attributes = '';
                var props = '';
                if (variables) {
                    // collect attributes of incoming data
                    attributes = variables
                        .map(function (variable) { return "$" + variable.name + ": " + variable.type; })
                        .join(',');
                    attributes = attributes ? "(" + attributes + ")" : attributes;
                    // collect throwable variables in action
                    props = variables
                        .map(function (variable) { return variable.name + ": $" + variable.name; })
                        .join(',');
                    props = props ? "(" + props + ")" : props;
                }
                // collect response fields
                var responseFields = _this.getResponseFields(responseFieldsArray);
                // collect the final object to send to the server
                var resultOptions = __assign(__assign(__assign({}, _this.defaultOptions), customOptions), { 
                    // collect body from the available parameters
                    body: JSON.stringify({
                        query: "" + type + attributes + "{" + action + props + "{" + responseFields + "}}",
                        variables: __assign({}, dataRequest),
                    }) });
                return resultOptions;
            };
            if (context) {
                this.context = context;
            }
        }
        return SchemaFetchRequest;
    }());

    return SchemaFetchRequest;

})));
