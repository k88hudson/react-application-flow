# Form

To create a form, pass a list of pages and a callback to `createForm`:

```js
var CreateForm = require('form.jsx').CreateForm;

var pages = [Page1, Page2, Page3];

CreateForm(pages, function(Form) {
  React.render(<Form />, document.getElementById('app'));
});
```

## Navigation

To navigate back or forwards inside a page, include the ` use methods `this.goBack` and `this.goNext`.

```js
mixins: [require('form.jsx').FormMixin],
...
render: function () {
  return (<div>
    This is the first page
    <button onClick={this.goNext}>Next</button>
  </div>);
}
...
```

## Field Validation

In order to validate all child components in a page, you must

1. Add an `isValid` method to the child components that returns true or false
2. Add a ref to each child component starting with `field-`

You may then require `FormMixin` and call `this.validateFields`

Child Component `Foo`
```js
...
isValid: function () {
  return this.state.foo && typeof this.state.foo === 'number';
}
...
```

Page Component
```js
mixins: [require('form.jsx').FormMixin],
...
onSubmit: function () {
  var isPageValid = this.validateFields(); // This will return true if Foo returns true from isValid
},
...
render: function () {
  return <div>
    <Foo ref="field-foo" />
  </div>;
}
...
```

