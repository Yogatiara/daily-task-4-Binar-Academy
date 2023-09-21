const express = require('express');
const app = express();
const port = process.env.port || 3000;
const TourRoute = require('./routes/TourRoute');
const UserRoute = require('./routes/UserRoute')

app.use(express.json());
app.use('/api/v1/tours', TourRoute);
app.use('/api/v1/users', UserRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});