const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EMPLOYEE = require('./models/employee.js')
const LEAVE = require('./models/leave.js')

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() =>{
    console.log('DB success')

    app.listen(8000, () =>{
        console.log('Port 8000 running')
    })

}).catch(() =>{
    console.log('Failed')
})

app.get('/', async (req, res) =>{
    try{
        res.send('Hii from port 8000 :)')
    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
})

//create employee
app.post('/create', async (req, res) =>{
    try{

        const emp = await EMPLOYEE.create(req.body)
        res.status(200).json(emp)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
})

//view attendance
app.get('/attendance', async (req, res) =>{
    try{

        const employee = await EMPLOYEE.find({}).select('name attendance')
        res.status(200).json(employee)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
})

//payroll and salaries
app.put('/pay', async (req, res) =>{
    try{

        const { id , pay} = req.body
        
        const employee = await EMPLOYEE.findOne({eid: id})
        if(!employee){
            return res.status(404).json({error: 'Employee ID not found'})
        }

        if(employee.salary != pay){
            return res.status(400).json({error: 'Invalid salary'})
        }

        if(employee.paid){
            return res.status(399).json({error: 'Employee is already paid'})
        }

        employee.paid = true
        await employee.save()

        res.status(200).json('Salary paid')

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
})

//view all employeed
app.get('/all', async (req, res) =>{
    try{

        const employee = await EMPLOYEE.find({})

        res.status(200).json(employee)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
});

//view unpaid employeed
app.get('/unpaid', async (req, res) =>{
    try{
        const employee = await EMPLOYEE.find({paid: false}).select('name salary eid')

        res.status(200).json(employee)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
});

//create leaves
app.post('/leaves', async (req, res) =>{
    try{

        const { id, lev} = req.body

        const search = await EMPLOYEE.findOne({eid: id})

        if(!search){
            return res.status(400).json({error: 'Employee ID not found'})
        }

        if(search.leaves < lev){
            return res.status(400).json({error: 'Employee does not have that many leaves'})
        }

        const emp = await LEAVE.create({ name: search.name,eid: id, takenleave: lev})

        search.leaves -= lev
        await search.save()

        res.status(200).json(emp)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
});

//get all leave list
app.get('/getleaves', async (req, res) =>{
    try{

        const employee = await LEAVE.find({})

        res.status(200).json(employee)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
})

//sort according to leaves all employees
app.get('/sortleaves', async (req, res) =>{
    try{

        const employee = await EMPLOYEE.find({}).sort({leaves : -1})

        res.status(200).json(employee)

    }catch (e){
        res.status(500).json({error: 'Internal error'})
    }
})

app.get('/find', async (req, res) => {
    try {
        const { bname } = req.query; // Use req.query to get the query parameter
        if (!bname) {
            return res.status(400).json({ error: 'Name query parameter is required' });
        }

        const employee = await EMPLOYEE.findOne({ name: bname });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (e) {
        res.status(500).json({ error: 'Internal error' });
    }
});

