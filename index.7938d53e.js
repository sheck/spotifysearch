function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t={};e(t,"Application",(()=>U),(e=>U=e));var n=function(){function e(e,t){this.eventTarget=e,this.eventName=t,this.unorderedBindings=new Set}return e.prototype.connect=function(){this.eventTarget.addEventListener(this.eventName,this,!1)},e.prototype.disconnect=function(){this.eventTarget.removeEventListener(this.eventName,this,!1)},e.prototype.bindingConnected=function(e){this.unorderedBindings.add(e)},e.prototype.bindingDisconnected=function(e){this.unorderedBindings.delete(e)},e.prototype.handleEvent=function(e){for(var t=function(e){if("immediatePropagationStopped"in e)return e;var t=e.stopImmediatePropagation;return Object.assign(e,{immediatePropagationStopped:!1,stopImmediatePropagation:function(){this.immediatePropagationStopped=!0,t.call(this)}})}(e),n=0,r=this.bindings;n<r.length;n++){var o=r[n];if(t.immediatePropagationStopped)break;o.handleEvent(t)}},Object.defineProperty(e.prototype,"bindings",{get:function(){return Array.from(this.unorderedBindings).sort((function(e,t){var n=e.index,r=t.index;return n<r?-1:n>r?1:0}))},enumerable:!0,configurable:!0}),e}();var r=function(){function e(e){this.application=e,this.eventListenerMaps=new Map,this.started=!1}return e.prototype.start=function(){this.started||(this.started=!0,this.eventListeners.forEach((function(e){return e.connect()})))},e.prototype.stop=function(){this.started&&(this.started=!1,this.eventListeners.forEach((function(e){return e.disconnect()})))},Object.defineProperty(e.prototype,"eventListeners",{get:function(){return Array.from(this.eventListenerMaps.values()).reduce((function(e,t){return e.concat(Array.from(t.values()))}),[])},enumerable:!0,configurable:!0}),e.prototype.bindingConnected=function(e){this.fetchEventListenerForBinding(e).bindingConnected(e)},e.prototype.bindingDisconnected=function(e){this.fetchEventListenerForBinding(e).bindingDisconnected(e)},e.prototype.handleError=function(e,t,n){void 0===n&&(n={}),this.application.handleError(e,"Error "+t,n)},e.prototype.fetchEventListenerForBinding=function(e){var t=e.eventTarget,n=e.eventName;return this.fetchEventListener(t,n)},e.prototype.fetchEventListener=function(e,t){var n=this.fetchEventListenerMapForEventTarget(e),r=n.get(t);return r||(r=this.createEventListener(e,t),n.set(t,r)),r},e.prototype.createEventListener=function(e,t){var r=new n(e,t);return this.started&&r.connect(),r},e.prototype.fetchEventListenerMapForEventTarget=function(e){var t=this.eventListenerMaps.get(e);return t||(t=new Map,this.eventListenerMaps.set(e,t)),t},e}(),o=/^((.+?)(@(window|document))?->)?(.+?)(#(.+))?$/;function i(e){return"window"==e?window:"document"==e?document:void 0}var s=function(){function e(e,t,n){this.element=e,this.index=t,this.eventTarget=n.eventTarget||e,this.eventName=n.eventName||function(e){var t=e.tagName.toLowerCase();if(t in c)return c[t](e)}(e)||a("missing event name"),this.identifier=n.identifier||a("missing identifier"),this.methodName=n.methodName||a("missing method name")}return e.forToken=function(e){return new this(e.element,e.index,(t=e.content,{eventTarget:i((n=t.trim().match(o)||[])[4]),eventName:n[2],identifier:n[5],methodName:n[7]}));var t,n},e.prototype.toString=function(){var e=this.eventTargetName?"@"+this.eventTargetName:"";return""+this.eventName+e+"->"+this.identifier+"#"+this.methodName},Object.defineProperty(e.prototype,"eventTargetName",{get:function(){return(e=this.eventTarget)==window?"window":e==document?"document":void 0;var e},enumerable:!0,configurable:!0}),e}(),c={a:function(e){return"click"},button:function(e){return"click"},form:function(e){return"submit"},input:function(e){return"submit"==e.getAttribute("type")?"click":"change"},select:function(e){return"change"},textarea:function(e){return"change"}};function a(e){throw new Error(e)}var u=function(){function e(e,t){this.context=e,this.action=t}return Object.defineProperty(e.prototype,"index",{get:function(){return this.action.index},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"eventTarget",{get:function(){return this.action.eventTarget},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.context.identifier},enumerable:!0,configurable:!0}),e.prototype.handleEvent=function(e){this.willBeInvokedByEvent(e)&&this.invokeWithEvent(e)},Object.defineProperty(e.prototype,"eventName",{get:function(){return this.action.eventName},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"method",{get:function(){var e=this.controller[this.methodName];if("function"==typeof e)return e;throw new Error('Action "'+this.action+'" references undefined method "'+this.methodName+'"')},enumerable:!0,configurable:!0}),e.prototype.invokeWithEvent=function(e){try{this.method.call(this.controller,e)}catch(r){var t=this,n={identifier:t.identifier,controller:t.controller,element:t.element,index:t.index,event:e};this.context.handleError(r,'invoking action "'+this.action+'"',n)}},e.prototype.willBeInvokedByEvent=function(e){var t=e.target;return this.element===t||(!(t instanceof Element&&this.element.contains(t))||this.scope.containsElement(t))},Object.defineProperty(e.prototype,"controller",{get:function(){return this.context.controller},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"methodName",{get:function(){return this.action.methodName},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scope",{get:function(){return this.context.scope},enumerable:!0,configurable:!0}),e}(),p=function(){function e(e,t){var n=this;this.element=e,this.started=!1,this.delegate=t,this.elements=new Set,this.mutationObserver=new MutationObserver((function(e){return n.processMutations(e)}))}return e.prototype.start=function(){this.started||(this.started=!0,this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,subtree:!0}),this.refresh())},e.prototype.stop=function(){this.started&&(this.mutationObserver.takeRecords(),this.mutationObserver.disconnect(),this.started=!1)},e.prototype.refresh=function(){if(this.started){for(var e=new Set(this.matchElementsInTree()),t=0,n=Array.from(this.elements);t<n.length;t++){var r=n[t];e.has(r)||this.removeElement(r)}for(var o=0,i=Array.from(e);o<i.length;o++){r=i[o];this.addElement(r)}}},e.prototype.processMutations=function(e){if(this.started)for(var t=0,n=e;t<n.length;t++){var r=n[t];this.processMutation(r)}},e.prototype.processMutation=function(e){"attributes"==e.type?this.processAttributeChange(e.target,e.attributeName):"childList"==e.type&&(this.processRemovedNodes(e.removedNodes),this.processAddedNodes(e.addedNodes))},e.prototype.processAttributeChange=function(e,t){var n=e;this.elements.has(n)?this.delegate.elementAttributeChanged&&this.matchElement(n)?this.delegate.elementAttributeChanged(n,t):this.removeElement(n):this.matchElement(n)&&this.addElement(n)},e.prototype.processRemovedNodes=function(e){for(var t=0,n=Array.from(e);t<n.length;t++){var r=n[t],o=this.elementFromNode(r);o&&this.processTree(o,this.removeElement)}},e.prototype.processAddedNodes=function(e){for(var t=0,n=Array.from(e);t<n.length;t++){var r=n[t],o=this.elementFromNode(r);o&&this.elementIsActive(o)&&this.processTree(o,this.addElement)}},e.prototype.matchElement=function(e){return this.delegate.matchElement(e)},e.prototype.matchElementsInTree=function(e){return void 0===e&&(e=this.element),this.delegate.matchElementsInTree(e)},e.prototype.processTree=function(e,t){for(var n=0,r=this.matchElementsInTree(e);n<r.length;n++){var o=r[n];t.call(this,o)}},e.prototype.elementFromNode=function(e){if(e.nodeType==Node.ELEMENT_NODE)return e},e.prototype.elementIsActive=function(e){return e.isConnected==this.element.isConnected&&this.element.contains(e)},e.prototype.addElement=function(e){this.elements.has(e)||this.elementIsActive(e)&&(this.elements.add(e),this.delegate.elementMatched&&this.delegate.elementMatched(e))},e.prototype.removeElement=function(e){this.elements.has(e)&&(this.elements.delete(e),this.delegate.elementUnmatched&&this.delegate.elementUnmatched(e))},e}(),l=function(){function e(e,t,n){this.attributeName=t,this.delegate=n,this.elementObserver=new p(e,this)}return Object.defineProperty(e.prototype,"element",{get:function(){return this.elementObserver.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selector",{get:function(){return"["+this.attributeName+"]"},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.elementObserver.start()},e.prototype.stop=function(){this.elementObserver.stop()},e.prototype.refresh=function(){this.elementObserver.refresh()},Object.defineProperty(e.prototype,"started",{get:function(){return this.elementObserver.started},enumerable:!0,configurable:!0}),e.prototype.matchElement=function(e){return e.hasAttribute(this.attributeName)},e.prototype.matchElementsInTree=function(e){var t=this.matchElement(e)?[e]:[],n=Array.from(e.querySelectorAll(this.selector));return t.concat(n)},e.prototype.elementMatched=function(e){this.delegate.elementMatchedAttribute&&this.delegate.elementMatchedAttribute(e,this.attributeName)},e.prototype.elementUnmatched=function(e){this.delegate.elementUnmatchedAttribute&&this.delegate.elementUnmatchedAttribute(e,this.attributeName)},e.prototype.elementAttributeChanged=function(e,t){this.delegate.elementAttributeValueChanged&&this.attributeName==t&&this.delegate.elementAttributeValueChanged(e,t)},e}(),f={};function h(e,t,n){y(e,t).add(n)}function d(e,t,n){y(e,t).delete(n),function(e,t){var n=e.get(t);null!=n&&0==n.size&&e.delete(t)}(e,t)}function y(e,t){var n=e.get(t);return n||(n=new Set,e.set(t,n)),n}e(f,"Multimap",(()=>v));var m,b,g,v=function(){function e(){this.valuesByKey=new Map}return Object.defineProperty(e.prototype,"values",{get:function(){return Array.from(this.valuesByKey.values()).reduce((function(e,t){return e.concat(Array.from(t))}),[])},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return Array.from(this.valuesByKey.values()).reduce((function(e,t){return e+t.size}),0)},enumerable:!0,configurable:!0}),e.prototype.add=function(e,t){h(this.valuesByKey,e,t)},e.prototype.delete=function(e,t){d(this.valuesByKey,e,t)},e.prototype.has=function(e,t){var n=this.valuesByKey.get(e);return null!=n&&n.has(t)},e.prototype.hasKey=function(e){return this.valuesByKey.has(e)},e.prototype.hasValue=function(e){return Array.from(this.valuesByKey.values()).some((function(t){return t.has(e)}))},e.prototype.getValuesForKey=function(e){var t=this.valuesByKey.get(e);return t?Array.from(t):[]},e.prototype.getKeysForValue=function(e){return Array.from(this.valuesByKey).filter((function(t){t[0];return t[1].has(e)})).map((function(e){var t=e[0];e[1];return t}))},e}(),O=(m=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},function(e,t){function n(){this.constructor=e}m(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});!function(e){function t(){var t=e.call(this)||this;return t.keysByValue=new Map,t}O(t,e),Object.defineProperty(t.prototype,"values",{get:function(){return Array.from(this.keysByValue.keys())},enumerable:!0,configurable:!0}),t.prototype.add=function(t,n){e.prototype.add.call(this,t,n),h(this.keysByValue,n,t)},t.prototype.delete=function(t,n){e.prototype.delete.call(this,t,n),d(this.keysByValue,n,t)},t.prototype.hasValue=function(e){return this.keysByValue.has(e)},t.prototype.getKeysForValue=function(e){var t=this.keysByValue.get(e);return t?Array.from(t):[]}}(v);b=f,g={},Object.keys(g).forEach((function(e){"default"===e||"__esModule"===e||b.hasOwnProperty(e)||Object.defineProperty(b,e,{enumerable:!0,get:function(){return g[e]}})}));var E=function(){function e(e,t,n){this.attributeObserver=new l(e,t,this),this.delegate=n,this.tokensByElement=new v}return Object.defineProperty(e.prototype,"started",{get:function(){return this.attributeObserver.started},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.attributeObserver.start()},e.prototype.stop=function(){this.attributeObserver.stop()},e.prototype.refresh=function(){this.attributeObserver.refresh()},Object.defineProperty(e.prototype,"element",{get:function(){return this.attributeObserver.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"attributeName",{get:function(){return this.attributeObserver.attributeName},enumerable:!0,configurable:!0}),e.prototype.elementMatchedAttribute=function(e){this.tokensMatched(this.readTokensForElement(e))},e.prototype.elementAttributeValueChanged=function(e){var t=this.refreshTokensForElement(e),n=t[0],r=t[1];this.tokensUnmatched(n),this.tokensMatched(r)},e.prototype.elementUnmatchedAttribute=function(e){this.tokensUnmatched(this.tokensByElement.getValuesForKey(e))},e.prototype.tokensMatched=function(e){var t=this;e.forEach((function(e){return t.tokenMatched(e)}))},e.prototype.tokensUnmatched=function(e){var t=this;e.forEach((function(e){return t.tokenUnmatched(e)}))},e.prototype.tokenMatched=function(e){this.delegate.tokenMatched(e),this.tokensByElement.add(e.element,e)},e.prototype.tokenUnmatched=function(e){this.delegate.tokenUnmatched(e),this.tokensByElement.delete(e.element,e)},e.prototype.refreshTokensForElement=function(e){var t,n,r,o=this.tokensByElement.getValuesForKey(e),i=this.readTokensForElement(e),s=(t=o,n=i,r=Math.max(t.length,n.length),Array.from({length:r},(function(e,r){return[t[r],n[r]]}))).findIndex((function(e){return!function(e,t){return e&&t&&e.index==t.index&&e.content==t.content}(e[0],e[1])}));return-1==s?[[],[]]:[o.slice(s),i.slice(s)]},e.prototype.readTokensForElement=function(e){var t=this.attributeName;return function(e,t,n){return e.trim().split(/\s+/).filter((function(e){return e.length})).map((function(e,r){return{element:t,attributeName:n,content:e,index:r}}))}(e.getAttribute(t)||"",e,t)},e}();var A=function(){function e(e,t,n){this.tokenListObserver=new E(e,t,this),this.delegate=n,this.parseResultsByToken=new WeakMap,this.valuesByTokenByElement=new WeakMap}return Object.defineProperty(e.prototype,"started",{get:function(){return this.tokenListObserver.started},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.tokenListObserver.start()},e.prototype.stop=function(){this.tokenListObserver.stop()},e.prototype.refresh=function(){this.tokenListObserver.refresh()},Object.defineProperty(e.prototype,"element",{get:function(){return this.tokenListObserver.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"attributeName",{get:function(){return this.tokenListObserver.attributeName},enumerable:!0,configurable:!0}),e.prototype.tokenMatched=function(e){var t=e.element,n=this.fetchParseResultForToken(e).value;n&&(this.fetchValuesByTokenForElement(t).set(e,n),this.delegate.elementMatchedValue(t,n))},e.prototype.tokenUnmatched=function(e){var t=e.element,n=this.fetchParseResultForToken(e).value;n&&(this.fetchValuesByTokenForElement(t).delete(e),this.delegate.elementUnmatchedValue(t,n))},e.prototype.fetchParseResultForToken=function(e){var t=this.parseResultsByToken.get(e);return t||(t=this.parseToken(e),this.parseResultsByToken.set(e,t)),t},e.prototype.fetchValuesByTokenForElement=function(e){var t=this.valuesByTokenByElement.get(e);return t||(t=new Map,this.valuesByTokenByElement.set(e,t)),t},e.prototype.parseToken=function(e){try{return{value:this.delegate.parseValueForToken(e)}}catch(e){return{error:e}}},e}(),w=function(){function e(e,t){this.context=e,this.delegate=t,this.bindingsByAction=new Map}return e.prototype.start=function(){this.valueListObserver||(this.valueListObserver=new A(this.element,this.actionAttribute,this),this.valueListObserver.start())},e.prototype.stop=function(){this.valueListObserver&&(this.valueListObserver.stop(),delete this.valueListObserver,this.disconnectAllActions())},Object.defineProperty(e.prototype,"element",{get:function(){return this.context.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.context.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionAttribute",{get:function(){return this.schema.actionAttribute},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.context.schema},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bindings",{get:function(){return Array.from(this.bindingsByAction.values())},enumerable:!0,configurable:!0}),e.prototype.connectAction=function(e){var t=new u(this.context,e);this.bindingsByAction.set(e,t),this.delegate.bindingConnected(t)},e.prototype.disconnectAction=function(e){var t=this.bindingsByAction.get(e);t&&(this.bindingsByAction.delete(e),this.delegate.bindingDisconnected(t))},e.prototype.disconnectAllActions=function(){var e=this;this.bindings.forEach((function(t){return e.delegate.bindingDisconnected(t)})),this.bindingsByAction.clear()},e.prototype.parseValueForToken=function(e){var t=s.forToken(e);if(t.identifier==this.identifier)return t},e.prototype.elementMatchedValue=function(e,t){this.connectAction(t)},e.prototype.elementUnmatchedValue=function(e,t){this.disconnectAction(t)},e}(),P=function(){function e(e,t){this.module=e,this.scope=t,this.controller=new e.controllerConstructor(this),this.bindingObserver=new w(this,this.dispatcher);try{this.controller.initialize()}catch(e){this.handleError(e,"initializing controller")}}return e.prototype.connect=function(){this.bindingObserver.start();try{this.controller.connect()}catch(e){this.handleError(e,"connecting controller")}},e.prototype.disconnect=function(){try{this.controller.disconnect()}catch(e){this.handleError(e,"disconnecting controller")}this.bindingObserver.stop()},Object.defineProperty(e.prototype,"application",{get:function(){return this.module.application},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.module.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.application.schema},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dispatcher",{get:function(){return this.application.dispatcher},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parentElement",{get:function(){return this.element.parentElement},enumerable:!0,configurable:!0}),e.prototype.handleError=function(e,t,n){void 0===n&&(n={});var r=this,o=r.identifier,i=r.controller,s=r.element;n=Object.assign({identifier:o,controller:i,element:s},n),this.application.handleError(e,"Error "+t,n)},e}(),k={};e(k,"blessDefinition",(()=>j),(e=>j=e));var B=function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();function j(e){return{identifier:e.identifier,controllerConstructor:T(e.controllerConstructor)}}function T(e){var t=x(e);return t.bless(),t}var x=function(){function e(e){function t(){var n=this&&this instanceof t?this.constructor:void 0;return Reflect.construct(e,arguments,n)}return t.prototype=Object.create(e.prototype,{constructor:{value:t}}),Reflect.setPrototypeOf(t,e),t}try{return(t=e((function(){this.a.call(this)}))).prototype.a=function(){},new t,e}catch(e){return function(e){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return B(t,e),t}(e)}}var t}(),F=function(){function e(e,t){this.application=e,this.definition=k.blessDefinition(t),this.contextsByScope=new WeakMap,this.connectedContexts=new Set}return Object.defineProperty(e.prototype,"identifier",{get:function(){return this.definition.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"controllerConstructor",{get:function(){return this.definition.controllerConstructor},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"contexts",{get:function(){return Array.from(this.connectedContexts)},enumerable:!0,configurable:!0}),e.prototype.connectContextForScope=function(e){var t=this.fetchContextForScope(e);this.connectedContexts.add(t),t.connect()},e.prototype.disconnectContextForScope=function(e){var t=this.contextsByScope.get(e);t&&(this.connectedContexts.delete(t),t.disconnect())},e.prototype.fetchContextForScope=function(e){var t=this.contextsByScope.get(e);return t||(t=new P(this,e),this.contextsByScope.set(e,t)),t},e}(),N=function(){function e(e){this.scope=e}return Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),e.prototype.get=function(e){return e=this.getFormattedKey(e),this.element.getAttribute(e)},e.prototype.set=function(e,t){return e=this.getFormattedKey(e),this.element.setAttribute(e,t),this.get(e)},e.prototype.has=function(e){return e=this.getFormattedKey(e),this.element.hasAttribute(e)},e.prototype.delete=function(e){return!!this.has(e)&&(e=this.getFormattedKey(e),this.element.removeAttribute(e),!0)},e.prototype.getFormattedKey=function(e){return"data-"+this.identifier+"-"+e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()}))},e}();function M(e,t){return"["+e+'~="'+t+'"]'}var C=function(){function e(e){this.scope=e}return Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.scope.schema},enumerable:!0,configurable:!0}),e.prototype.has=function(e){return null!=this.find(e)},e.prototype.find=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this.getSelectorForTargetNames(e);return this.scope.findElement(n)},e.prototype.findAll=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this.getSelectorForTargetNames(e);return this.scope.findAllElements(n)},e.prototype.getSelectorForTargetNames=function(e){var t=this;return e.map((function(e){return t.getSelectorForTargetName(e)})).join(", ")},e.prototype.getSelectorForTargetName=function(e){var t=this.identifier+"."+e;return M(this.schema.targetAttribute,t)},e}(),L=function(){function e(e,t,n){this.schema=e,this.identifier=t,this.element=n,this.targets=new C(this),this.data=new N(this)}return e.prototype.findElement=function(e){return this.findAllElements(e)[0]},e.prototype.findAllElements=function(e){var t=this.element.matches(e)?[this.element]:[],n=this.filterElements(Array.from(this.element.querySelectorAll(e)));return t.concat(n)},e.prototype.filterElements=function(e){var t=this;return e.filter((function(e){return t.containsElement(e)}))},e.prototype.containsElement=function(e){return e.closest(this.controllerSelector)===this.element},Object.defineProperty(e.prototype,"controllerSelector",{get:function(){return M(this.schema.controllerAttribute,this.identifier)},enumerable:!0,configurable:!0}),e}(),S=function(){function e(e,t,n){this.element=e,this.schema=t,this.delegate=n,this.valueListObserver=new A(this.element,this.controllerAttribute,this),this.scopesByIdentifierByElement=new WeakMap,this.scopeReferenceCounts=new WeakMap}return e.prototype.start=function(){this.valueListObserver.start()},e.prototype.stop=function(){this.valueListObserver.stop()},Object.defineProperty(e.prototype,"controllerAttribute",{get:function(){return this.schema.controllerAttribute},enumerable:!0,configurable:!0}),e.prototype.parseValueForToken=function(e){var t=e.element,n=e.content,r=this.fetchScopesByIdentifierForElement(t),o=r.get(n);return o||(o=new L(this.schema,n,t),r.set(n,o)),o},e.prototype.elementMatchedValue=function(e,t){var n=(this.scopeReferenceCounts.get(t)||0)+1;this.scopeReferenceCounts.set(t,n),1==n&&this.delegate.scopeConnected(t)},e.prototype.elementUnmatchedValue=function(e,t){var n=this.scopeReferenceCounts.get(t);n&&(this.scopeReferenceCounts.set(t,n-1),1==n&&this.delegate.scopeDisconnected(t))},e.prototype.fetchScopesByIdentifierForElement=function(e){var t=this.scopesByIdentifierByElement.get(e);return t||(t=new Map,this.scopesByIdentifierByElement.set(e,t)),t},e}(),I=function(){function e(e){this.application=e,this.scopeObserver=new S(this.element,this.schema,this),this.scopesByIdentifier=new v,this.modulesByIdentifier=new Map}return Object.defineProperty(e.prototype,"element",{get:function(){return this.application.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.application.schema},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"controllerAttribute",{get:function(){return this.schema.controllerAttribute},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"modules",{get:function(){return Array.from(this.modulesByIdentifier.values())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"contexts",{get:function(){return this.modules.reduce((function(e,t){return e.concat(t.contexts)}),[])},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.scopeObserver.start()},e.prototype.stop=function(){this.scopeObserver.stop()},e.prototype.loadDefinition=function(e){this.unloadIdentifier(e.identifier);var t=new F(this.application,e);this.connectModule(t)},e.prototype.unloadIdentifier=function(e){var t=this.modulesByIdentifier.get(e);t&&this.disconnectModule(t)},e.prototype.getContextForElementAndIdentifier=function(e,t){var n=this.modulesByIdentifier.get(t);if(n)return n.contexts.find((function(t){return t.element==e}))},e.prototype.handleError=function(e,t,n){this.application.handleError(e,t,n)},e.prototype.scopeConnected=function(e){this.scopesByIdentifier.add(e.identifier,e);var t=this.modulesByIdentifier.get(e.identifier);t&&t.connectContextForScope(e)},e.prototype.scopeDisconnected=function(e){this.scopesByIdentifier.delete(e.identifier,e);var t=this.modulesByIdentifier.get(e.identifier);t&&t.disconnectContextForScope(e)},e.prototype.connectModule=function(e){this.modulesByIdentifier.set(e.identifier,e),this.scopesByIdentifier.getValuesForKey(e.identifier).forEach((function(t){return e.connectContextForScope(t)}))},e.prototype.disconnectModule=function(e){this.modulesByIdentifier.delete(e.identifier),this.scopesByIdentifier.getValuesForKey(e.identifier).forEach((function(t){return e.disconnectContextForScope(t)}))},e}(),V={controllerAttribute:"data-controller",actionAttribute:"data-action",targetAttribute:"data-target"},K=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new n((function(t){t(e.value)})).then(s,c)}a((r=r.apply(e,t||[])).next())}))},_=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i},U=function(){function e(e,t){void 0===e&&(e=document.documentElement),void 0===t&&(t=V),this.element=e,this.schema=t,this.dispatcher=new r(this),this.router=new I(this)}return e.start=function(t,n){var r=new e(t,n);return r.start(),r},e.prototype.start=function(){return K(this,void 0,void 0,(function(){return _(this,(function(e){switch(e.label){case 0:return[4,new Promise((function(e){"loading"==document.readyState?document.addEventListener("DOMContentLoaded",e):e()}))];case 1:return e.sent(),this.router.start(),this.dispatcher.start(),[2]}}))}))},e.prototype.stop=function(){this.router.stop(),this.dispatcher.stop()},e.prototype.register=function(e,t){this.load({identifier:e,controllerConstructor:t})},e.prototype.load=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var o=Array.isArray(e)?e:[e].concat(n);o.forEach((function(e){return t.router.loadDefinition(e)}))},e.prototype.unload=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var o=Array.isArray(e)?e:[e].concat(n);o.forEach((function(e){return t.router.unloadIdentifier(e)}))},Object.defineProperty(e.prototype,"controllers",{get:function(){return this.router.contexts.map((function(e){return e.controller}))},enumerable:!0,configurable:!0}),e.prototype.getControllerForElementAndIdentifier=function(e,t){var n=this.router.getContextForElementAndIdentifier(e,t);return n?n.controller:null},e.prototype.handleError=function(e,t,n){console.error("%s\n\n%o\n\n%o",t,e,n)},e}();function R(e){var t=e.prototype,n=function(e){var t=function(e){var t=[];for(;e;)t.push(e),e=Object.getPrototypeOf(e);return t}(e);return Array.from(t.reduce((function(e,t){return function(e){var t=e.targets;return Array.isArray(t)?t:[]}(t).forEach((function(t){return e.add(t)})),e}),new Set))}(e);n.forEach((function(e){var n,r,o;return r=t,(n={})[e+"Target"]={get:function(){var t=this.targets.find(e);if(t)return t;throw new Error('Missing target element "'+this.identifier+"."+e+'"')}},n[e+"Targets"]={get:function(){return this.targets.findAll(e)}},n["has"+function(e){return e.charAt(0).toUpperCase()+e.slice(1)}(e)+"Target"]={get:function(){return this.targets.has(e)}},o=n,void Object.keys(o).forEach((function(e){if(!(e in r)){var t=o[e];Object.defineProperty(r,e,t)}}))}))}var D=function(){function e(e){this.context=e}return e.bless=function(){R(this)},Object.defineProperty(e.prototype,"application",{get:function(){return this.context.application},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scope",{get:function(){return this.context.scope},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"targets",{get:function(){return this.scope.targets},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"data",{get:function(){return this.scope.data},enumerable:!0,configurable:!0}),e.prototype.initialize=function(){},e.prototype.connect=function(){},e.prototype.disconnect=function(){},e.targets=[],e}();t.Application.start().register("search",class extends D{static targets=["artist","song"];get artist(){return this.artistTarget.value}get song(){return this.songTarget.value}go(e){e.preventDefault();const t=['site:"spotify.com"',"inurl:playlist","-inurl:user",'"By Spotify"',`"${this.artist}"`,`"${this.song}"`],n="https://google.com/search?"+new URLSearchParams({safe:"active",q:t.join(" ")}).toString();window.location=n}});
//# sourceMappingURL=index.7938d53e.js.map
