const { json } = require("express")
const express = require("express")
const router = express.Router()
const character = ("db.json")

router.get("/characters", async (req, res, next)=>{
    try {
        const allCharacaters = await character.find()
    res.json(allCharacaters)
    } catch (error) {
        console.log(error)
    }
})

router.get("/characters/:id", async (req, res, next)=>{
    try {
        const oneCharacter = await character.findById(req.params.id)
        res.json(oneCharacter)
    } catch (error) {
        console.log(error)
    }
})

router.post("/characters", async (req, res, next)=>{
    const { name, occupation, cartoon, weapon } = json
    try {
        const newCharacter = await character.create({ name, occupation, cartoon, weapon })
        res.json(newCharacter)
    } catch (error) {
        console.log(error)
    }
})

router.patch("/characters/:id", async (req, res, next)=>{
    try {
        const editedCharacter = await character.findByIdAndUpdate(req.params.id)
        console.log("on the route", editedCharacter)
        res.json(editedCharacter)
    } catch (error) {
        console.log(error)
    }
})