var React = require('react');
var RevealData = require('./reveal-data.jsx');

var LiveEditor = React.createClass({
  onChange: function (e) {},
  render: function () {
    return (<div>

      <label>Name</label> <input onChange={this.onChange} />

      <RevealData name="LiveEditor" props={this.props} state={this.state} />

    </div>);
  }
});

module.exports = LiveEditor;
