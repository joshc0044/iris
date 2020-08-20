import React from 'react';
import ReactDOM from 'react-dom';
import irisData from './irisList.js';

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
	componentDidUpdate(prevProps) {
		
		let inputObj = {
			'petal_length':this.state.petal_length_input === 'none' ? '1' : this.state.petal_length_input,
			'petal_width': this.state.petal_width_input === 'none' ? '1' : this.state.petal_width_input,
			'sepal_length': this.state.sepal_length_input === 'none' ? '1' : this.state.sepal_length_input,
			'sepal_width': this.state.sepal_width_input === 'none' ? '1' : this.state.sepal_width_input,
			'species': 'user_input'
		};
		window.console.log('prevProps ', prevProps);
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
			
	
		</div>
	  )
  }
}
		/*{<h3>petal length {this.state.petal_length_input}</h3>
			<h3>petal width {this.state.petal_width_input}</h3>
			<h3>sepal length {this.state.sepal_length_input}</h3>
			<h3>sepal width {this.state.sepal_width_input}</h3>}*/
export default FlowerInputs;