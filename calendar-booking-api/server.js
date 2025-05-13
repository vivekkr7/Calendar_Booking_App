const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // <-- add this

const bookingsRoutes = require('./routes/bookings');

const app = express();
const PORT = 3000;
app.use(cors()); // <-- allow requests from Flutter web

app.use(bodyParser.json());
app.use('/bookings', bookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
