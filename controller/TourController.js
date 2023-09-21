const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

module.exports = {
  getAllTours: (req, res) => {
    res.status(200).json({
      status: 'succes',
      message: 'Tours data exist',
      data: {
        tours
      }
    })
  },

  getTourById: (req, res) => {
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);
    console.log(tour);

    if (!tour) {
      return res.status(404).json({
        status: 'failed',
        message: `data with ${id} this not found`
      })
    }

    res.status(200).json({
      status: 'succes',
      data: {
        tour
      }
    })
  },

  editTour: (req, res) => {
    const id = req.params.id * 1;
    const tourIndex = tours.findIndex(el => el.id === id);


    if (tourIndex === -1) {
      return res.status(404).json({
        status: 'failed',
        message: `data with ${id} this not found`
      })
    }

    tours[tourIndex] = { ...tours[tourIndex], ...req.body }

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
      res.status(200).json({
        status: 'success',
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex]
        }
      })
    })
  },

  removeTour: (req, res) => {
    const id = req.params.id * 1;
    const tourIndex = tours.findIndex(el => el.id === id);

    if (tourIndex === -1) {
      return res.status(404).json({
        status: 'failed',
        message: 'data not found'
      })
    }

    tours.splice(tourIndex, 1);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
      res.status(200).json({
        status: 'success',
        message: `tour with this id ${id} deleted`,
        data: null
      })
    })
  },

  createTour: (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newData = Object.assign({ id: newId }, req.body);

    tours.push(newData);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
      // 201 = created
      res.status(201).json({
        status: 'succes',
        data: {
          tour: newData
        }
      })
    })

  }
}