# Projet Prog Web

## Must have...
- [x] String object
- [x] Functions
- [x] Conditional Statements
- [ ] Loops
  - [x] While
  - [ ] For ... in ...
  - [x] For ... of ...
- [x] Arrays
- [x] JavaSript validation
- [ ] Prototype and user-defined objects >> CLASS
- [x] DOM manipulation
  - [x] Addition of HTML elements
  - [x] Removal of HTML elements
  - [x] Update of HTML elements
- [x] Online hosting

## How to contribute ?

- Start by making a fork of my repo
```terminal
git clone https://github.com/Shinyhero36/ProjetProgWeb
```
- Clone the repo to your local machine
```terminal
git clone https://github.com/<yourusername>/ProjetProgWeb
```
- Add a new remote to update your code when mine is updated
```terminal
git remote add upstream https://github.com/Shinyhero36/ProjetProgWeb
```
- Open the project in your favourite IDE and start coding !!


### ⚠️ Workflow ⚠️
- Start by creating a new branch from master and give a name to you branch, for instance `tic-tact-toe`.
```terminal
git checkout -b tic-tact-toe
```
- Inside the project tree, create a new directory with your game name i.e. `tic-toc-toe` and put everything related to your game in your directory
```terminal
mkdir tic-tact-toe
```


### Github Course 101
When you're done implementing your game open your terminal and do as follows:
- Add your uncommited files
```terminal
git add file1 file2 ... filen
```

- Commit these/those file(s) and add a message
```terminal
git commit -m "My explicit message"
```

- Push your code to your repo **to the correct branch**
```terminal
git push origin yourbranchname
```

### Github Course 102

Now it's time to "pull request" your game, to do so, clic on `contribute` and follow the directives on the screen.

When your PR aka Pull Request has been approuved you can update your code
```terminal
git checkout master
git pull upstream
```
