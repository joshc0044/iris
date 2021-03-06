import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import irisData from './irisList.js';
import Flower from './flower.js'
import FlowerInputs from './flower_slider_inputs.js'

import './index.css';


class IrisViewer extends React.Component {
  constructor(props) {
	  super(props);
	  // fs.readFile('./iris.data', (fileData) => {
		  // console.log(fileData)
	  // });
	  this.state = { 
	  'model' : tf.sequential(), 
	  'data': irisData,
	  'flowerNum': 0
	  };
	}
	
  componentDidMount() {
	  //this.viewData();
	  this.setState({ 'flowerNum': this.state.flowerNum++ });
	  //console.log(this.state);
	  //const csvDataset = tf.data.csv('file://./iris.data');
	  //this.setState({'cData': csvDataset});
  }
 
	
  /* 
    getTensorFlow() {
	let tfB = tf.getBackend();
	//let d3T = d3;
	console.log(this.state);
	}
  async getData() {
	  //const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
	  //const irisTestData = await fetch('http://localhost:8080');	  
	  //const carsData = await carsDataReq.json();
	  //const irisData = await carsDataReq.json();  	  
	  // const cleaned = carsData.map(car => ({
		// mpg: car.Miles_per_Gallon,
		// horsepower: car.Horsepower,
	  // }))
	  // .filter(car => (car.mpg != null && car.horsepower != null));
	  
	  // return cleaned;
	  console.log('iris test', irisData);
	  console.log('first flower', irisData.irisData[1]);
	  
	  return irisData;
	}
  async viewData() {
	  const data = await this.getData();
	  this.setState({'data': data});
  } */
  render() {
	//this.getTensorFlow();
	let flowerData = this.state.data.irisData;
	//console.log('fdata', flowerData);
	// flowerData.forEach(
		// (f, index) => {
			// console.log('flower ', f);
			// console.log('flower index', index);
		// })
    return (
      <div className="iris" id="iris_board">
        {/* TODO */}
		<p>iris flower stat board</p>
		
		{flowerData.map((flower, index) => {
			//return (<p>flower + {index}</p>)
			//console.log('flower ', flower);
			//console.log('flower index', index);
			return <Flower fNum={index} flowerStuff={flower} key={"flower_id" + index} />;
		})}
      </div>
    );
  }
}

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
		console.log('stuff ', stuff);
		let setStateFlag = false;
		let diffCount = 0;
		// loop over inputs, if there is a difference between user 
		// input and previously saved state, set flag to true and update state
		// this is broken way to use componentDidMount from child component FlowerInputs i think
		// in essence checking for difference in 'prevProps' at source should be clearer
		for(let inputKey in this.state.inputs){
			
			//setStateFlag = false;
			if(this.state.inputs[inputKey] !== stuff[inputKey]){
				setStateFlag = true;
				diffCount++;
			}
		}
		console.log('stuff flag', setStateFlag);
		console.log('diffCount', diffCount);
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
			  {
				inputKeys.map(iKey => {
					  return(
						<div><p>{iKey}:{this.state.inputs[iKey]}</p></div>
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

// or have it here
class FlowerInputsTwo extends React.Component {
	
	constructor(props) {
	  super(props);
	  
	  this.petalSliderHandler = this.petalSliderHandler.bind(this);
	  this.petalWidthHandler = this.petalWidthHandler.bind(this);
	  this.sepalSliderHandler = this.sepalSliderHandler.bind(this);
	  this.sepalWidthHandler = this.sepalWidthHandler.bind(this);
	  
	  this.state = { 
	  'data': irisData
	  };
	  
	  // get min & max ranges for petal and sepal from data
		// gat data
		let fdata = this.state.data.irisData;
		let fKeys = Object.keys(fdata[0]);
		// ranges for slider
		let minPetal_len = Infinity;
		let maxPetal_len = -Infinity;
		let minPetal_wid = Infinity;
		let maxPetal_wid = -Infinity;
		let minSepal_len = Infinity;
		let maxSepal_len = -Infinity;
		let minSepal_wid = Infinity;
		let maxSepal_wid = -Infinity;
		window.console.log("fkeys: ", fKeys);
		
		for(let fIndex in fdata) {
			//window.console.log("flower: ", fdata[fIndex]);
			let tempPetal = fdata[fIndex][fKeys[2]];
			let tempPetalWid = fdata[fIndex][fKeys[3]];
			let sepalPetal = fdata[fIndex][fKeys[0]];
			let sepalPetalWid = fdata[fIndex][fKeys[1]];
			//window.console.log("flower petal: ", tempPetal);
			if(tempPetal < minPetal_len) {
				minPetal_len = tempPetal;
			}
			if(tempPetal > maxPetal_len) {
				maxPetal_len = tempPetal;
			}
			if(tempPetalWid < minPetal_wid) {
				minPetal_wid = tempPetalWid;
			}
			if(tempPetalWid > maxPetal_wid) {
				maxPetal_wid = tempPetalWid;
			}
			if(sepalPetal < minSepal_len) {
				minSepal_len = sepalPetal;
			}
			if(sepalPetal > maxSepal_len) {
				maxSepal_len = sepalPetal;
			}
			if(sepalPetalWid < minSepal_wid) {
				minSepal_wid = sepalPetalWid;
			}
			if(sepalPetalWid > maxSepal_wid) {
				maxSepal_wid = sepalPetalWid;
			}
		}
		//window.console.log("smallest petal: ", minPetal_len);
		window.console.log("biggest petal: ", maxPetal_len);
		this.state['small_petal_length'] = minPetal_len;
		this.state['big_petal_length'] = maxPetal_len;
		this.state['small_petal_width'] = minPetal_wid;
		this.state['big_petal_width'] = maxPetal_wid;
		this.state['small_sepal_length'] = minSepal_len;
		this.state['big_sepal_length'] = maxSepal_len;
		this.state['small_sepal_width'] = minSepal_wid;
		this.state['big_sepal_width'] = maxSepal_wid;
		this.state['petal_length_input'] = 'none';
		this.state['petal_width_input'] = 'none';
		this.state['sepal_length_input'] = 'none';
		this.state['sepal_width_input'] = 'none';
	  
	}
	componentDidMount() {
		
	}
	
	petalSliderHandler(e) {
		//window.console.log("flower petal: ", e.target.value);
		//this.setState({`"${e.target.name}"`: e.target.value});
		this.setState({'petal_length_input': e.target.value});
	}
	
	petalWidthHandler(e) {
		//window.console.log("flower petal: ", e.target.value);
		//this.setState({`"${e.target.name}"`: e.target.value});
		this.setState({'petal_width_input': e.target.value});
	}
	
	sepalSliderHandler(e) {
		//window.console.log("flower sepal: ", e.target.value);
		this.setState({'sepal_length_input': e.target.value});
	}
	
	sepalWidthHandler(e) {
		//window.console.log("flower sepal: ", e.target.value);
		this.setState({'sepal_width_input': e.target.value});
	}
	
  render() {
	  let lenAvg = (parseFloat(this.state['big_petal_length']) + parseFloat(this.state['small_petal_length'])) / 2;
	  let widAvg = (parseFloat(this.state['big_petal_width']) + parseFloat(this.state['small_petal_width'])) / 2;
	  let sepLenAvg = (parseFloat(this.state['big_sepal_length']) + parseFloat(this.state['small_sepal_length'])) / 2;
	  let sepWidAvg = (parseFloat(this.state['big_sepal_width']) + parseFloat(this.state['small_sepal_width'])) / 2;
	  let sliderAvg = undefined;
	  if(isNaN(lenAvg)) {lenAvg = this.state['small_petal_length']} 
	  window.console.log("sliderAvgl: ", widAvg);
	  return (
		<div>
				<h1>flower slider stuff</h1>
			<div>
				<input 
					type="range" 
					id="flowerSlider_1" 
					name="petal_slider_input" 
					min={this.state['small_petal_length']} 
					max={this.state['big_petal_length']} 
					defaultValue={lenAvg} 
					step={0.1}
					onChange={this.petalSliderHandler}
				/>
				<label htmlFor="flowerSlider_1">flowerPetalSlider_length</label>
				<input 
					type="range" 
					id="flowerSlider_12" 
					name="petal_slider_input_width" 
					min={this.state['small_petal_width']} 
					max={this.state['big_petal_width']} 
					defaultValue={widAvg} 
					step={0.1}
					onChange={this.petalWidthHandler}
				/>
				<label htmlFor="flowerSlider_12">flowerPetalSlider_width</label>
			</div>
			<div>
				<input 
					type="range" 
					id="flowerSlider_2" 
					name="sepal_slider_input" 
					min={this.state['small_sepal_length']} 
					max={this.state['big_sepal_length']} 
					defaultValue={sepLenAvg} 
					step={0.1}
					onChange={this.sepalSliderHandler}
				/>
				<label htmlFor="flowerSlider_2">flowerSepalSlider_length</label>
				<input 
					type="range" 
					id="flowerSlider_22" 
					name="sepal_slider_input_width" 
					min={this.state['small_sepal_width']} 
					max={this.state['big_sepal_width']} 
					defaultValue={sliderAvg} 
					step={0.1}
					onChange={this.sepalWidthHandler}
				/>
				<label htmlFor="flowerSlider_2">flowerSepalSlider_width</label>
			</div>
			
			<h3>petal length {this.state.petal_length_input}</h3>
			<h3>petal width {this.state.petal_width_input}</h3>
			<h3>sepal length {this.state.sepal_length_input}</h3>
			<h3>sepal width {this.state.sepal_width_input}</h3>
		</div>
	  )
  }
}