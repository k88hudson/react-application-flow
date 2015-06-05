var React = require('react/addons');

// Helper stuff
var RevealData = require('./components/reveal-data.jsx');

// Demo stuff
var ContactCard = require('./components/contact-card.jsx');
var LiveEditor = require('./components/live-editor.jsx');
var Editor = require('./components/editor.jsx');

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      name: 'Jin',
      bio: 'I am a person and I do stuff',
      age: 30
    };
  },
  setParentState: function (state) {
    this.setState(state);
  },
  render: function () {
    return (<main>
      <div className="left-fixed">
        <RevealData name="App" props={this.props} state={this.state} />
      </div>
      <div className="right">
        <article>
          <h2>One way bindings in parent to child relationships</h2>
          <p><code>ContactCard</code> should render name, bio, and age from <code>App</code></p>

          <ContactCard />

        </article>

        <article>
          <h2>Two way bindings in parent ⇔ child relationships</h2>

          <div className="flexy">
            <div>
              <p>Part of <code>App</code> component:</p>
              <p><input valueLink={this.linkState('name')} /></p>
            </div>
            <div>
              <p>Part of <code>LiveEditor</code> component:</p>
              <LiveEditor />
            </div>
          </div>
        </article>

        <article>
          <h2>Two way bindings in parent ⇔ child relationships where data is not synchronized</h2>

          <div className="flexy">
            <div>
              <p>Part of <code>App</code> component:</p>
              <p><textarea valueLink={this.linkState('bio')} /></p>
            </div>
            <div>
              <p>Part of <code>Editor</code> component:</p>
              <p><Editor {...this.state} setParentState={this.setParentState} /></p>
            </div>
          </div>
        </article>

      </div>
    </main>);
  }
});

React.render(<App />, document.getElementById('app'));
