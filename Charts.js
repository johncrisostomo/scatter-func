var Chart1 = ScatterPlot()
    .xDomainCallBack(function(d) {
        return +d.imdbRating;
    })
    .yDomainCallBack(function(d) {
        return d.WinsNoms;
    })
    .circleFilter(function(d) {
        return d.IsGoodRating == 0;
    })
    .circleCx(function(d) {
        return xScale(+d.imdbRating);
    })
    .circleStroke(function(d) {
        return d.IsGoodRating == 0 ? 'red' : 'blue';
    })
    .circleCy(function(d) {
        return yScale(+d.WinsNoms);
    })
    .crossFilter(function(d) {
        return d.IsGoodRating == 1;
    })
    .crossTransform(function(d) {
        return (
            'translate(' + xScale(d.imdbRating) + ',' + yScale(d.WinsNoms) + ')'
        );
    })
    .crossStroke(function(d) {
        return d.IsGoodRating == 0 ? 'red' : 'blue';
    })
    .chartTitle('Wins+Nominations vs. IMDb Rating')
    .xAxisLabel('IMDb Rating')
    .yAxisLabel('Wins+Nominations (log-scaled)');

var Chart5 = ScatterPlot()
    .xDomainCallBack(function(d) {
        return +d.imdbRating;
    })
    .yDomainCallBack(function(d) {
        return +d.WinsNoms === 0 ? 0 : Math.log(+d.WinsNoms);
    })
    .circleFilter(function(d) {
        return d.IsGoodRating == 0;
    })
    .circleCx(function(d) {
        return xScale(d.imdbRating);
    })
    .circleStroke(function(d) {
        return d.IsGoodRating == 0 ? 'red' : 'blue';
    })
    .circleCy(function(d) {
        return +d.WinsNoms === 0 ? 0 : yScale(Math.log(+d.WinsNoms));
    })
    .crossFilter(function(d) {
        return +d.IsGoodRating == 1;
    })
    .crossTransform(function(d) {
        return d.WinsNoms == 0
            ? 'translate(' + xScale(+d.imdbRating) + ',' + 0 + ')'
            : 'translate(' +
                  xScale(+d.imdbRating) +
                  ',' +
                  yScale(Math.log(+d.WinsNoms)) +
                  ')';
    })
    .crossStroke(function(d) {
        return d.IsGoodRating == 0 ? 'red' : 'blue';
    })
    .chartTitle('Wins+Nominations (log-scaled) vs. IMDb Rating')
    .xAxisLabel('IMDb Rating')
    .yAxisLabel('Wins+Nominations (log-scaled)');

d3.csv('movies.csv', function(data) {
    d3.select('#area1')
        .datum(data)
        .call(Chart1);
    d3.select('#area5')
        .datum(data)
        .call(Chart5);
});
