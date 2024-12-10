#!/bin/bash

# Ensure ncurses is installed for tput support
apt-get update && apt-get install -y ncurses-base

# Install Java without interactive prompts
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
export sdkman_color_enable=false
sdk install java 23.0.1-amzn



