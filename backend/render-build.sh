#!/bin/bash

# Install tput dependencies
apt-get update && apt-get install -y ncurses-utils

# Install Java without interactive prompts
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
export sdkman_color_enable=false
sdk install java 23.0.1-amzn




