
# Clients File 🗃️
### Hey There! :wave:
<p>
Are you looking for a simply API to save data of clients? Now you can do it of a pratical way!
Just follow some simply paths and a few minutes all should be working. 
</p>
 
#### STEP 1 - Install Dependences :hand:
```
# Clone this repository: 
$ git clone https://github.com/FtxDante/project1-compass.uol.git

# Go into the repository: 
$ cd project1-compass.uol

# Install dependencies: 
$ yarn install
```
#### STEP 2 - Configure the ormconfig file :warning: 
To allow you acess your database we need to setup somethings:
```json
{
	"name": "default",    			 DEFAULT (DON'T CHANGE)
	"type": "postgres",  			 DEFAULT (DON'T CHANGE)
	"host": "[YOURHOST]", 			 DEFAULT localhost
	"port": [PORT],                  DEFAULT 5432
	"username": "[YOURUSERNAME]",	 DEFAULT postgres
	"password": "[YOURPASSWORD]",    DEFAULT postgres
	"database": "[YOURDATABASE]",    DEFAULT CommonDB
}
```
In ormconfig.json, are two configurations to be defined, the first one is to production database, and the second is to test database, with you want run some test, please configure that as well.

#### STEP 3 - Running the application :running:
```
# Run migrations to your database: 
$ yarn typeorm:run

# Run the server: 
$ yarn dev
```
