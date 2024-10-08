import React from 'react';
import ResumePage from './components/ResumePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Resume Generator</h1>
      </header>
      <main>
        {/* Render ResumePage component */}
        <ResumePage />
      </main>
    </div>
  );
}

export default App;