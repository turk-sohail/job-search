require('express-async-errors');
const express = require('express');
const app = express();
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const {configService} = require("./utils");

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/jobs",jobsRouter)



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = configService.PORT || 3000;

const start = async () => {
  try {
    await connectDB(configService.MONGO_URI)
    console.log("db is running");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
