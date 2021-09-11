const customExpress = require('./config/customExpress')
const connection = require('./infrastructure/connection')

connection.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('Successfully connected to the database!')
    const app = customExpress()
    app.listen(3000,
        () => console.log('Server is running on port 3000.'))
})