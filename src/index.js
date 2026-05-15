const express = require('express');

const { ServerConfig, Logger } = require('./config');

const apiRoutes = require('./routes')

const app = express();

app.use('/api', apiRoutes);

const { AboutController, HomeController, InfoController } = require('./controllers')

app.listen(ServerConfig.PORT, () => {
    console.log(`server start successfully at: ${ServerConfig.PORT}`);
});

