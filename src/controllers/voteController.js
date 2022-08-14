import asyncHandler from 'express-async-handler'
import { SUCCESS, FAILED, DATA_UPDATED, DATA_INSERTED  } from '../config/constants.js'
import Vote from '../models/voteModel.js'

// @desc    Update people vote
// @route   POST /api/vote/{id}?voter_id={voter_id}
// @access  Private
const votePeople = asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = req.query

    try {

        // jika voter_id tidak ada, maka error
        if(!data.voter_id) throw new Error("voter_id is required")
        // jika id = voter_id, maka error
        if(id == data.voter_id) throw new Error("Kamu tidak bisa vote milik sendiri")

        // cek apakah sudah ada
        const votes = await Vote.findAll({where: {people_id: id, voter_id: data.voter_id }})
        // jika sudah ada, maka error
        if(votes.length > 0) throw new Error("Kamu sudah pernah vote")

        // tambahkan vote
        await Vote.create({people_id: id, voter_id: data.voter_id})
        // hitung votes
        const votesCount = await Vote.count({where: {people_id: id}}) 
        
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_INSERTED,
            data: {
                id,
                vote: votesCount
            },
        })
    } catch(err) {
        // hitung votes
        const votesCount = await Vote.count({where: {people_id: id}})
        res.status(400)
        res.json({
            status: FAILED,
            message: "" + err,
            data: {
                id,
                vote: votesCount
            },
        })
    }
})

// @desc    Update people vote
// @route   GET /api/vote/{id}?voter_id={voter_id}
// @access  Private
const checkVoteable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const data = req.query
        let vote = true

        // jika voter_id tidak ada, maka false
        if(!data.voter_id) vote = false
        // jika id = voter_id, maka false
        if(id == data.voter_id) vote = false

        // cek apakah sudah ada
        const votes = await Vote.findAll({where: {people_id: id, voter_id: data.voter_id }})
        // jika sudah ada, maka false
        if(votes.length > 0) vote = false
        
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_INSERTED,
            data: {
                id,
                vote,
            },
        })
    } catch(err) {
        res.status(400)
        res.json({
            status: FAILED,
            message: "" + err,
            data: null,
        })
    }
})

export {
    votePeople,
    checkVoteable,
}