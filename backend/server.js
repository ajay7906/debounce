const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Load students data
const loadStudents = async () => {
  const data = await fs.readFile(path.join(__dirname, 'data/student.json'), 'utf8');
  return JSON.parse(data);
};

app.get('/api/students/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 3) {
      return res.json([]);
    }

    const students = await loadStudents();
    const searchResults = students
      .filter(student => 
        student.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 results

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});