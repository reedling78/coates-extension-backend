const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DigitalWhiteboardSchema = new Schema({
	project: {
		type: 'String'
	},
	client: {
		type: 'String'
	},
	priority: {
		type: 'Number'
	},
	golive: {
		type: 'String'
	},
	'status-dev': {
		type: 'Boolean'
	},
	'status-qa': {
		type: 'Boolean'
	},
	'status-deploy': {
		type: 'Boolean'
	},
	id: {
		type: 'Number'
	}
});

module.exports = DigitalWhiteboardModel = mongoose.model('DigitalWhiteboard', DigitalWhiteboardSchema);