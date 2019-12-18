"use strict";
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
***************************************************************************** */var __assign=function(){return(__assign=Object.assign||function(e){for(var t,n=1,s=arguments.length;n<s;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},SchemaFetchRequest=function(e){var t=this;void 0===e&&(e=!1),this.defaultOptions={method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"include"},this.context={type:"query Query"},this.getResponseFields=function(e){return e.map((function(e){return"object"==typeof e?e[0]+"{"+t.getResponseFields(e[1])+"}":e})).join(",")},this.generateRequest=function(e,n){void 0===n&&(n={});var s=t.context.type,i=e.action,a=e.variables,o=e.responseFields,r=e.data,c="",p="";a&&(c=(c=a.map((function(e){return"$"+e.name+": "+e.type})).join(","))?"("+c+")":c,p=(p=a.map((function(e){return e.name+": $"+e.name})).join(","))?"("+p+")":p);var u=t.getResponseFields(o);return __assign(__assign(__assign({},t.defaultOptions),n),{body:JSON.stringify({query:""+s+c+"{"+i+p+"{"+u+"}}",variables:__assign({},r)})})},e&&(this.context=e)};module.exports=SchemaFetchRequest;
