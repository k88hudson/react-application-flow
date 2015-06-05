var React = require('react/addons');

// Helper stuff
var RevealData = require('./components/reveal-data.jsx');

// Demo stuff
var ContactCard = require('./components/contact-card.jsx');
var LiveEditor = require('./components/live-editor.jsx');
var Editor = require('./components/editor.jsx');
var Loading = require('./components/loading.jsx');
var FakeAsync = require('./components/fake-async.jsx');

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
        <form>
          <p><label>Name</label> <input valueLink={this.linkState('name')} /></p>
          <p><label>Bio</label> <textarea valueLink={this.linkState('bio')} /></p>
          <p><label>Age</label> <input type="number" valueLink={this.linkState('age')} /></p>
        </form>
      </div>
      <div className="right">
        <article>
          <h2>One way bindings in parent to child relationships</h2>
          <p><code>ContactCard</code> should render name, bio, and age from <code>App</code></p>

          <ContactCard />

        </article>

        <article>
          <h2>Two way bindings in parent ⇔ child relationships</h2>

          <LiveEditor />

        </article>

        <article>
          <h2>Sibling ⇔ Sibling relationships</h2>

          <div className="flexy">
            <Loading />
            <FakeAsync />
          </div>

        </article>

        <article>
          <h2>Child to great grandparent</h2>
        </article>

        <article>
          <h2>Two way bindings in parent ⇔ child relationships where data is not synchronized</h2>

          <Editor {...this.state} setParentState={this.setParentState} />

        </article>

      </div>
    </main>);
  }
});

React.render(<App />, document.getElementById('app'));
