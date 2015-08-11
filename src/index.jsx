var React = require('react/addons');
var {CreateForm, FormMixin} = require('./form.jsx');

var PersonalInfo = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      name: '',
      email: ''
    };
  },
  isValid: function () {
    return !!(this.state.name && this.state.email);
  },
  render: function () {

    var showErrors = this.props.showErrors && !this.isValid();

    return (<div>
      <div>
        <label>Name</label>
        <input name="name" valueLink={this.linkState('name')} />
      </div>
      <div>
        <label>Email</label>
        <input name="email" valueLink={this.linkState('email')} />
      </div>
      <p className="errors" hidden={!showErrors}>
        Name and email are required
      </p>
    </div>);
  }
});

var CreditCard = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      cardNumber: ''
    };
  },
  isValid: function () {
    return !!(+this.state.cardNumber);
  },
  render: function () {

    var showErrors = this.props.showErrors && !this.isValid();

    return (<div>
      <label>Enter your credit card number:</label>
      <input valueLink={this.linkState('cardNumber')} />
      <p className="errors" hidden={!showErrors}>
        Credit card must be a number
      </p>
    </div>);
  }
});

var Page1 = React.createClass({
  mixins: [FormMixin],
  getInitialState: function () {
    return {
      didSubmit: false
    };
  },
  onClick: function () {
    var isValid = true;
    this.setState({didSubmit: true});
    Object.keys(this.refs).forEach(key => {
      if (!this.refs[key].isValid()) isValid = false;
    });
    if (!isValid) return;
    this.goNext();
  },
  render: function () {
    return (<div>
      <h1>Hi this is page {this.props.index + 1}</h1>
      <PersonalInfo showErrors={this.state.didSubmit} ref="personalInfo" />
      <CreditCard showErrors={this.state.didSubmit} ref="creditCard" />
      <button onClick={this.onClick}>Next</button>
    </div>);
  }
});

var Page2 = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>
      Foo bar
      <button onClick={this.goBack}>Back</button>
    </div>);
  }
});

var pages = [
  Page1,
  Page2
];

CreateForm(pages, function (Form) {
  React.render(<Form />, document.getElementById('app'));
});


