var React = require('react');
var assign = require('object-assign');

function createComponent(Component, stores, events) {
  var componentName = Component.displayName || Component.name;

  var EventConnector = React.createClass({
    displayName: componentName + 'EventsConnector',
    contextTypes: {
      getStore: React.PropTypes.func.isRequired
    },
    bind: function bind () {
      this.storeEvents.forEach(function (obj) {
        for (var e in obj.events) {
          obj.store.on(e, obj.events[e]);
        }
      });
    },
    unbind: function unbind () {
      this.storeEvents.forEach(function (obj) {
        for (var e in obj.events) {
          obj.store.removeListener(e, obj.events[e]);
        }
      });
    },
    componentDidMount: function componentDidMount () {
      var component = this.refs.component;
      this.storeEvents = [];

      stores.forEach(function storesEach (Store) {
        var store = this.context.getStore(Store);
        var storeName = Store.storeName || Store.name;
        var storeEvents = events[storeName];

        var obj = { store: store, events: {} };
        for (var e in storeEvents) {
          obj.events[e] = component[storeEvents[e]].bind(component);
        }
        this.storeEvents.push(obj);
      }, this);
      this.bind();
    },
    componentWillUnmount: function componentWillUnmount () {
      this.unbind();
    },
    render: function render () {
      return React.createElement(Component,
        assign({}, { ref: 'component' }, this.props, this.state));
    }
  });

  return EventConnector;
}

module.exports = createComponent;
