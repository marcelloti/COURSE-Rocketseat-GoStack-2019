#!/bin/bash
# Author: Marcello Costa <https://github.com/marcelloti>
#
# Put here what you want to be executed when the container starts

# Install local visual studio code
VSCODELOCALFILE='/home/developer/downloads/vscode.deb'
if [[ -f "$VSCODELOCALFILE" ]]; then
    sudo dpkg -i $VSCODELOCALFILE && sudo apt install -f
    sudo mv $VSCODELOCALFILE $VSCODELOCALFILE.installed
    sudo apt-get -y -f install;
fi

command_exists () {
    type "$1" &> /dev/null ;
}

# If visual studio code not installed yet
if ! command_exists code ; then
    # Download and install Visual Studio Code
    sudo curl -L 'https://go.microsoft.com/fwlink/?LinkID=760868' -o "/tmp/vscode.deb"
    sudo dpkg -i "/tmp/vscode.deb";
    sudo apt-get -y -f install;
fi

# Start vscode
code /home/developer/code
