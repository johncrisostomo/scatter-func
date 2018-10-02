/****
 *
 *  Author: John Crisostomo
 *  GitHub: https://www.github.com/johncrisostomo
 *  Date:   October 1, 2018
 ****/

var xScale = d3.scale.linear();
var yScale = d3.scale.linear();

function ScatterPlot() {
    var outerWidth = 650;
    var outerHeight = 500;

    var margin = { top: 50, right: 100, bottom: 50, left: 50 };

    var xColumn = '';
    var yColumn = '';

    var chartTitle = '';
    var xAxisLabel = '';
    var yAxisLabel = '';

    var xformat = d3.format('.2');
    var yformat = d3.format('.1');

    var xDomainCallBack = function() {};
    var yDomainCallBack = function() {};

    var crossFilter = function() {};
    var crossTransform = function() {};
    var crossStroke = function() {};

    var circleFilter = function() {};
    var circleCx = function() {};
    var circleCy = function() {};
    var circleStroke = function() {};

    function chart(selection) {
        var w = outerWidth - margin.left - margin.right;
        var h = outerHeight - margin.top - margin.bottom;

        var xAxis = d3.svg
            .axis()
            .scale(xScale)
            .tickFormat(xformat)
            .ticks(10)
            .orient('bottom')
            .innerTickSize(-h)
            .outerTickSize(0)
            .tickPadding(10);

        var yAxis = d3.svg
            .axis()
            .scale(yScale)
            .tickFormat(yformat)
            .ticks(10)
            .orient('left')
            .innerTickSize(-w)
            .outerTickSize(0)
            .tickPadding(10);

        selection.each(function(data) {
            var c = d3
                .select(this)
                .append('svg')
                .attr('height', h + margin.top + margin.bottom)
                .attr('width', w + margin.left + margin.right)
                .append('g')
                .attr(
                    'transform',
                    'translate(' + margin.left + ',' + margin.top + ')'
                );

            xScale
                .domain([
                    d3.min([0, d3.min(data, xDomainCallBack)]),
                    d3.max([0, d3.max(data, xDomainCallBack)])
                ])
                .range([0, w]);

            yScale
                .domain([
                    d3.min([0, d3.min(data, yDomainCallBack)]),
                    d3.max([0, d3.max(data, yDomainCallBack)])
                ])
                .range([h, 0]);

            // Draw Circle
            c.selectAll('path')
                .data(data)
                .enter()
                .append('circle')
                .filter(circleFilter)
                .attr('cx', circleCx)
                .attr('cy', circleCy)
                .attr('r', 3)
                .attr('stroke', circleStroke)
                .attr('stroke-width', 1)
                .attr('fill', 'none');
            // End of Draw Circle

            // Draw Cross
            c.selectAll('.point')
                .data(data)
                .enter()
                .append('path')
                .attr('class', 'point')
                .filter(crossFilter)
                .attr(
                    'd',
                    d3.svg
                        .symbol()
                        .size(30)
                        .type('cross')
                )
                .attr('transform', crossTransform)
                .attr('stroke', crossStroke)
                .attr('stroke-width', 1)
                .attr('fill', 'none')
                .on('mouseover', function() {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr(
                            'd',
                            d3.svg
                                .symbol()
                                .size(45)
                                .type('cross')
                        )
                        .attr('stroke-width', 3);
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr(
                            'd',
                            d3.svg
                                .symbol()
                                .size(30)
                                .type('cross')
                        )
                        .attr('stroke-width', 1);
                });
            // End of Draw Cross

            // X-axis Label
            c.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + h + ')')
                .call(xAxis)
                .append('text') // X-axis Label
                .attr('class', 'label')
                .attr('y', -10)
                .attr('x', w + 50)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text(xAxisLabel);

            // Y-axis Label
            c.append('g')
                .attr('class', 'axis')
                .call(yAxis)
                .append('text') // y-axis Label
                .attr('class', 'label')
                .attr('transform', 'rotate(-90)')
                .attr('x', 0)
                .attr('y', 5)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text(yAxisLabel);

            // legend
            var legendWidth = 100;
            var legendHeight = 90;

            var legend = c
                .append('g')
                .attr('class', 'Legend')
                .attr('width', legendWidth)
                .attr('height', legendHeight);

            legend
                .append('path')
                .attr('class', 'point')
                .attr(
                    'd',
                    d3.svg
                        .symbol()
                        .size(20)
                        .type('cross')
                )
                .attr('transform', function(d) {
                    return 'translate(' + (w + 20) + ',' + 20 + ')';
                })
                .attr('stroke', 'blue')
                .attr('stroke-width', 1)
                .attr('fill', 'none');

            legend
                .append('text')
                .attr('x', w + 80)
                .attr('y', 20)
                .attr('dy', '.35em')
                .style('text-anchor', 'end')
                .style('font-size', '12px')
                .text('good rating');

            legend
                .append('circle')
                .attr('cx', w + 20)
                .attr('cy', 35)
                .attr('r', '3')
                .attr('stroke', 'red')
                .attr('stroke-width', 1)
                .attr('fill', 'none');

            legend
                .append('text')
                .attr('x', w + 75)
                .attr('y', 35)
                .attr('dy', '.35em')
                .style('text-anchor', 'end')
                .style('font-size', '12px')
                .text('bad rating');

            // title
            c.append('text')
                .attr('x', w / 2)
                .attr('y', 0 - margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .style('text-decoration', 'underline')
                .text(chartTitle);
        });
    }

    chart.outerWidth = function(_) {
        if (!arguments.length) return outerWidth;
        outerWidth = _;
        return chart;
    };

    chart.outerHeight = function(_) {
        if (!arguments.length) return outerHeight;
        outerHeight = _;
        return chart;
    };

    chart.xDomainCallBack = function(_) {
        if (!arguments.length) return xDomainCallBack;
        xDomainCallBack = _;
        return chart;
    };

    chart.yDomainCallBack = function(_) {
        if (!arguments.length) return yDomainCallBack;
        yDomainCallBack = _;
        return chart;
    };

    chart.xColumn = function(_) {
        if (!arguments.length) return xColumn;
        xColumn = _;
        return chart;
    };

    chart.yColumn = function(_) {
        if (!arguments.length) return yColumn;
        yColumn = _;
        return chart;
    };

    chart.rColumn = function(_) {
        if (!arguments.length) return rColumn;
        rColumn = _;
        return chart;
    };

    chart.chartTitle = function(_) {
        if (!arguments.length) return chartTitle;
        chartTitle = _;
        return chart;
    };

    chart.xAxisLabel = function(_) {
        if (!arguments.length) return xAxisLabel;
        xAxisLabel = _;
        return chart;
    };

    chart.yAxisLabel = function(_) {
        if (!arguments.length) return yAxisLabel;
        yAxisLabel = _;
        return chart;
    };

    chart.crossFilter = function(_) {
        if (!arguments.length) return crossFilter;
        crossFilter = _;
        return chart;
    };

    chart.crossTransform = function(_) {
        if (!arguments.length) return crossTransform;
        crossTransform = _;
        return chart;
    };

    chart.circleFilter = function(_) {
        if (!arguments.length) return circleFilter;
        circleFilter = _;
        return chart;
    };

    chart.circleCx = function(_) {
        if (!arguments.length) return circleCx;
        circleCx = _;
        return chart;
    };

    chart.circleCy = function(_) {
        if (!arguments.length) return circleCy;
        circleCy = _;
        return chart;
    };

    chart.circleStroke = function(_) {
        if (!arguments.length) return circleStroke;
        circleStroke = _;
        return chart;
    };

    chart.crossStroke = function(_) {
        if (!arguments.length) return crossStroke;
        crossStroke = _;
        return chart;
    };

    chart.xAxisLabelOffset = function(_) {
        if (!arguments.length) return xAxisLabelOffset;
        xAxisLabelOffset = _;
        return chart;
    };

    chart.yAxisLabelOffset = function(_) {
        if (!arguments.length) return yAxisLabelOffset;
        yAxisLabelOffset = _;
        return chart;
    };

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    return chart;
}
