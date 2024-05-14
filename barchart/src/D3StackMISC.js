import * as d3 from 'd3';

const MARGIN = { TOP: 30, BOTTOM: 300, LEFT: 90, RIGHT: 30 }
const WIDTH = 860 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 800 - MARGIN.TOP - MARGIN.BOTTOM;
const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

export default class D3Chart {
	constructor(element) {
		const vis = this

		//vis.svg = d3.select(element)
		//	.append("svg")
		//		.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
		//		.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
		//	.append("g")
		//		.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

		//vis.svg = d3.create("svg")
		//		.attr("width", WIDTH)
		//		.attr("height", HEIGHT)
		//	.attr("viewBox", [0,0, WIDTH,HEIGHT])
		//	.attr("style", "max-width: 100%, height: auto;");

		//vis.xLabel = vis.svg.append("text")
		//	.attr("x", WIDTH / 2)
		//	.attr("y", HEIGHT + 80)
		//	.attr("text-anchor", "middle")
		//	.style("font-size", "19px")

		//vis.svg.append("text")
		//	.attr("x", -(HEIGHT / 2))
		//	.attr("y", -75)
		//	.attr("text-anchor", "middle")
		//	.text("Number of Views")
		//	.attr("transform", "rotate(-90)")

		//vis.xAxisGroup = vis.svg.append("g")
	//		.attr("transform", `translate(0, ${HEIGHT})`)

		//vis.yAxisGroup = vis.svg.append("g")

		Promise.all([
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/sentiments_24_15_03.json"),
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/sentiments_24_22_03.json"),
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/sentiments_24_29_03.json"),
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/sentiments_24_05_04.json"),
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/sentiments_24_15_04.json")
		]).then((datasets) => {
			console.log(datasets[0]['US'])

			var polarityCount = countPolarity(datasets[0])
			console.log("the polarity count is", polarityCount);
			
			//const march15DataTemp2 = countPolarity(datasets[0])
			//const march22DataTemp2 = countPolarity(datasets[1])
			//const march29DataTemp2 = countPolarity(datasets[2])
			//const april05DataTemp2 = countPolarity(datasets[3])
			//const april15DataTemp2 = countPolarity(datasets[4])
			//console.log("the march polarity data", march15DataTemp2)


			const march15DataRestructured = restrucOrigData(datasets[0])
			const march15DataTemp = getPolarityCount(march15DataRestructured)

			const march22DataRestructured = restrucOrigData(datasets[1])
			const march22DataTemp = getPolarityCount(march22DataRestructured)

			const march29DataRestructured = restrucOrigData(datasets[2])
			const march29DataTemp = getPolarityCount(march29DataRestructured)

			const april05DataRestructured = restrucOrigData(datasets[3])
			const april05DataTemp = getPolarityCount(april05DataRestructured)

			const april15DataRestructured = restrucOrigData(datasets[4])
			const april15DataTemp = getPolarityCount(april15DataRestructured)


			console.log("march 15 Data", march15DataTemp)

			//vis.march15Data = reorganizeData(march15DataTemp).slice(0, 20); // march15DataTemp.slice(0, 20); //
			vis.march15Data = march15DataTemp.slice(0, 21); // march15DataTemp.slice(0, 20); //
			//vis.march22Data = reorganizeData(march22DataTemp).slice(0, 20); //march22DataTemp.slice(0, 20); //
			//vis.march29Data = reorganizeData(march29DataTemp).slice(0, 20); //march29DataTemp.slice(0, 20); //reorganizeData(march29DataTemp).slice(0, 20);
			//vis.april05Data = reorganizeData(april05DataTemp).slice(0, 20); //april05DataTemp.slice(0, 20); // reorganizeData(april05DataTemp).slice(0, 20);
			//vis.april15Data = reorganizeData(april15DataTemp).slice(0, 20); //april15DataTemp.slice(0, 20); //reorganizeData(april15DataTemp).slice(0, 20);

			//console.log("april15Data", vis.april15Data)
			//console.log("Number of Positive Comments from first video is ", vis.march15Data.find(item => item.videoID === "0AW21jPu-Wc")['sentimentData'].find(item => item.analysis === "Positive")['count'])
			//console.log("The categories of sentiments are ", vis.march15Data.find(item => item.videoID === "0AW21jPu-Wc")['sentimentData'])
			//var dataExp = {};


			//var dataExp.map(( d = )
			//	NegativeSetimentCount:vis.march15Data.flatMap(videoID => [videoID['sentimentData'].find(item => item.analysis =="Negative")['count']]) 
			//} 
			//vis.march15Data.flatMap(videoID => [videoID['sentimentData'].find(item => item.analysis =="Negative")['count']])

			//console.log("experimental reorg", vis.march15Data.flatMap( a => [ a.sentimentData.map(b => [b.analysis, b.count, a.videoID] )]));//.map(c =>c.Negative)]));  //concat(a)] )); //[ a.sentimentData.concat(a)] ));
			//console.log("experimental reorg2", vis.march15Data[0]['sentimentData'].find(item => item.analysis =="Negative")['count'])
			//console.log("experimental reorg3", vis.march15Data.forEach(videoID => [ videoID.negativeSentiment = videoID['sentimentData'].find(item => item.analysis =="Negative")['count']] ))
			//console.log("experimental reorg4", vis.march15Data.flatMap(videoID => ({NegativeCount: [videoID['sentimentData'].find(item => item.analysis =="Negative")['count']]})))
			//console.log("experimental reorg5", dataExp)
			//console.log("experimental reorg5", vis.march15Data.flatMap( a => [ a.sentimentData.map(b => [{b.analysis: b.count}, a.videoID] )]))

			//const children = [];
			//vis.march15Data.forEach(item => {
			//	const dataExp = {
			//		videoID: item.videoID,
			//		negativeSentimentCount: item.sentimentData.find(item =>item.analysis =="Negative")['count'],
			//		neutralSentimentCount: item.sentimentData.find(item =>item.analysis =="Neutral")['count'],
			//		positiveSentimentCount: item.sentimentData.find(item =>item.analysis =="Positive")['count']
			//	}
			//	children.push(dataExp);
			//})
			//console.log("experimental reorg5", children)
			//console.log("nexperimental reorg6", vis.march15Data.flatMap(
			//	(elem) =>elem.sentimentData
			//	)
			//)

			//const fn = arr => arr.flatMap(({ sentimentData, ...rest }) =>
			//	sentimentData.map( o => ({
		//			...rest,
		//			...o
		//		}))
		//	)
			//const DataExp2 = vis.march15Data.map(({ videoID, sentimentData }) =>
			//	sentimentData.map( {o => ({
			//		...rest,
			//		...o
			//	}))
			//)
		
			//console.log('expiremental reorg5', DataExp2)


			//var newData = [];
			//for(const videoID in vis.march15Data) {
			//	newData.push({
			//	//videoTitle: videoID,
			//	negativeSentiment: vis.march15Data.map(videoID => [videoID['sentimentData'].find(item => item.analysis =="Negative")['count']])
			//	});
			//}
			//console.log("the new exp reorg4", newData)
			const data = vis.march15Data;
			 // Determine the series that need to be stacked.
			const series = d3.stack()
			.keys(d3.union(data.map(d => d.analysis))) // distinct series keys, in input order
			.value(([, D], key) => D.get(key).count) // get value for each series key and stack
			(d3.index(data, d => d.videoID, d => d.analysis));

			  //Prepare the scales for positional and color encodings.
			const x = d3.scaleBand()
			.domain(d3.groupSort(data, D => -d3.sum(D, d => d.count), d => d.videoID))
			.range([marginLeft, WIDTH - marginRight])
			.padding(0.1);

			const y = d3.scaleLinear()
			.domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
			.rangeRound([HEIGHT - marginBottom, marginTop]);

			const color = d3.scaleOrdinal()
			.domain(series.map(d =>d.key))
			.range(d3.schemeSpectral[series.length]) 
			.unknown("#cc");

			//A function to format the value in the tooltip.
			const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

			//Create the SVG container
			vis.svg = d3.create("svg")
			.attr("width", WIDTH)
			.attr("height", HEIGHT)
			.attr("viewBox", [0,0, WIDTH, HEIGHT])
			.attr("style", "max-width: 100%, height: auto;");

			
			
			//Append a group for each series, and a rect for each element in the series.
			vis.svg.append("g")
			.selectAll()
			.data(series)
			.join("g")
			.attr("fill", d => color(d.key))
			.selectAll("rect")
			.data(D => D.map(d => (d.key = D.key, d)))
			.join("rect")
				.attr("x", d => x(d.data[0]))
				.attr("y", d => y(d[1]))
				.attr("height", d => y(d[0]) - y(d[1]))
				.attr("width", x.bandwidth())
			.append("title")
			.text(d => `${d.data[0]} ${d.key}\n${formatValue(d.data[1].get(d.key).count)}`);


			 //Append the horizontal axis
			vis.svg.append("g")
			.attr("transform", `translate(0,${HEIGHT - marginBottom})`) 
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.call(g => g.selectAll('.domain').remove());

			//Append the vertical axis
			vis.svg.append("g")
			.attr("transform", `translate($marginLeft},0)`)
			.call(g => g.selectAll(".domain").remove());

		// vis.update("march15")
					})
				}

