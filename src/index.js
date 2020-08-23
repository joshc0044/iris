import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import irisData from './irisList.js';
import Flower from './flower.js'
import FlowerInputs from './flower_slider_inputs.js'
import IrisViewer from './irisViewer.js'
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}
class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
/*
		<div className="game-board">
          <Board />
        </div>
*/
class Game extends React.Component {
	
	constructor(props) {
	  super(props);
	  this.state = { 
	  'inputs' : {
		  'petal_length': '',
			'petal_width': '',
			'sepal_length': '',
			'sepal_width': '',
			'species': 'user_input'
		}
	  };
	  this.inputHandler = this.inputHandler.bind(this);
	}
	
	inputHandler(stuff) {
		//console.log('stuff ', stuff);
		let setStateFlag = false;
		// loop over inputs, if there is a difference between user 
		// input and previously saved state, set flag to true and update state
		// this is broken way to use componentDidMount from child component FlowerInputs i think
		// in essence checking for difference in 'prevProps' at source should be clearer
		for(let inputKey in this.state.inputs){
			if(this.state.inputs[inputKey] !== stuff[inputKey]){
				setStateFlag = true;
			}
		}
		//console.log('stuff flag', setStateFlag);
		//console.log('diffCount', diffCount);
		//this.setState({'inputs': stuff});
		if(setStateFlag){
			this.setState({'inputs': stuff});
		}
	}
	
  render() {
	let inputKeys = Object.keys(this.state.inputs);
    return (
      <div className="game">
		<IrisViewer />
        
        <div className="game-info">
          <div>{/* status */}</div>
          <div>		  
			  <FlowerInputs
				inputHandler={this.inputHandler}
				inputStuff={this.state.inputs}
			  />
		  </div>
		  <div style={{border: "2px solid rgb(26 162 226)"}}>
			<p>
				User input flower
			</p>
			  {
				inputKeys.map(iKey => {
					  return(
						<div key={'input_key_'+iKey}><p>{iKey}:{this.state.inputs[iKey]}</p></div>
					)})				  
				}
			<Flower fNum={169} flowerStuff={this.state.inputs} key={"flower_id_169"} />
		  </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);