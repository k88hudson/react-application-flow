var React = require('react/addons');

var PageContainer = React.createClass({
  render: function () {
    return (<div hidden={!this.props.show}>
      {this.props.children}
    </div>);
  }
});

var contextTypes = {
  navigateTo: React.PropTypes.func,
  goNext: React.PropTypes.func,
  goBack: React.PropTypes.func
};

module.exports = {
  CreateForm: function CreateForm(pages, cb) {

    cb(React.createClass({

      mixins: [React.addons.LinkedStateMixin],

      childContextTypes: contextTypes,

      getChildContext: function() {
        return {
          navigateTo: this.navigateTo,
          goNext: this.goNext,
          goBack: this.goBack
        }
      },

      getInitialState: function () {
        return {
          activePage: 0
        };
      },

      navigateTo: function (page) {
        this.setState({
          activePage: page
        });
      },

      goNext: function () {
        this.navigateTo(this.state.activePage + 1);
      },

      goBack: function () {
        this.navigateTo(this.state.activePage - 1);
      },

      render: function () {
        return (<div>
          {pages.map((InnerComponent, i) => {
            return (
              <PageContainer id={i} key={i} show={this.state.activePage === i}>
                <InnerComponent
                  ref={'page-' + i}
                  index={i} />
              </PageContainer>
            );
          })}
        </div>);
      }
    }));
  },

  FormMixin: {

    contextTypes: contextTypes,

    navigateTo: function () {
      this.context.navigateTo();
    },

    goNext: function () {
      this.context.goNext();
    },

    goBack: function () {
      this.context.goBack();
    },

    validateFields: function () {
      var isValid;
      var refs = Object.keys(this.refs)
        .filter(key => key.match(/^field-/))
        .map(key => this.refs[key])
        .forEach(ref => {
          // todo handle case when no isValid function
          if (!ref.isValid()) isValid = false;
        });
      return isValid;
    }
  }
};
