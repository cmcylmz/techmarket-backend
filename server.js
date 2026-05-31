const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY;

app.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  console.log('Approve request:', paymentId);
  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    console.log('Approve success:', response.data);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Approve error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  console.log('Complete request:', paymentId, txid);
  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    console.log('Complete success:', response.data);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Complete error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.get('/', (req, res) => res.send('TechMarket Backend Çalışıyor!'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
