# Portuguese Instructions

## AVISO
O código do projeto neste repositório está depreciado e o novo repositório deve ser acessado: https://github.com/marcelloti/bootcamp-rocketseat-DESAFIO-FINAL.

Este repositório foi mantido pois contém aplicações gráficas que foram utilizadas no projeto final e que estão rodando com o docker-compose

# Bootcamp Rocketseat Docker
VSCode em execução em um contêiner de docker + Nodejs + React e mais.

Dentro do diretório developer/code estão os projetos. É possível executar os projetos
separadamente (sem precisar utilizar docker) se necessário. Para isto, siga o README específico
de cada um desses projetos.

# Instruções
### Para executar as aplicações do docker-compose.yml, você precisará do docker e do docker-compose pré-instalados em sua máquina.


## 1- Clone o repositório
git clone https://github.com/marcelloti/bootcamp-rocketseat-docker.git

## 2- Permitir aplicativos GUI
xhost +

## 3- Crie e execute docker-compose
cd bootcamp-rocketseat-docker && docker-compose build && docker-compose up -d

## Após a primeira execução dos contêiners
Para abrir o VSCode e os outros aplicativos uma segunda vez, execute o comando:

xhost + && docker container restart node-and-vscode && docker container restart insomnia && docker container restart postbird

Não se esqueça de subir também containers que não são aplicações gráficas (como o mongodb ou postgres). Você também pode simplesmente rodar:

xhost + && docker-compose up -d

## Se você não quer baixar a última versão do vscode
Na primeira vez que o contêiner inicializar, ele irá baixar a última versão do visual studio code e o insomnia. Dependendo da velocidade da sua conexão, pode demorar um pouco para o visual studio abrir. 
Para o VSCode, se você não deseja fazer o download da versão mais recente automaticamente ou deseja instalar uma versão específica, você pode colocar o pacote do visual no caminho /bootcamp-rocketseat-docker/developer/downloads/vscode.deb e o docker instalará automaticamente o código do visual studio a partir daqui

## Para executar o contêiner do PostBird
O contêiner do PostBird não faz o download automático do pacote de instalação. Você precisa manualmente baixar e colocar o pacote em "developer/downloads/postbird.deb". Após isso, suba o contêiner e
o script de inicialização cuidará de instalar o software automaticamente.

## Insomnia
Após inicializar o contêiner do Insomnia, faça a importação do arquivo "Insomnia-Data.json". Este arquivo se encontra no diretório do desenvolvedor em /home/developer/Insomnia-Data.json

## Android SDK
Acesse o endereço https://developer.android.com/studio/#downloads e baixe o arquivo "sdk-tools-linux-VERSAO.zip" na sessão "Command line tools only". Após isso, extraia o conteúdo deste arquivo para o diretório "/bootcamp-rocketseat-docker/developer/Android/Sdk"

Para instalar as dependências para este projeto, rode o comando (manualmente):
~/Android/Sdk/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3"

Coloque seu celular em modo de depuração e rode o comando:
adb devices

Se nada aparecer, tente rodar os seguintes comandos (tanto no container quanto no host):
sudo adb kill-server
sudo adb start-server

##########################
# English instructions

## WARNING
The project code in this repository is deprecated and the new repository should be accessed: https://github.com/marcelloti/bootcamp-rocketseat-DESAFIO-FINAL.

This repository was maintained as it contains graphical applications that were used in the final project and are running docker-compose.

# Bootcamp Rocketseat Docker
VSCode running inside a docker container + Nodejs + React and more

Inside the directory developer/code are all the projects. It's possbile to run the projects
individually (without docker). To do this, follow the README instructions (inside the folder of each project).

# Instructions
### To run the applications in docker-compose.yml, you will need the docker and docker-compose preinstalled on your machine.


## 1- Clone the repository
git clone https://github.com/marcelloti/bootcamp-rocketseat-docker.git

## 2- Allow GUI applications
xhost +

## 3- Create and run docker-compose
cd bootcamp-rocketseat-docker && docker-compose build && docker-compose up -d

## After the first execution of containers
To open VSCode and the others apps a second time, run the command:

xhost + && docker container restart node-and-vscode && docker container restart insomnia && docker container restart postbird

Don't forget to also up the containers there are not graphical apps (like mongodb and postgresql). You also can just run:

xhost + && docker-compose up -d

## If you don't want to download the latest version of vscode
The first time the container boots, it will download the latest version of visual studio code and the insomnia. Depending on your connection speed, it may take a while for visual studio to open. 
For VSCode, if you do not want to download the latest version of vscode automatically or if want to install a specific version, you can place the visual package in the path /bootcamp-rocketseat-docker/developer/downloads/vscode.deb and the docker will automatically install visual studio code from here.

## To execute the PostBird container
The PostBird container do not install automatically the app. You must manually download and put the package file on "developer/downloads/postbird.deb". After that, up the container and the init script will 
take care of installattion automatically.

## Insomnia
After initialize the Insomnia container, make the import of file "Insomnia-Data.json". This file is placed inside the directory of the developer at /home/developer/Insomnia-Data.json

## Android SDK
Go to https://developer.android.com/studio/#downloads and download the file "sdk-tools-linux-VERSION.zip" in the "Command Line Tools Only" session. After that, extract the contents of this file to the "/bootcamp-rocketseat-docker/developer/Android/Sdk" directory.

To install dependencies for this project, run the command (manually):
~/Android/Sdk/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3"

Put your phone in debug mode and run the command:
adb devices

If nothing appears, try running the following commands (both container and host):
sudo adb kill-server
sudo adb start-server
