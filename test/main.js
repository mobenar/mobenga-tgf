/*global describe, before, it */

var fs = require('fs');
var expect = require('chai').expect;

var TGF = require('../index');

describe('TGF', function () {

	var tgf;

	before(function () {

		tgf = fs.readFileSync('test/graph.tgf', 'utf8').replace(/\r\n/g, '\n');
	});

	it('should parse', function () {

		var parsed = TGF.parse(tgf);
		var nodeIds = parsed.nodes.map(function (node) { return node.id; });
		var edges = parsed.edges;

		expect(nodeIds).to.have.members([1, 2, 3, 4, 5, 6, 7]);
		expect(edges.length).to.equal(6);
	});

	it('should stringify', function () {

		var string = TGF.stringify({
			nodes: [
				{ id: 1, label: 'A' },
				{ id: 2, label: 'B' },
				{ id: 3, label: 'C' },
				{ id: 4, label: 'D' },
				{ id: 5, label: 'E' },
				{ id: 6, label: 'F' },
				{ id: 7, label: 'G' }
			],
			edges: [
				{ source: 1, target: 2 },
				{ source: 1, target: 3 },
				{ source: 2, target: 4 },
				{ source: 2, target: 5 },
				{ source: 3, target: 6 },
				{ source: 3, target: 7 }
			]
		});

		expect(string).to.equal(tgf);
	});

});
