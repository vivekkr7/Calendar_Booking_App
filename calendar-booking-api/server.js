const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bookingsRoutes = require('./routes/bookings');

const app = express();
const PORT = 3000;
app.use(cors());

app.use(bodyParser.json());
app.use('/bookings', bookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
