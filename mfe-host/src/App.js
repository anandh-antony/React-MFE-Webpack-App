import React from "react";

import RemoteApp from 'cart/App'

const App = () => {
  return (
    <div>
      <div style={{
        margin:"10px",
        padding:"10px",
        textAlign:"center",
        backgroundColor:"greenyellow"
      }}>
        <h1>Product Listing</h1>
      </div>
        <RemoteApp/>
    </div>)
}


export default App;
