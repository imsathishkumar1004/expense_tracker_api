const express = require('express')
const {default: mongoose} = require('mongoose')
const app =  express()
const port = process.env.PORT || 8000
const Expense = require('./Models/expense')
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://Sathish:Sathish1004@cluster0.rjmohol.mongodb.net/Expense?retryWrites=true&w=majority',{
    useUnifiedTopology: true
})
app.use(express.json())

app.get('/expense', async(req,res)=>{
    const expenses=await Expense.find()
    res.send(expenses) //In server get() only one response and get() only one...
})

// app.post('/expense', (req,res)=>{
//     console.log(req.bodyParser)
//     res.send("<h1>Hi Nothing....</h1>") //In server get() only one response and get() only one...

// })
app.listen(port, () =>{
    console.log(`Server is running on ${port}`)
})


//API id to select particular id data    ---I

app.get('/expense/:id', async(req,res)=>{
    try{
        const id = req.params.id;
     const result = await Expense.findById(id);
    if(result){
        res.send(result)
    }
    else{
        res.send("No data Found!!🫥")
    } 
    }
    catch(err){
        res.send(err)
    }
    
})



//API id to select and delete particular id data   --II

app.delete('/expense/:id', async(req,res)=>{
    try{
        const id = req.params.id;
     const result = await Expense.findByIdAndDelete(id);
    if(result){
        res.send(result)
    }
    else{
        res.send("No data Found!!🫥")
    } 
    }
    catch(err){
        res.send(err)
    }
    
})



//API id to select and update particular id data   --III

app.put('/expense/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body
    try {
        const updateObj = await Expense.findByIdAndUpdate(id,{$set: update},{ new: true });
        if (result) {
            res.send(updateObj);
        } else {
            res.send("No data found!!🫥");
        }
    } catch (err) {
        res.send(err);
    }
});



//create a data in schema

app.post('/expense', async(req,res)=>{
    console.log(req.body)
    const newExpense = req.body
    await Expense.create(newExpense)
    res.send("Created") //In server get() only one response and get() only one...

})
