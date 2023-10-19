const { User } = require('../models/User');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { isAuth } = require('../helpers/auth');
const { Recipe } = require('../models/Recipe');
const https = require('https');

router.get(`/`, async (req, res) => {

    // axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a&f=b&f=c')
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
        .then((result) => {
            const numberOfMeals = result.data.meals.length;
            return res.status(200).json({
                message: 'Meals Found',
                data: result.data,
                itemsCount: numberOfMeals
            });

        }).catch((err) => {
            return res.status(400).json({
                message: `Error: ` + err.message,
                data: '',
            });

        });

});


router.get(`/categories`, async (req, res) => {

    // axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a&f=b&f=c')
    console.log('cat')
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then((result) => {
            console.log('result', result);
            const numberOfCategories = result.data.categories.length;
            return res.status(200).json({
                message: 'Categories Found',
                data: result.data,
                itemsCount: numberOfCategories
            });

        }).catch((err) => {
            return res.status(400).json({
                message: `Error: ` + err.message,
                data: '',
            });

        });

});


router.get(`/meals`, async (req, res) => {
    // let params = req.query;

    // if (params.query || typeof params.query === 'string') {
    //     let query = JSON.parse(params.query);
    //     searchParams.query = { $text: { $search: query['c'], $language: 'en' } };
    // }
    // let searchParams = {
    //     query: {},
    //     skip: null,
    // };

    let category = req.query.c;

    console.log(category)
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=` + category)
        .then((result) => {
            const numberOfMeals = result.data.meals.length;
            return res.status(200).json({
                message: 'Meals Found',
                data: result.data,
                itemsCount: numberOfMeals
            });

        }).catch((err) => {
            return res.status(400).json({
                message: `Error: ` + err.message,
                data: '',
            });

        });

});


// router.get(`/`, async (req, res) => {
//     res.status(200).json({ message: 'recipe router!' });

// });


//need to send userID and recipeId query params userId is optional to send
router.post(`/addToFavorites`, isAuth, async (req, res) => {
    let userId2 = req.user.id;
    let recipeId2 = req.query.recipeId
    console.log('user id -------------', userId2);
    console.log('add to fa v body -------------', req.body);
    console.log('add to fa recipeId2 -------------', recipeId2);

    let recipeId = req.query.recipeId;
    let userId = req.query.userId;
    //let userId=req.user.id;
    //let userId = '652a3528784f92e2b6ea47bd';

    console.log(userId)
    console.log(recipeId)

    User.findById(userId2).then((user) => {
        console.log('user', user)

        let receipesIds = user.favoriteReceipes.map((r) => r.toString());
        if (receipesIds.indexOf(recipeId2) !== -1) {
            return res.status(400).json({
                message: 'You already have this Meal in your favorites list'
            });
        }


        user.favoriteReceipes.push(recipeId2);
        user.save();

        return res.status(200).json({
            message: 'Successfully added the Meal to your favorites list.'
        });
    }).catch((err) => {
        return res.status(400).json({
            message: 'Something went wrong!!! cannot find user.'
        });
    })

});

//need to send data with the body, recipe data with the body --userId with query params(optional)
router.post(`/addToFavoritesSave`, isAuth, async (req, res) => {
    let recipeId = req.body.idMeal;
    //let userId = req.query.userId;
    //let userId=req.user.id;
    let userId = '652a3528784f92e2b6ea47bd';
    let recipe = req.body;
    console.log('recipe', req.body);
    console.log('req user id', req.user.id);

    const recipeExists = await Recipe.findOne({ idMeal: req.body.idMeal })

    if (recipeExists) {
        User.findById(userId).then((user) => {
            console.log('user recipeExists', user);
            let receipesIds = user.favoriteReceipes.map((r) => r.toString());
            if (receipesIds.indexOf(recipeId) !== -1) {
                return res.status(400).json({
                    message: 'You already have this Meal in your favorites list'
                });
            }

            user.favoriteReceipes.push(recipeId);
            user.save();

            return res.status(200).json({
                message: 'Successfully added the Meal to your favorites list.'
            });
        }).catch((err) => {

            res.status(400).send({
                message: 'Something went wrong. Cannot find User!',
                data: err.message,
            });
        });

    } else {
        Recipe.create(recipe).then(async (newRecipe) => {

            User.findById(userId).then((user) => {
                console.log('user else recipeExists', user);

                let receipesIds = user.favoriteReceipes.map((r) => r.toString());
                if (receipesIds.indexOf(recipeId) !== -1) {
                    return res.status(400).json({
                        message: 'You already have this Meal in your favorites list'
                    });
                }

                user.favoriteReceipes.push(recipeId);
                user.save();

                return res.status(200).json({
                    message: 'Successfully added the Meal to your favorites list.'
                });
            }).catch((err) => {
                return res.status(400).json({
                    message: 'Something went wrong, Cannot find User.'
                });
            });

        }).catch((err) => {
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    }


});

router.get(`/favoriteRecipes`, async (req, res) => {
    //let userId = req.user.id;
    let userId = req.query.userId;
    console.log(userId)
    User.findById(userId).then((user) => {
        //console.log(user?.favoriteReceipes)

        if (user?.favoriteReceipes!=null) {
            console.log(user.favoriteReceipes)
            let receipesIds = user.favoriteReceipes.map((b) => b.toString());

            return res.status(200).json({
                message: 'Favourite recipes',
                data: receipesIds
            });
        }else{
            console.log('no fav recipes')
            //let receipesIds = user.favoriteReceipes.map((b) => b.toString());

            return res.status(400).json({
                message: 'No favourite Recipes',
                data: ''
            });
        }

    });

});

router.get(`/favoriteRecipesCount`, isAuth, async (req, res) => {
    //let userId = req.user.id;
    let userId = req.query.userId;
    console.log(userId)
    User.findById(userId).then((user) => {

        let receipesIds = user.favoriteReceipes.map((b) => b.toString());

        return res.status(200).json({
            message: '',
            data: receipesIds.length
        });
    });

});

module.exports = router;