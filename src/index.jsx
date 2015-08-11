var React = require('react/addons');

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
      activePage: 0,
      submitAttempt: false,
      validationState: []
    };
  },

  navigateTo: function (page) {
    if (!this.isCurrentPageValid()) {
      this.setState({
        submitAttempt: true
      });
    } else {
      this.setState({
        submitAttempt: false,
        activePage: page
      });
    }
  },

  goNext: function () {
    this.navigateTo(this.state.activePage + 1);
  },

  goBack: function () {
    this.navigateTo(this.state.activePage - 1);
  },

  onValidate: function (page, field, initialState) {
    var validationState = this.state.validationState;
    if (!validationState[page]) validationState[page] = {};
    if (typeof validationState[page][field] === 'undefined') {
      validationState[page][field] = initialState || false;
    }

    return (isValid) => {
      validationState[page][field] = isValid;
      this.setState({validationState});
    }
  },

  isCurrentPageValid: function () {
    var isValid = true;
    var validations = this.state.validationState[this.state.activePage];
    if (!validations) return true;

    Object.keys(validations).forEach((key) => {
      if (!validations[key]) isValid = false;
    });

    return isValid;
  },

  render: function () {
    console.log(this.state.validationState);
    return (<div>
      <Page id="0" show={this.state.activePage === 0} >
        <h1>I am page one</h1>
        <PersonalInfo showErrors={this.state.submitAttempt} onValidate={this.onValidate(0, 'personalInfo')} />
        <button onClick={this.goNext}>Go next</button>
      </Page>
      <Page id="2" show={this.state.activePage === 1}>
        <h1>I am page 2</h1>
        <PersonalInfo showErrors={this.state.submitAttempt} onValidate={this.onValidate(1, 'personalInfo')} />
        <button onClick={this.goBack}>Go back</button>
      </Page>
    </div>);
  }
});

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

React.render(<Main />, document.getElementById('app'));
