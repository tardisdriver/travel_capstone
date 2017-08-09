exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://travel-user:Travel1290@ds151289.mlab.com:51289/travel-buddy' ||
    'mongodb://localhost/tripsData';

exports.TEST_DATABASE_URL = 'mongodb://localhost/tripsTest';


exports.PORT = process.env.PORT || 8080;