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
var e=function(){return(e=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},t=function(t){var n=this;void 0===t&&(t=!1),this.defaultOptions={method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"include"},this.context={type:"query Query"},this.getResponseFields=function(e){return e.map((function(e){return"object"==typeof e?e[0]+"{"+n.getResponseFields(e[1])+"}":e})).join(",")},this.generateRequest=function(t,i){void 0===i&&(i={});var o=n.context.type,r=t.action,a=t.variables,s=t.responseFields,p=t.data,u="",c="";a&&(u=(u=a.map((function(e){return"$"+e.name+": "+e.type})).join(","))?"("+u+")":u,c=(c=a.map((function(e){return e.name+": $"+e.name})).join(","))?"("+c+")":c);var l=n.getResponseFields(s);return e(e(e({},n.defaultOptions),i),{body:JSON.stringify({query:""+o+u+"{"+r+c+"{"+l+"}}",variables:e({},p)})})},t&&(this.context=t)};export default t;
