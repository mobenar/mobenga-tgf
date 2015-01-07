function errorMessage(lineNumber, line) {

	var message = 'TGF parse error';

	if (lineNumber) {
		message += ', line ' + lineNumber;
	}

	if (line) {
		message += ': ' + line;
	}

	return message;
}

exports.parse = function (string) {

	var nodes = [];
	var edges = [];
	var parts = string.split(/\r?\n#\r?\n/);
	var lineBreak = /\r?\n/;
	var lineNumber = 1;

	if (parts.length !== 2) {
		throw new SyntaxError(errorMessage());
	}

	parts[0].split(lineBreak).forEach(function (line) {

		var matches = line.match(/^(\d+) (.+)$/);

		if (!matches) {
			throw new SyntaxError(errorMessage(lineNumber, line));
		}

		nodes.push({
			id: parseInt(matches[1], 10),
			label: matches[2]
		});

		lineNumber++;
	});

	lineNumber++;

	parts[1].split(lineBreak).forEach(function (line) {

		var matches = line.match(/^(\d+) (\d+)$/);

		if (!matches) {
			throw new SyntaxError(errorMessage(lineNumber, line));
		}

		edges.push({
			source: parseInt(matches[1], 10),
			target: parseInt(matches[2], 10)
		});

		lineNumber++;
	});

	return {
		nodes: nodes,
		edges: edges
	};
};

exports.stringify = function (object) {

	if (typeof object.toJSON === 'function') {
		object = object.toJSON();
	}

	var nodes = object.nodes || [];
	var edges = object.edges || [];
	var lines = [];

	nodes.forEach(function (node) {

		lines.push('' + node.id + ' ' + node.label);
	});

	lines.push('#');

	edges.forEach(function (edge) {

		lines.push('' + edge.source + ' ' + edge.target);
	});

	return lines.join('\n');
};
