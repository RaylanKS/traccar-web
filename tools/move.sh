#!/usr/bin/env bash

sudo rm -r /opt/traccar/web/
cd $(dirname $0)
sudo cp -r ../web/ /opt/traccar/