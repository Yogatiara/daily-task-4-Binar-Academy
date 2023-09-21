const express = require('express');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const usersData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));


module.exports = {
  getAllUsers: (req, res) => {
    res.status(200).json({
      status: 'succes',
      mesage: 'user data is successfully displayed',
      data: {
        usersData
      }
    })
  },

  getTourById: (req, res) => {
    const id = req.params.id_user;

    const user = usersData.find(el => el._id === id);

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: `data with ${id} this not found`
      })
    }

    res.status(200).json({
      status: 'succes',
      data: {
        user
      }
    })
  },

  editUserData: (req, res) => {
    const id = req.params.id_user;
    const userIndex = usersData.findIndex(el => el._id === id);


    if (userIndex === -1) {
      return res.status(404).json({
        status: 'failed',
        message: `data with ${id} this not found`
      })
    }

    usersData[userIndex] = { ...usersData[userIndex], ...req.body }

    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(usersData), err => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "Internal Server Error: Unable to read file"
        })
      } else {
        res.status(201).json({
          status: "succes",
          message: `user data with id : ${id} is edited`,
          data: {
            user: usersData[userIndex]
          }
        })
      }
    })
  },

  removeUserData: (req, res) => {
    const id = req.params.id_user;
    const userIndex = usersData.findIndex(el => el._id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        status: 'failed',
        message: 'data not found'
      })
    }

    usersData.splice(userIndex, 1);

    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(usersData), err => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "Internal Server Error: Unable to read file"
        })
      } else {
        res.status(200).json({
          status: "succes",
          message: `user data with id : ${id} is deleted`,
          data: null
        })
      }
    })
  },

  createUser: (req, res) => {
    const newId = uuid;
    const newData = Object.assign({ id: newId }, req.body);

    usersData.push(newData);

    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(usersData), err => {

      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "Internal Server Error: Unable to read file"
        })
      } else {
        res.status(201).json({
          status: "succes",
          message: "Insert data is successful",
          data: {
            user: newData
          }
        })
      }
    })

  }
}