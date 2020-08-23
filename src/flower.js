import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import * as tfvis from '@tensorflow/tfjs-vis';

class Flower extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { 'flowerData': this.props.flowerStuff, fNum: this.props.fNum };
		this.makeTable = this.makeTable.bind(this);
	   }
	   
	/**
	* https://www.d3indepth.com/shapes/
	*/
  componentDidMount(){
		
		//console.log('making flower ', this.state.fNum);
		const flower = d3.select("#d3_flower_"+this.props.fNum);
		//console.log("flower state", this.state);
		//console.log("tfvis" , tfvis);
		let lineGenerator = d3.line().curve(d3.curveCardinal);
		let width = 300;
		let height = 300;
		let flowerSvg = flower.append("svg").attr("width", width).attr("height", height);
		let points = [
		  [140, 100],
		  [150, 270],
		  [160, 300]
		];
		let pathData = lineGenerator(points);
		
		// make stem part
		flowerSvg.append("path").attr('d', pathData).style("stroke", "rgb(103, 255, 0)").style("stroke-width", 2).style("fill", "darkolivegreen");
		
		// make flower part
		let radialLineGenerator = d3.radialLine();
		let oneFlower = this.state.flowerData;
		//let values =  [{x: oneFlower.petal_length, y: oneFlower.petal_width}];
		//const values = [{x: 2,y: 4}, {x: 4,y: 6}];
		//console.log('fValues', values);
		// adding text to svg
		/*flowerSvg
			.append("text")
			.attr("id", "flowerText_"+this.props.fNum)
			.attr("transform", "translate(0, 110)")
			.attr("font-size", "12px")
			.attr("x", "0")
			.attr("y", "0")
			.attr("dy", "0")
			// .append("tspan")
			// .text("text2")
			// .attr("x", "0")
			// .attr("dy", "15")
			// .attr("fill", "red");
		Object.entries(oneFlower).forEach((items, index) => {
			let flowerTextStuff = d3.select("#flowerText_"+this.props.fNum);
			flowerTextStuff.append("tspan")
			.text(items[0] + ":" + items[1])
			.attr("x", "0")
			.attr("dy", "15");
		})*/
		
		let petalWidth = parseFloat(oneFlower.petal_width);
		let petalLength = parseFloat(oneFlower.petal_length);
		let sepallWidth = parseFloat(oneFlower.sepal_width);
		let sepalLength = parseFloat(oneFlower.sepal_length);
		if(isNaN(petalWidth)) {
			petalWidth = 1;
		}
		if(isNaN(petalLength)) {
			petalLength = 1;
		}
		if(isNaN(sepallWidth)) {
			sepallWidth = 1;
		}
		if(isNaN(sepalLength)) {
			sepalLength = 1;
		}
		// let lengthFactor = 20 * petalLength;
		// let widthFactor = 80 * petalWidth;
		// let sepalLenFactor = 20 * sepalLength;
		// let sepalWidFactor = 40 * sepallWidth;
		//let factorList = [lengthFactor, widthFactor, sepalLenFactor, sepalWidFactor];
		let factorList = [petalLength, petalWidth, sepalLength, sepallWidth];
		let flowerMin = Math.min(...factorList);
		let flowerMax = Math.max(...factorList);
		let normalize = (min, max) => {
			let delta = max - min;
			return function (val) {
				return (val - min) / delta;
			}
		};
		let normlizedStuff = factorList.map(normalize(flowerMin, flowerMax));
		//console.log(normlizedStuff);
		let lengthFactor = 20 * normlizedStuff[0];
		lengthFactor = lengthFactor === 0 ? 1 : lengthFactor;
		let widthFactor = 80 * normlizedStuff[1];
		widthFactor = widthFactor === 0 ? 1 : widthFactor;
		let sepalLenFactor = 20 * normlizedStuff[2];
		sepalLenFactor = sepalLenFactor === 0 ? 1 : sepalLenFactor;
		let sepalWidFactor = 40 * normlizedStuff[3];
		sepalWidFactor = sepalWidFactor === 0 ? 1 : sepalWidFactor;
		if(flowerMin === flowerMax) {
			lengthFactor = 10;
			widthFactor = 40;
			sepalLenFactor = 10;
			sepalWidFactor = 20;
		}
		var flowerPoints = [
			{angle: 0, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 0.25, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI * 0.5, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 0.75, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 1.25, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI * 1.5, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 1.75, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI * 2, r0: lengthFactor, r1: widthFactor}
		];
		// var flowerPoints = [
			// {angle: 0, r0: normlizedStuff[0] * 20, r1: normlizedStuff[1] * 80},
			// {angle: Math.PI * 0.25, r0: normlizedStuff[2] * 20, r1:  40},
			// {angle: Math.PI * 0.5, r0: normlizedStuff[0] * 20, r1: normlizedStuff[1] * 80},
			// {angle: Math.PI * 0.75, r0: normlizedStuff[2] * 20, r1:  40},
			// {angle: Math.PI, r0: normlizedStuff[0] * 20, r1: normlizedStuff[1] * 80},
			// {angle: Math.PI * 1.25, r0: normlizedStuff[2] * 20, r1: 40},
			// {angle: Math.PI * 1.5, r0: normlizedStuff[0] * 20, r1: normlizedStuff[1] * 80},
			// {angle: Math.PI * 1.75, r0: normlizedStuff[2] * 20, r1:  40},
			// {angle: Math.PI * 2, r0: normlizedStuff[0] * 20, r1: normlizedStuff[1] * 80}
		// ];
		var radialAreaGenerator = d3.radialArea()
		  .angle(function(d) {
			return d.angle;
		  })
		  .innerRadius(function(d) {
			return d.r0;
		  })
		  .outerRadius(function(d) {
			return d.r1;
		  });
		//let flowerPath = radialAreaGenerator(flowerPoints);
		//let flowerPath = radialLineGenerator(fpoints);
		let flowerThing = radialAreaGenerator(flowerPoints);
		
		flowerSvg.append("g")
		.attr("transform", "translate(140, 85)")
		.append("path")
		.attr("d", flowerThing);
		// flowerSvg.append("line").attr("x1", 1)
            // .attr("y1", 1)
            // .attr("x2", 200)
            // .attr("y2", 200).style("stroke", "rgb(255,0,0)").style("stroke-width", 2);
	  }
  componentDidUpdate(prevProps){
	  //console.log('making new flower ', this.props);
	  // using specific div id of 169 to manually select user input flower
	  if(this.props.fNum === 169){
		  this.updateFlower();
	  }
	  
  }
  
  updateFlower(){
	  //d3.selectAll("svg > *").remove();
	  const flower = d3.select("#d3_flower_169");

	  flower.selectAll("*").remove();
		//console.log("flower state", this.state);

		let lineGenerator = d3.line().curve(d3.curveCardinal);
		let width = 300;
		let height = 300;
		let flowerSvg = flower.append("svg").attr("width", width).attr("height", height);
		let points = [
		  [140, 100],
		  [150, 270],
		  [160, 300]
		];
		let pathData = lineGenerator(points);
		
		// make stem part
		flowerSvg.append("path").attr('d', pathData).style("stroke", "rgb(103, 255, 0)").style("stroke-width", 2).style("fill", "darkolivegreen");
		
		// make flower part
		let radialLineGenerator = d3.radialLine();
	

		//let oneFlower = this.state.flowerData;
		let oneFlower = this.props.flowerStuff;


		// adding text to svg
		flowerSvg
			.append("text")
			.attr("id", "flowerText_"+this.props.fNum)
			.attr("transform", "translate(0, 110)")
			.attr("font-size", "12px")
			.attr("x", "0")
			.attr("y", "0")
			.attr("dy", "0");
		Object.entries(oneFlower).forEach((items, index) => {
			let flowerTextStuff = d3.select("#flowerText_"+this.props.fNum);
			flowerTextStuff.append("tspan")
			.text(items[0] + ":" + items[1])
			.attr("x", "0")
			.attr("dy", "15");
		})
		let petalWidth = parseFloat(oneFlower.petal_width);
		let petalLength = parseFloat(oneFlower.petal_length);
		let sepallWidth = parseFloat(oneFlower.sepal_width);
		let sepalLength = parseFloat(oneFlower.sepal_length);
		if(isNaN(petalWidth)) {
			petalWidth = 1;
		}
		if(isNaN(petalLength)) {
			petalLength = 1;
		}
		if(isNaN(sepallWidth)) {
			sepallWidth = 1;
		}
		if(isNaN(sepalLength)) {
			sepalLength = 1;
		}
		let factorList = [petalLength, petalWidth, sepalLength, sepallWidth];
		let flowerMin = Math.min(...factorList);
		let flowerMax = Math.max(...factorList);
		let normalize = (min, max) => {
			let delta = max - min;
			return function (val) {
				return (val - min) / delta;
			}
		};
		let normlizedStuff = factorList.map(normalize(flowerMin, flowerMax));
		//console.log(normlizedStuff);
		let lengthFactor = 20 * normlizedStuff[0];
		lengthFactor = lengthFactor === 0 ? 1 : lengthFactor;
		let widthFactor = 80 * normlizedStuff[1];
		widthFactor = widthFactor === 0 ? 1 : widthFactor;
		let sepalLenFactor = 20 * normlizedStuff[2];
		sepalLenFactor = sepalLenFactor === 0 ? 1 : sepalLenFactor;
		let sepalWidFactor = 40 * normlizedStuff[3];
		sepalWidFactor = sepalWidFactor === 0 ? 1 : sepalWidFactor;
		if(flowerMin === flowerMax) {
			lengthFactor = 10;
			widthFactor = 40;
			sepalLenFactor = 10;
			sepalWidFactor = 20;
		}
		var flowerPoints = [
			{angle: 0, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 0.25, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI * 0.5, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 0.75, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 1.25, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI * 1.5, r0: lengthFactor, r1: widthFactor},
			{angle: Math.PI * 1.75, r0: sepalLenFactor, r1: sepalWidFactor},
			{angle: Math.PI * 2, r0: lengthFactor, r1: widthFactor}
		];
		var radialAreaGenerator = d3.radialArea()
		  .angle(function(d) {
			return d.angle;
		  })
		  .innerRadius(function(d) {
			return d.r0;
		  })
		  .outerRadius(function(d) {
			return d.r1;
		  });
		//let flowerPath = radialAreaGenerator(flowerPoints);
		//let flowerPath = radialLineGenerator(fpoints);
		let flowerThing = radialAreaGenerator(flowerPoints);
		
		flowerSvg.append("g")
		.attr("transform", "translate(140, 85)")
		.append("path")
		.attr("d", flowerThing);
  }
  
  makeTable() {
	  let flowerData = this.state.flowerData;
	  flowerData = this.props.flowerStuff;
	  let flowerKeys = Object.keys(flowerData);

	  //flowerKeys.map(key => {console.log('fkey', key)});
	  return (
		  <table style={{"border":"2px solid #333"}}>
			  <thead>
				<tr>
					<th colSpan="2">flower_{this.state.fNum}</th>
				</tr>
			  </thead>
			  <tbody>
				
				{flowerKeys.map(key => {return (
					<tr key={'flower_table_row_key_'+key}>
						<td style={{"border":"1px solid #133"}}>
							{key}
						</td>
						<td style={{"border":"1px solid #133"}}>
							{flowerData[key]}
						</td>
					</tr>
				)})}
				
			  </tbody>
		  </table>
	  );
  }
  
  render() {
	let flowerId = "d3_flower_" + this.props.fNum;
    return (
      <div style={{"border": "1px dashed #00ff00", "padding": "4px"}}>
		{this.makeTable()}
		<div id={flowerId} />
      </div>
    );
  }
}

export default Flower;