	update(date) {
		const vis = this

		//vis.data = (date == "march15") ? vis.march15Data : vis.april15Data;

		if (date == "march15") vis.data = vis.march15Data
		else if (date == "march22") vis.data = vis.march22Data
		else if (date == "march29") vis.data = vis.march29Data
		else if (date == "april05") vis.data = vis.april05Data
		else if (date == "april15") vis.data = vis.april15Data


		const month = date.slice(0, -2).charAt(0).toUpperCase() + date.slice(0, -2).slice(1) 
		const convertedDate = date.substr(date.length-2);
		const converted_month_date = month.concat(" ", convertedDate)

		//console.log("converted date month", converted_month_date)


		//vis.xLabel.text(`Top Trending Videos on ${converted_month_date}`)

		//console.log("the video data", vis.data)

		const sentimentCategories = ['Negative', 'Neutral', 'Positive']
		console.log("sentimentCategories", sentimentCategories)

		// Determine the series that need to be stacked.  
		//const series = d3.stack()
	//		.keys(d3.union(vis.data.map(d=>d)))
		//console.log("the new data", vis.data.map(d=>d.sentimentData).map(d=>d.analysis))

		const x = d3.scaleBand()
      		.range([0, WIDTH])
      		//.domain(vis.data.map((d) => d.videoID))
			.domain(d3.groupSort(vis.data, D => -d3.sum(D, d => d.count), d => d.videoID))
			.padding(0.5)
    	
		// const xAxisCall = d3.axisBottom(x)
    
		//vis.xAxisGroup.transition().duration(500).call(xAxisCall)
      	//	.selectAll("text")
      	//	.style("font-size", "8px")
      	//	.attr("transform", "translate(-10,0)rotate(-45)")
      	//	.style("text-anchor", "end")
  
    	//const y = d3.scaleLinear()
        //	.domain([
        // 	d3.min(vis.data, d => d.videoCount) *0.95, 
        //  	d3.max(vis.data, d => d.videoCount)
        //	])
        //	.range([HEIGHT, 0])

		//console.log(d3);	

		const series = d3.stack()
			.keys(d3.union(vis.data.map(d => d.analysis))) // distinct series keys, in input order
			.value(([, D], key) => D.get(key).count) // get value for each series key adn stack
			(d3.index(vis.data, d =>d.videoID, d => d.analysis));

		const y = d3.scaleLinear()
			.domain([0, d3.max(series, d => d3.max(d, d => d[1]))]) 
			.rangeRound([HEIGHT, 0]);
  
    	//const yAxisCall = d3.axisLeft(y)
    	//vis.yAxisGroup.transition().duration(500).call(yAxisCall)
    	//console.log("hello again")
		
		//color palette = one color per subgroup
		const color = d3.scaleOrdinal()
			.domain(series.map(d => d.key))
			.range(d3.schemeSpectral[series.length])
			.unknown("#ccc"); 
			
		const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

    	// DATA JOIN
    	const rects =    //Append a group for each series, and a rect for each element in the series.
		vis.svg.append("g")
		  .selectAll()
		  .data(series)
		  .join("g")
		  .attr("fill", d => color(d.key))
		  .selectAll("rect")
		  .data(D => D.map(d => (d.key = D.key, d)))
		  .join("rect")
			.attr("x", d => x(d.data[0]))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]))
			.attr("width", x.bandwidth())
		  .append("title")
		  .text(d => `${d.data[0]} ${d.key}\n${formatValue(d.data[1].get(d.key).count)}`);

		

    	// EXIT 
    	rects.exit()
        	.transition().duration(500)
        		.attr("height", 0)
        		.attr("y", HEIGHT)
        		.remove()

    	// UPDATE 
    	rects.transition().duration(500)
      		.attr("x", d => x(d.videoTitle))
      		.attr("y", d => y(d.videoCount))
      		.attr("width", x.bandwidth)
      		.attr("height", d => HEIGHT - y(d.videoCount))

    	// ENTER
    	rects.enter().append("rect")
      	.attr("x", d => x(d.videoTitle))
      	.attr("width", x.bandwidth)
      	.attr("fill", "#5f0f40")
      	.attr("y", HEIGHT)
      	.transition().duration(500)
        	.attr("height", d => HEIGHT - y(d.videoCount))
        	.attr("y", d => y(d.videoCount))
	}
}



