import LocalButton from "./Button";
import React from "react";
import { AsyncBoundary } from "async-boundary";
const RemoteButton = React.lazy(() => import("app2/Button"));
const App = () => (
  <div>
    <AsyncBoundary fallback="Loading Button" errorFallback="Failed to Load">
      <RemoteButton />
    </AsyncBoundary>
  </div>
);

export default App;
