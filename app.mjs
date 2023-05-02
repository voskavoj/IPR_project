// Imports
import express from 'express'
import { engine } from 'express-handlebars'

// Server setup
const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';

app.use(express.static('page')) // static content folder
app.use(router);

// Template setup
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');


// Routes
// router.route('/api/tasks').get(listAllTasks);
// router.route('/').get(listAllTasksRender);
// router.route('/toggle').get(toggleTask);
// router.route('/delete').get(deleteTask);
// router.route('/add').get(addTask);

// Server start
const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

