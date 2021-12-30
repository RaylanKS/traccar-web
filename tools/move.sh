#!/usr/bin/env bash

sudo rm -r /opt/traccar/web/
cp -r /home/raylan/Documentos/Trabalho/traccar/traccar-web/web/ /home/raylan/.temp/web/
sudo mv /home/raylan/.temp/web /opt/traccar/