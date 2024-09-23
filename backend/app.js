const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/spsgame');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://gokulgokulkannan770:gokul8502@cluster0.96kbn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
