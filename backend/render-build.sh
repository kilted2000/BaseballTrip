#!/bin/bash

# Install Java without interactive prompts
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Suppress color output in SDKMAN
export sdkman_color_enable=false

# Install the required Java version
sdk install java 23.0.1-amzn


