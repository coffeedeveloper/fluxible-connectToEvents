# fluxible-connectToEvents

#### How to use

```javascript
Component = connectToEvents(Component, [Store], {
  'StoreName': {
    'EventName': 'HandleEventName'
  }
});
```
### REMEMBER!!!

**please use `connectToEvents` before `connectToStores`**
