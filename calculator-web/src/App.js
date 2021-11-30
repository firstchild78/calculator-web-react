import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      leftNumber : 0,
      rightNumber : 0,
      operator: "",
      value:""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleIframeTask);
  }
  handleIframeTask = (e) => {
    this.callApi()
  };

  callApi(){

    if (this.state.rightNumber === "0" && this.state.operator === "/")
    {
      this.setState({ value: 0 });
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'x-functions-key':'kBG9dKn6V9dRXa5Uosi4z9Sj7sIKguDR86UZJfuS7oQ3IlGFqQ0krA=='},
        body: JSON.stringify({ LeftNumber: Math.abs(Number(this.state.leftNumber)), RightNumber: Math.abs(Number(this.state.rightNumber)), Operator: this.state.operator})
      };
      fetch('#{API_URI}#', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ value: data.value.toString().slice(0,5) }));
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
  });
  }

  render() {
    return (
      <div className="App">
        <div>
        <h1>Simple Calculator</h1>
        <input type="text" size="4" maxLength="3" id="leftNumber" onChange={this.handleChange}/>
        <select id="operator" onChange={this.handleChange} onClick={this.handleChange}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>
        <input type="text" size="4" maxLength="3" id="rightNumber" onChange={this.handleChange}/>
        {"  "}={"  "}
        <input value={this.state.value} type="text" size="6" maxLength="5" className="result" readOnly="{true}"/>
      </div>
      <div>
        <iframe
        frameBorder="0"
        srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
          </head>
          <style>
          button {
            background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 8px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            border-radius: 12px;
          }
          div{
            text-align:center;
          }
          </style>
          <script type="text/javascript">
          window.onload = function(){
            document.getElementById("calculate").onclick=function(){
                parent.postMessage("clicked","*")
            }
          }
          </script>
          <body>
          <div text-align="center">
            <button id="calculate">Calculate</button>
          </div>  
          </body>
        </html>
      `}
      />
      </div>
      </div>
    );
  }
}

export default App;
