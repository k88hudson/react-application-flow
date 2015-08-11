var React = require('react/addons');
var createForm = require('./form.jsx');

var PersonalInfo = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      name: '',
      email: ''
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onValidate(this.isValid());
    }
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
        There were some errors!
      </p>
    </div>);
  }
});

React.render(createForm(function() {
  return [
    <div>
      <h1>I am page one</h1>
      <PersonalInfo showErrors={this.state.submitAttempt} onValidate={this.onValidate(0, 'personalInfo')} />
      <button onClick={this.goNext}>Go next</button>
    </div>,
    <div>
      <h1>I am page 2</h1>
      <PersonalInfo showErrors={this.state.submitAttempt} onValidate={this.onValidate(1, 'personalInfo')} />
      <button onClick={this.goBack}>Go back</button>
    </div>
  ];
}), document.getElementById('app'));
