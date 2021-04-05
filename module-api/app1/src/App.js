import LocalButton from "./Button";
import React from "react";
import { AsyncBoundary } from 'async-boundary';
const RemoteButton = React.lazy(() => import("app2/Button"));
window.emotionCache = require('./emotion-cache')
const App = () => (
  <div>
    <h1>Bi-Directional</h1>
    <h2>App 1</h2>
    <LocalButton>sample</LocalButton>
    <AsyncBoundary fallback="Loading Button" errorFallback="Failed to Load">
      <RemoteButton />
    </AsyncBoundary>
  </div>
);

export default App;
