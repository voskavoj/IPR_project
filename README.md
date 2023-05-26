# IPR_project
This is a school project for ECE dpt. at University of Patras, Greece.

The authors are Vojtech V. and Ioanna G.

This project presents a custom designed website for a chain of gas stations, which serves the chain's customers and employees (managers) and promotes the chain's products through customer programs.

## Usage
To start the server, launch `app.mjs`. The server will listen on <http://127.0.0.1:3001>.

## Code structure

	|   app.mjs                main application
	|   package-lock.json      
	|   package.json           
	|   README.md              
	|                          
	+---page                   public content
	|   +---img                   images
	|   +---script                local JavaScript
	|   \---style                 CSS
	+---server                 server files
	|   <files>                   .mjs files of the server
	|   \---database              database access code, DB file
	\---views                  handlebars templates
		\---layouts            

