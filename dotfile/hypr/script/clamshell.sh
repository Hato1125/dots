#!/bin/bash

if [[ $1 == "open" ]]; then
  hyprctl keywords monitor "eDP-1,enable"
  hyprctl keyword input:touchdevice:enabled on
else
  hyprctl keywords monitor "eDP-1,disable"
  hyprctl keyword input:touchdevice:enabled off
fi
