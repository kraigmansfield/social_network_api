const {connect,connection} = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network_db';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

modules.export = connection;