const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://yihyhfdhnoigcnphnxgd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaHloZmRobm9pZ2NucGhueGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyODA0MjMsImV4cCI6MjA0OTg1NjQyM30.xI5RPbD7wxIhkLtqemH7TEjNcGb6NqHfFe5qeQIp_C4'
const supabase = supabaseClient.createClient(supabaseUrl,supabaseKey)
// API CREATION

app.get('/jokes', async (req,res) =>{
    console.log('attempting to get all jokes')

    const {data,error} = await supabase
        .from('jokes')
        .select()

    if(error) {
        console.log('Error:', error)
        res.send(error)
    } else {
        console.log('Successfully retrieved data')
        res.send(data)
    }
    
})

app.post('/joke', async (req,res) => {
    console.log("attempting to add a joke")

    console.log('Request:', req.body)


    const category = req.body.category;
    const joke = req.body.joke;


    const {data,error} = await supabase.from('jokes')
    .insert({'category': category,
             'joke': joke,
            })
            .select();


    if(error) {
        console.log('Error:', error)
        res.send(error)
    } else {
        console.log('Successfully retrieved data')
        res.send(data)
    }
});


app.listen(port, () => {
    console.log('App is Aliveeee')
})