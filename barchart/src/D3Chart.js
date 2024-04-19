import * as d3 from 'd3'

const MARGIN = { TOP: 30, BOTTOM: 300, LEFT: 90, RIGHT: 30 }
const WIDTH = 860 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 800 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
	constructor(element) {
		const vis = this

		vis.svg = d3.select(element)
			.append("svg")
				.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

		vis.xLabel = vis.svg.append("text")
			.attr("x", WIDTH / 2)
			.attr("y", HEIGHT + 50)
			.attr("text-anchor", "middle")

		vis.svg.append("text")
			.attr("x", -(HEIGHT / 2))
			.attr("y", -50)
			.attr("text-anchor", "middle")
			.text("Height in cm")
			.attr("transform", "rotate(-90)")

		vis.xAxisGroup = vis.svg.append("g")
			.attr("transform", `translate(0, ${HEIGHT})`)

		vis.yAxisGroup = vis.svg.append("g")

		Promise.all([
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/top_videos_24_15_03.json"),
			d3.json("https://sentimentviz-default-rtdb.firebaseio.com/top_videos_24_15_04.json")
		]).then((datasets) => {
			
			vis.menData = restructureData(datasets[0]).slice(0, 20)
			console.log("mensData", vis.menData)
			vis.womenData = restructureData(datasets[1]).slice(0,20)
			vis.update("men")
		})
	}

	update(gender) {
		const vis = this

		vis.data = (gender == "men") ? vis.menData : vis.womenData;
		vis.xLabel.text(`The world's tallest ${gender}`)

		const x = d3.scaleBand()
      .range([0, WIDTH])
      .domain(vis.data.map((d) => d.videoTitle))
      .padding(0.5)
    const xAxisCall = d3.axisBottom(x)
    vis.xAxisGroup.transition().duration(500).call(xAxisCall)
      .selectAll("text")
      .style("font-size", "8px")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
  
    const y = d3.scaleLinear()
        .domain([
          d3.min(vis.data, d => d.videoCount) *0.95, 
          d3.max(vis.data, d => d.videoCount)
        ])
        .range([HEIGHT, 0])
  
    const yAxisCall = d3.axisLeft(y)
    vis.yAxisGroup.transition().duration(500).call(yAxisCall)
    console.log("hello again")

    // DATA JOIN
    const rects = vis.svg.selectAll("rect")
      .data(vis.data)

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