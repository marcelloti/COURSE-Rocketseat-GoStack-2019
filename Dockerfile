FROM debian:buster-slim

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install libcanberra-gtk-module libgconf-2-4 libasound2 libgtk2.0-0 libxss1 sudo curl wget libx11-xcb-dev git build-essential libssl-dev && \ 
    apt-get -y -f install
    
RUN adduser --disabled-password --gecos "" developer && mkdir /home/developer/code && chmod 777 -R /home/developer/code

RUN echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer && \
    chmod 0440 /etc/sudoers.d/developer
   
ADD ./init-docker.sh /usr/local/bin/init.sh

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y nodejs

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

# Install NVM
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

USER developer
ENV HOME /home/developer

# Update fonts cache
RUN fc-cache -f -v

ENTRYPOINT /usr/local/bin/init.sh && /bin/bash
