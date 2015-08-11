var React = require('react/addons');
var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

var Page = React.createClass({
  render: function () {
    return (<div hidden={!this.props.show}>
      {this.props.children}
    </div>);
  }
});

var Main = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      activePage: 1,
      errors: false
    };
  },

  goNext: function () {
    this.setState({
      activePage: this.state.activePage + 1
    });
  },

  goBack: function () {
    this.setState({

  validations: {
    required: function (value) {
      if (!value) return 'is required';
    },
    email: function (value) {
      if (!value || !value.match(EMAIL_REGEX)) {
        return 'must be an email';
      }
    }
  },

  validate: function (onSuccess) {

    var errors = [];

    var refs = Object.keys(this.refs)
      // Filter refs to only include those starting with "field-"
      .filter((key) => key.match(/^field-/))
      // Store a reference to the actual ref, not the key name
      .map((key) => this.refs[key]);

    if (!refs.length) return;

    refs.forEach((ref) => {

      // Get "validate" property
      var validations = ref.props.validate && ref.props.validate.split(' ');
      if (!validations) return;

      // Get the text to validate
      var validationText;
      if (ref.props.valueLink) validationText = ref.props.valueLink.value;
      else validationText = ref.getDOMNode().value;

      validations.forEach((validationType) => {
        if (!this.validations[validationType]) {
          console.error('You tried to use a validation that is not defined: ' + validationType);
          return;
        }

        // Run validation, if it fails, add an error
        var validationError = this.validations[validationType](validationText);
        if (validationError) {
          errors.push(ref.props.name + ' ' + validationError);
        }

      });
    });

    this.setState({
      errors: errors.length ? errors : false
    });

    // Return true if there were no errors, false if there were
    return !errors.length;

  },

  render: function () {
    return (<div>
      <Page id="1" show={this.state.activePage === 1} >
        <h1>I am page one</h1>
        <div>
          <label>Name</label>
          <input ref="field-name" name="name" validate="required" valueLink={this.linkState('name')} />
        </div>
        <div>
          <label>Email</label>
          <input ref="field-email" name="email" validate="required email" valueLink={this.linkState('email')} />
        </div>
        <div className="errors" hidden={!this.state.errors}>
          {this.state.errors && this.state.errors.map(error => <p>{error}</p>)}
        </div>
        <button onClick={() => this.validate() && this.goNext()}>Go next</button>
      </Page>
      <Page id="2" show={this.state.activePage === 2}>
        <h1>I am page 2</h1>
        <button onClick={this.goBack}>Go back</button>
      </Page>
    </div>);
  }
});

React.render(<Main />, document.getElementById('app'));
