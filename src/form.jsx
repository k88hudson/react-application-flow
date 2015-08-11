var React = require('react/addons');

var Page = React.createClass({
  render: function () {
    return (<div hidden={!this.props.show}>
      {this.props.children}
    </div>);
  }
});

module.exports = function createForm(render) {
  var Form = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {
        activePage: 0,
        submitAttempt: false,
        pageValidations: []
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
      var pageValidations = this.state.pageValidations;
      if (!pageValidations[page]) pageValidations[page] = {};
      if (typeof pageValidations[page][field] === 'undefined') {
        pageValidations[page][field] = initialState || false;
      }

      return (isValid) => {
        pageValidations[page][field] = isValid;
        this.setState({pageValidations});
      }
    },

    isCurrentPageValid: function () {
      var isValid = true;
      var validations = this.state.pageValidations[this.state.activePage];
      if (!validations) return true;

      Object.keys(validations).forEach((key) => {
        if (!validations[key]) isValid = false;
      });

      return isValid;
    },

    render: function () {
      var innerPages = render.bind(this)();
      return (<div>
        {innerPages.map((page, i) => <Page id={i} key={i} show={this.state.activePage === i}>{page}</Page>)}
      </div>);
    }
  });
  return <Form />;
}
