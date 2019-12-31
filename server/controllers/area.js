let router = require('express').Router();
let api = require('../api/area'); 

router.post('/create', (req, res)=>{

    api.createArea (req.body,(err, area)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(area);
        }

    });

})

router.post('/toggleState', (req, res)=>{

    api.toggleArea (req.body,(err, product)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(product);
        }

    });

})


module.exports = router;