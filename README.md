# Bootcamp Rocketseat Docker
VSCode running inside a docker container + Nodejs

# Instructions
### To run this project, you will need the docker and docker-compose preinstalled on your machine.


## 1- Clone the repository
git clone https://github.com/marcelloti/bootcamp-rocketseat-docker.git

## 2- Allow GUI applications
xhost +

## 3- Create and run docker-compose
cd bootcamp-rocketseat-docker && docker-compose build && docker-compose up -d

## After the first execution of VSCode

To open VSCode a second time, run the command:

xhost + && docker container restart vscode
