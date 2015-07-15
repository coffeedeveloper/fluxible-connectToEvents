import Fluxible from 'fluxible';
import {
  createStore
} from 'fluxible/addons';
import {
  connectToStores,
  createElementWithContext,
  provideContext
} from 'fluxible-addons-react';
import React from 'react';
import connectToEvents from '../lib/main';

// Action
const action = (actionContext,
payload) => {
  actionContext.dispatch('FOO_ACTION', payload);
};

// Store
const FooStore = createStore({
  storeName: 'FooStore',
  handlers: {
    'FOO_ACTION': 'fooHandler'
  },
  initialize: function() { // Set the initial state
    this.foo = null;
  },
  fooHandler: function(payload) {
    this.foo = payload;
    this.emit('wa');
  },
  getState: function() {
    return {
      foo: this.foo
    };
  }
});

class Test extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  change() {
    this.setState({
      text: 'hahah'
    });
  }
  handleWa() {
    console.log(this);
    console.log(this.change);
    console.log('in component wa event');
  }
  render() {
    return (
      <p>{this.state.text}</p>
    );
  }
}

Test = connectToEvents(Test, [FooStore], {
  'FooStore': {
    'wa': 'handleWa'
  }
});

Test = connectToStores(Test, [FooStore], (context, props) => {
  return context.getStore(FooStore).getState();
});


// Component
class App extends React.Component {
  onClick() {
    this.context.executeAction(action);
  }
  render() {
    return (
      <div>
        <span>{this.props.foo}</span>
        <button onClick={this.onClick.bind(this)}>Click Me</button>
        <Test ref="test" />
      </div>
    );
  }
}
App.contextTypes = {
  executeAction: React.PropTypes.func,
  getStore: React.PropTypes.func
};
App = provideContext(connectToStores(App, [FooStore], (context, props) => {
  return context.getStore(FooStore).getState();
}));


// App
const app = new Fluxible({
  component: App,
  stores: [FooStore]
});

// Bootstrap
const context = app.createContext();
context.executeAction(action, 'bar', (err) => {
  React.render(createElementWithContext(context), document.getElementById('app'));
});
