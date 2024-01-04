const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/photos", express.static('photos'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '',
    password: '',
});

connection.connect((err) => {
    if (err) {
        console.log('error in db connection' + JSON.stringify(err, undefined, 2));
    } else {
        console.log('db is connected successfully');
    }
});

app.get('/', (req, res) => {
    res.render('index1.ejs');
});

app.get('/profile', (req, res) => {
    // Assuming you have a user email stored in the session after login
    const userEmail = req.session.userEmail; // Adjust this based on your authentication method

    if (!userEmail) {
        // Redirect to login page if user is not authenticated
        return res.redirect('/login1');
    }

    // Fetch user data from the REGISTER table based on email
    const sql = 'SELECT * FROM REGISTER WHERE EMAIL = ?';

    connection.query(sql, [userEmail], (err, user) => {
        if (err) {
            console.log('Error fetching user data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Render the profile view and pass user data to it
            res.render('profile.ejs', { user: user[0] });
        }
    });
});



app.get('/login1', (req, res) => {
    res.render('login1.ejs');
});
app.post('/login1', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM REGISTER WHERE EMAIL = ?';

    connection.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log('Error in login:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                console.log('Login successful');
                res.redirect('/');
            } else {
                console.log('Invalid credentials');
                res.status(401).send('Invalid credentials');
            }
        }
    });
});


app.get('/register1', (req, res) => {
    res.render('register1.ejs');
});

app.post('/register1', (req, res) => {
    const { name, number, email, password } = req.body;
    const sql = 'INSERT INTO REGISTER (name, number, email, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, number, email, password], (err, result) => {
        if (err) {
            console.log('Error in registration:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Registration successful');
            res.render('profile.ejs',{name,number,email});
        }
    });
});

app.get('/book_train1', (req, res) => {
    res.render('book_train1.ejs');
});

app.post('/book_train_result1', (req, res) => {
    const { from, to, date } = req.body;

    const query = `
        SELECT *
        FROM BOOKTRAINS1 AS bt
        JOIN SEATS1 AS s ON bt.TRAINNAME = s.TRAINNAME
        WHERE bt.SOURCESTATION = ? AND bt.DESTINATIONSTATION = ?;
    `;

    connection.query(query, [from, to], (err, results) => {
        if (err) {
            console.error('Error fetching train details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('book_train_result1.ejs', { trainResults: results, from, to, date });
        }
    });
});

app.get('/add_details_entry', (req, res) => {
    res.render('add_details_entry.ejs');
});

app.get('/add_details_entry_data', (req, res) => {
    res.render('add_details_entry_data.ejs');
});

app.post('/add_details_entry', (req, res) => {
    const { name, age, gender, nationality,berth,coach,security1} = req.body;

    const sql = 'INSERT INTO PASSENGERS (name, age, gender, nationality,berth,coach,security1) VALUES (?, ?, ?, ?,?,?,?)';

    connection.query(sql, [name, age, gender, nationality,berth,coach,security1], (err, result) => {
        if (err) {
            console.error('Error inserting passenger details into the database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Passenger details inserted successfully');
            res.redirect('/add_details_entry_data'); 
        }
    });
});

app.get('/ticket_preview',(req, res) => {
    res.render('ticket_preview.ejs');
});

app.post('/ticket_preview', (req, res) => {
    const { security1, from, to } = req.body;

    const passengerQuery = 'SELECT * FROM PASSENGERS WHERE SECURITY1 = ?';
    connection.query(passengerQuery, [security1], (errPassenger, passengerResults) => {
        if (errPassenger) {
            console.error('Error fetching passenger details:', errPassenger);
            res.status(500).send('Internal Server Error');
        } else {
            const trainQuery = `
                SELECT *
                FROM BOOKTRAINS
                WHERE SOURCESTATION = ? AND DESTINATIONSTATION = ?;
            `;
            connection.query(trainQuery, [from, to], (errTrain, trainResults) => {
                if (errTrain) {
                    console.error('Error fetching train details:', errTrain);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('Passenger details:', passengerResults);
                    console.log('Train details:', trainResults);
                    res.render('ticket_preview.ejs', { passengerDetails: passengerResults, trainDetails: trainResults });
                    const passengerDetails = {
                        name: passengerResults[0].Name,
                        from: passengerResults[0].From,
                        to: passengerResults[0].To,
                    };
                    
                    const trainDetails = {
                        train: trainResults[0].TrainName,
                        platform: trainResults[0].Platform,
                        seat: trainResults[0].Seat,
                        departure: trainResults[0].Departure,
                        arrival: trainResults[0].Arrival,
                    };

                    res.render('ticket.ejs', { passengerDetails, trainDetails });
                
                }
            });
        }
    });
});

app.get('/new',(req, res) => {
    res.render('new.ejs');
});

app.get('/confirm_pay',(req, res) => {
    res.render('confirm_pay.ejs');
});

app.get('/new_pnr_status', (req, res) => {
    res.render('new_pnr_status.ejs');
});

app.post('/new_pnr_status_result', (req, res) => {
    const pnrNo123 = req.body.pnrNo;

    console.log('Received PNR from form:', pnrNo123);

    const query = `
        SELECT * FROM PNRCHECK1 WHERE PNR = ?;
    `;

    console.log('Executing query:', query);

    connection.query(query, [pnrNo123], (err, results) => {
        if (err) {
            console.error('Error fetching PNR details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Query results:', results);

            if (results.length > 0) {
                res.render('new_pnr_status_result.ejs', { results: results });
            } else {
                res.render('new_pnr_status_result.ejs', { results: null });
            }
        }
    });
});

app.get('/run_status1', (req, res) => {
    res.render('run_status1.ejs');
});

app.post('/run_status_result1', (req, res) => {
    const trainNumber = req.body.no; 

    const query = `
        SELECT * FROM RUNSTATUS WHERE TRAINNUMBER = ?;
    `;

    connection.query(query, [trainNumber], (err, results) => {
        if (err) {
            console.error('Error fetching run status details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Query results:', results);

            if (results.length > 0) {
                res.render('run_status_result1.ejs', { results: results });
            } else {
                res.render('run_status_result1.ejs', { results: null });
            }
        }
    });
});

app.get('/train_details1', (req, res) => {
    res.render('train_details1.ejs');
});

app.post('/train_details_result1', (req, res) => {
    const trainInput = req.body.no; 

    const query = `
        SELECT * FROM TRAININFO WHERE TRAINNAME = ? OR TRAINNUMBER = ?;
    `;

    connection.query(query, [trainInput, trainInput], (err, results) => {
        if (err) {
            console.error('Error fetching train details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Query results:', results);

            if (results.length > 0) {
                res.render('train_details_result1.ejs', { trainResults: results });
            } else {
                res.render('train_details_result1.ejs', { trainResults: null });
            }
        }
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
