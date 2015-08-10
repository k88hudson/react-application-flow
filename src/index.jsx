var React = require('react/addons');

var Page = React.createClass({
  render: function () {
    return (<div hidden={!this.props.show}>
      {this.props.children}
    </div>);
  }
});

var Main = React.createClass({
  getInitialState: function () {
    return {
      activePage: 1
    };
  },
  goNext: function () {
    this.setState({
      activePage: this.state.activePage + 1
    });
  },
  goBack: function () {
    this.setState({
      activePage: this.state.activePage - 1
    });
  },
  render: function () {
    return (<div>
      <Page id="1" show={this.state.activePage === 1} >
        <h1>I am page one</h1>
        <button onClick={this.goNext}>Go next</button>
      </Page>
      <Page id="2" show={this.state.activePage === 2}>
        <h1>I am page 2</h1>
        <button onClick={this.goBack}>Go back</button>
      </Page>
    </div>);
  }
});

React.render(<Main />, document.getElementById('app'));
