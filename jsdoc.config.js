'use strict'

const path = require('path')

module.exports = {
	source: {
		include: [path.join(__dirname, 'src/hooks'), path.join(__dirname, 'src/js')],
	},

	plugins: ['plugins/markdown'],

	opts: {
		destination: path.join(__dirname, 'jsdocs'),
		recurse: true,
		template: path.join(__dirname, 'node_modules/docdash'),
	},
}
