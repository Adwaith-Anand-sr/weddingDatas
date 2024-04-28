var express = require('express');
var router = express.Router();


const dataModel = require("./collection");


router.get('/add', function(req, res, next) {
    res.render('index', {data: req.flash("data")});
});

router.get('/', async function(req, res, next) {
  let datas = await dataModel.find()
  res.render('lists', {datas});
});

router.post("/add", async function(req, res){
    try {
        const newData = await dataModel.create({
            name: req.body.name,
            address: req.body.address,
            amount: req.body.amount
        });
        req.flash("data",{newData})
        res.redirect("/add"); 
    } catch (error) {
        console.error("Error adding data:", error);
    }
});


// router.post('/search', async (req, res) => {
//     console.log("searching");
//     const { query, sort } = req.body;
//     console.log("query", query);
//     console.log("sort", sort);
//     let filter = {};
//     if (query !== 'all') {
//         const searchTerms = query.split(/\s+/).filter(term => term.trim() !== ''); // Split search query into terms
//         const nameFilter = searchTerms.map(term => ({ name: { $regex: new RegExp(term, 'i') } }));
//         filter.$or = nameFilter; // Match any of the search terms in the user's name
//     }

//     try {
//         const users = await dataModel.find(filter).sort({ [sort]: 1 }); // Sort by the specified field
//         console.log("results", users);
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


router.post('/search', async (req, res) => {
    console.log("searching");
    const { query, sort } = req.body;
    console.log("query", query);
    console.log("sort", sort);
    let filter = {};

    if (query !== 'all') {
        const searchTerms = query.split(/\s+/).filter(term => term.trim() !== ''); // Split search query into terms

        if (sort === 'name') {
            // Search among name field
            const nameFilter = searchTerms.map(term => ({ name: { $regex: new RegExp(term, 'i') } }));
            filter.$or = nameFilter; // Match any of the search terms in the user's name
        } else if (sort === 'address') {
            // Search among address field
            const addressFilter = searchTerms.map(term => ({ address: { $regex: new RegExp(term, 'i') } }));
            filter.$or = addressFilter; // Match any of the search terms in the address
        }
    }

    try {
        const users = await dataModel.find(filter).sort({ [sort]: 1 }); // Sort by the specified field
        console.log("results", users);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;