const { User } = require('../models/User');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { isAuth } = require('../helpers/auth');
const { Recipe } = require('../models/Recipe');
const https = require('https');

//get meal where letter equal c
router.get(`/`, async (req, res) => {

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

//get all categories
router.get(`/categories`, async (req, res) => {

    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then((result) => {
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

//get all meals//need to send category with the query params example-meals/?c=Beef
router.get(`/meals`, async (req, res) => {
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


//get meal by id
router.get(`/meals/:idMeal`, async (req, res) => {
    const idMeal = req.params.idMeal;

    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + idMeal)
        .then((result) => {

            return res.status(200).json({
                message: 'Meals Found',
                data: result.data,

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


//need to send  recipeId as query params userId is got from auth token
//http://localhost:9000/api/v1/recipe/addToFavourites?recipeId=52874
//send authorization token in the headers as Bearer token
router.post(`/addToFavorites`, isAuth, async (req, res) => {

    let userId2 = req.user.id;
    let recipeId2 = req.query.recipeId

    console.log('userId 2 add fv ', userId2);
    console.log('recipeId 2 add fv', recipeId2);

    User.findById(userId2).then((user) => {

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

//need to send recipeId as query params userId is got from auth
// http://localhost:9000/api/v1/recipe/removeFromFavorites?recipeId=52776
//send authorization token in the headers as Bearer token
router.post(`/removeFromFavorites`, isAuth, async (req, res) => {
    let userId2 = req.user.id;
    let recipeId2 = req.query.recipeId

    console.log('userId 2 remove fv', userId2);
    console.log('recipeId remove fv', recipeId2);

    User.findById(userId2).then((user) => {
    
        let receipesIds = user.favoriteReceipes.map((r) => r.toString());
        if (receipesIds.indexOf(recipeId2) !== -1) {
            
            const index = user.favoriteReceipes.indexOf(recipeId2);

            if (index !== -1) {
                user.favoriteReceipes.splice(index, 1);
                user.save();

                return res.status(200).json({
                    message: 'Successfully removed the Meal from your favorites list.',
                });
            }else{
                return res.status(400).json({
                    message: 'Meal Not Found in favourite meals list'
    
                });
            }

        } else {
            return res.status(400).json({
                message: 'Not an favourite meal'

            });
        }

    }).catch((err) => {
        return res.status(400).json({
            message: 'Something went wrong!!! cannot find user.',
            data: err.message
        });
    })

});


router.get(`/favoriteRecipes`,isAuth, async (req, res) => {
    let userId = req.user.id;

    User.findById(userId).then((user) => {

        if (user?.favoriteReceipes != null) {
            console.log(user.favoriteReceipes)
            let receipesIds = user.favoriteReceipes.map((b) => b.toString());

            return res.status(200).json({
                message: 'Favourite recipes',
                data: receipesIds
            });
        } else {
            return res.status(400).json({
                message: 'No favourite Recipes',
                data: ''
            });
        }

    });

});

router.get(`/favoriteRecipesCount`, isAuth, async (req, res) => {
    let userId = req.user.id;

    User.findById(userId).then((user) => {

        let receipesIds = user.favoriteReceipes.map((b) => b.toString());

        return res.status(200).json({
            message: '',
            data: receipesIds.length
        });
    });

});

//need to send data with the body, recipe data with the body userid get from isAuth
router.post(`/addToFavoritesSave`, isAuth, async (req, res) => {
    let recipeId = req.body.idMeal;
    let userId = req.user.id;
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



module.exports = router;