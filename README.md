# Form

To create a form, pass a callback to `createForm` that returns a div containing all the pages you wish to include in your form. The first page will be displayed by default.

```js
var createForm = require('form.jsx');

React.render(createForm(function() {
  return <div>
    <div>
      This is the first page
    </div>
    <div>
      This is page two
    </div>
  </div>
}), document.getElementById('app'));
```

## Navigation

To navigate back or forwards, use methods `this.goBack` and `this.goNext`.

```js
createForm(function() {
  return <div>
    <div>
      This is the first page
      <button onClick={this.goNext}>Next</button>
    </div>
    <div>
      This is page two
      <button onClick={this.goBack}>Back</button>
    </div>
  </div>
})
```

## Validation

To update the global navigation state inside child components, use `this.onValidate` to generate a callback.

`this.onValidate` generates a callback and takes two params: `pageIndex` and `label`.

In the page markup inside `createForm` (this is for page index 0):

```js
<div>
  <PersonalInfo onValidate={this.onValidate(0, 'personalInfo')} />
  <CreditCardNumber onValidate={this.onValidate(0, 'creditCardNumber')} />
</div>
```

In the custom component, call `this.props.onValidate` whenever you need to validate. This is probably on every state update. You should return a value (true/false) of whether the component's state is valid.

```js
var PersonalInfo = React.createClass({
  ...
  componentDidUpdate: function (prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onValidate(this.isValid());
    }
  },
  ....
});
```