function restructureData(raw_data) {
	var USAVideoCount = [];
	for(const videoID in raw_data['US']) {
		USAVideoCount.push({
			videoTitle: videoID,
			videoCount: Number(raw_data['US'][videoID]['view_count'])
		});
	}
	USAVideoCount = USAVideoCount.sort((a,b) => (a.videoCount < b.videoCount) ? 1: -1) 
	return USAVideoCount
}

function countPolarity(rawData){
	var polarityCount = [];
	var obj = {};
	var countP = 0 ;
	var countN = 0 ;
	var countNe = 0 ;
	for (const videoID in rawData['US']){

		for (const user in rawData['US'][videoID]){
			if (rawData['US'][videoID][user]['Analysis'] == 'Positive') obj[countP] = (obj[countP] || 0) + 1	
			else if (rawData['US'][videoID][user]['Analysis'] == 'Neutral') obj[countNe] = (obj[countNe] || 0) + 1
			else if (rawData['US'][videoID][user]['Analysis'] == 'Negative') obj[countN] = (obj[countN] || 0) + 1
		}	
	polarityCount.push({
		videoID: videoID,
		polarityPositive: Number(obj[countP]),
		polarityNeutral: Number(obj[countNe]),
		polarityNegative: Number(obj[countN])
	})

	countP=0;
	countN=0;
	countNe=0;
		
	return polarityCount 
	}	
}

