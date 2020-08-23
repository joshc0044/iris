import React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import irisData from './irisList.js';
import Flower from './flower.js';

class IrisViewer extends React.Component {
  constructor(props) {
	  super(props);

	  
	 const model = tf.sequential();
	 // https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html#4
	 // Add a single input layer
	 model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
	  
	  // Add an output layer
	 model.add(tf.layers.dense({units: 1, useBias: true}));
	 
	  this.state = { 
	  'model' : model, 
	  'data': irisData,
	  'flowerNum': 0
	  };
	}
	
  componentDidMount() {
	  //this.viewData();
	  window.console.log('making iris viewer ', this.state);
	  let fNum = this.state.flowerNum;
	  this.setState({ 'flowerNum': fNum++ });
	  
	  // make tensorflow scatterplot
	  let flowerData = this.state.data.irisData;
	  /* let values =  flowerData.map(f => ({
		  x: isNaN(parseFloat(f.petal_length)) ? 'n/a' : parseFloat(f.petal_length), 
		  y: isNaN(parseFloat(f.petal_width)) ? 'n/a' : parseFloat(f.petal_width)
	  })) */
	  let petalSeries =  flowerData.map(f => ({
		  x: isNaN(parseFloat(f.petal_length)) ? 'n/a' : parseFloat(f.petal_length), 
		  y: isNaN(parseFloat(f.petal_width)) ? 'n/a' : parseFloat(f.petal_width)
	  }))
	  let sepalSeries =  flowerData.map(f => ({
		  x: isNaN(parseFloat(f.sepal_length)) ? 'n/a' : parseFloat(f.sepal_length), 
		  y: isNaN(parseFloat(f.sepal_width)) ? 'n/a' : parseFloat(f.sepal_width)
	  }))
	  const series = ['Petal stuff', 'Sepal stuff'];
	  const fData = { 
		  values: [petalSeries, sepalSeries], 
		  series
	  }
	  const petalData = {
		  values: petalSeries,
		  series: ['petal']
	  }
	  const opts = {
		  xLabel: 'length',
		  yLabel: 'width',
		  height: 300
	  }
	  tfvis.show.modelSummary({name: 'Model Summary'}, this.state.model);
	  tfvis.render.scatterplot(
			{name: 'petal & sepal - length v width', tab: 'flower_charts'},
			fData,
			opts
		  );
	  tfvis.render.scatterplot(
			{name: 'just petal - length v width', tab: 'petal_chart'},
			petalData,
			opts
		  );
	  /* tfvis.render.scatterplot(
			{name: 'petal_length v petal_width'},
			{values}, 
			{
			  xLabel: 'length',
			  yLabel: 'width',
			  height: 300
			}
		  ); */
	  //console.log(values);
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

export default IrisViewer;