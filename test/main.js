var fs = require('fs');
var expect = require('chai').expect;

var TGF = require('../index');

describe('TGF', function () {

	it('should parse', function () {

		var tgf = TGF.parse(fs.readFileSync('test/graph.tgf', 'utf8'));

		var nodeIds = tgf.nodes.map(function (node) { return node.id; });
		var edges = tgf.edges;

		expect(nodeIds).to.have.members([1, 2, 3, 4, 5, 6, 7]);
		expect(edges.length).to.equal(6);
	});

});