function countPolarity2(rawData){
	for (const videoID in rawData['US']){
		const out = Object.values(rawData['US'][videoID].reduce((acc, {current}) => {
			//Destructure the properites from the current object
			const {videoID, Analysis } = current;
			//If the object doesn't already contain an Analysis key set up a new object with
			// empty 
			acc[videoID] = acc[videoID] || {videoID, Analysis : []}
			
			// Push the analysis of the current object to analysis array
			acc[videoID].Analysis.push(Analysis);

			// Return the accumulator for the next iteration
			return acc;
		}, {})); 
	}
	//return acc;

}

function restrucOrigData(rawData) {
	const newData = [];
	for (const videoID in rawData['US']){
		for ( const user in rawData['US'][videoID]){
			newData.push({
				videoID: videoID,
				user: user,
				analysis: rawData['US'][videoID][user]['Analysis'],
				comments: rawData['US'][videoID][user]['Comments'],
				polarity: rawData['US'][videoID][user]['Polarity']
			})
		}
	}
	return newData
}

function restrucNewData(rawData) {
	const newData = [];
	for (const videoID in rawData){
		newData.push({
			videoID: rawData['videoID'],
			negative: rawData['sentimentData'].map(e => e.analysis) //['analysis']['Negative'].map(d=>d.count)
		})
	}
}

function getPolarityCount(rawData){
	const res = rawData.reduce((acc, obj) => {
		const existingIndex = acc.findIndex(
			el => el.videoID == obj.videoID && el.analysis == obj.analysis
		)
		if (existingIndex > -1) {
			acc[existingIndex].count += 1
		} else {
			acc.push({
				videoID: obj.videoID,
				analysis: obj.analysis,
				count: 1
			})
		}
		return acc
	}, [])
	return res
}

function reorganizeData(polarityData) {
	const result = [ ...polarityData
		.reduce((acc, {videoID, analysis, count}) => {
			const group = acc.get(videoID)
			//group ? group.sentimentData.push({analysis, count}) : acc.set(videoID, {videoID, "sentimentData":[{analysis, count}]})
			group ? group.sentimentData.push({analysis, count}) : acc.set(videoID, {videoID, "sentimentData":[{analysis, count}]})
			return acc
		}, new Map)
		.values()
	]
	return result 
	}

/*
function countPolarity2(rawData){
	var polarityCount = [];
	var temp = [rawData[0]];
	for (const index = 1; index < rawData.length; index++){  //videoID in rawData['US']){
		for (const  subindex = 1; subindex < index.length; subindex++){ //user in rawData['US'][videoID]){
			if ( rawData[index][subindex] == rawData[index -1][subindex -1] + 1) { //rawData['US'][videoID][user]['Analysis'] == 'Positive'){
				polarityCount.push({
					videoID: videoID,
					polarityPositive: countP += 1
				})
			} else 
			if (rawData['US'][videoID][user]['Analysis'] == 'Neutral'){
				polarityCount.push({
					videoID: videoID,
					polarityPositive: countN += 1
				})
			} else 
			if (rawData['US'][videoID][user]['Analysis'] == 'Negative'){
				polarityCount.push({
					videoID: videoID,
					polarityPositive: countNe += 1
				})
			}
		}
	}
	return polarityCount 
}
*/
