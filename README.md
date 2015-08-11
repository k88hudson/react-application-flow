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
