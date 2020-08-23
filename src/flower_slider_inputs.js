import React from 'react';
import ReactDOM from 'react-dom';
import irisData from './irisList.js';
import * as tfvis from '@tensorflow/tfjs-vis';

class FlowerInputs extends React.Component {
	
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
		// list of flower obj keys
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
		// can save all entries in external list and use Math.min/max(...) with said arrays
		// or just iterate through and check for min/max in place and save min/max by hand
		let tempPetalLenList = [];
		let tempPetalWidthList = [];
		//window.console.log("fkeys: ", fKeys);
		
		for(let fIndex in fdata) {
			// each obj in fdata is flower data obj
			//window.console.log("flower: ", fdata[fIndex]);
			let tempPetal = fdata[fIndex][fKeys[2]];
			if(!isNaN(parseFloat(tempPetal))) {tempPetalLenList.push(parseFloat(tempPetal))}
			let tempPetalWid = fdata[fIndex][fKeys[3]];
			if(!isNaN(parseFloat(tempPetalWid))) {tempPetalWidthList.push(parseFloat(tempPetalWid))}
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
		let isVisorOpen = tfvis.visor().isOpen();
		window.console.log("smallest petal len: ", Math.min(...tempPetalLenList));
		window.console.log("smallest petal width: ", Math.min(...tempPetalWidthList));
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
	componentDidUpdate(prevProps) {
		let isVisorOpen = tfvis.visor().isOpen();
		window.console.log("isVisorOpen: ", isVisorOpen);
		let inputObj = {
			'petal_length':this.state.petal_length_input === 'none' ? '1' : this.state.petal_length_input,
			'petal_width': this.state.petal_width_input === 'none' ? '1' : this.state.petal_width_input,
			'sepal_length': this.state.sepal_length_input === 'none' ? '1' : this.state.sepal_length_input,
			'sepal_width': this.state.sepal_width_input === 'none' ? '1' : this.state.sepal_width_input,
			'species': 'user_input'
		};
		//window.console.log('prevProps ', prevProps);
		let setStateFlag = false;
		for(let inputKey in prevProps.inputStuff){
			
			//setStateFlag = false;
			if(prevProps.inputStuff[inputKey] !== inputObj[inputKey]){
				setStateFlag = true;
			}
		}
		setStateFlag && this.props.inputHandler(inputObj);	
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
	  //let sliderAvg = undefined;
	  if(isNaN(lenAvg)) {lenAvg = this.state['small_petal_length']} 
	  let isVisorOpen = tfvis.visor().isOpen();
	  //window.console.log("sliderAvgl: ", widAvg);
	  return (
		<div>
			<h1>flower slider stuff</h1>
			<button
				onClick={
					() => {tfvis.visor().toggle()}
				}
			>
				Toggle TensorFlow Visor
			</button>
			<div>
				<div>
					<p>
						<b>min</b>
						<b
							style={{marginLeft: "124px"}}
						>
						max
						</b>
					</p>
					<p>
						<b>{this.state['small_petal_length']}</b>
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
						<b>{this.state['big_petal_length']}</b>
						<label htmlFor="flowerSlider_1"> -- Petal_Slider_length&#40;cm&#41;</label>
					</p>
					<p>
						<b>{this.state['small_petal_width']}</b>
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
						<b>{this.state['big_petal_width']}</b>
						<label htmlFor="flowerSlider_12"> -- Petal_Slider_width&#40;cm&#41;</label>
					</p>
				</div>
				<div>
					<p>
						<b>{this.state['small_sepal_length']}</b>
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
						<b>{this.state['big_sepal_length']}</b>
						<label htmlFor="flowerSlider_2"> -- Sepal_Slider_length&#40;cm&#41;</label>
					</p>
					<p>
						<b>{this.state['small_sepal_width']}</b>
						<input 
							type="range" 
							id="flowerSlider_22" 
							name="sepal_slider_input_width" 
							min={this.state['small_sepal_width']} 
							max={this.state['big_sepal_width']} 
							defaultValue={sepWidAvg} 
							step={0.1}
							onChange={this.sepalWidthHandler}
						/>
						<b>{this.state['big_sepal_width']}</b>
						<label htmlFor="flowerSlider_2"> -- Sepal_Slider_width&#40;cm&#41;</label>
					</p>
				</div>
			</div>			
		</div>
	  )
  }
} 

export default FlowerInputs;