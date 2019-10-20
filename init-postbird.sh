#!/bin/bash
# Start script for Postbird container

# Install Postbird
POSTBIRDFILE='/home/developer/downloads/postbird.deb'
if [[ -f "$POSTBIRDFILE" ]]; then
    sudo dpkg -i $POSTBIRDFILE && sudo apt install -f
    sudo mv $POSTBIRDFILE $POSTBIRDFILE.installed
    sudo apt-get -y -f install;
fi

# Execute Postbird
postbird
