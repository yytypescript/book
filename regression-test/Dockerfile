FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

ENV TZ=Etc/UTC \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    SHELL=/usr/bin/zsh \
    HOMEBREW_NO_ANALYTICS=1 \
    HOMEBREW_NO_ENV_HINTS=1

# Base packages (Homebrew requires: build-essential, procps, curl, file, git)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      file \
      git \
      sudo \
      tmux \
      zsh \
      locales \
      tzdata \
      build-essential \
      procps \
      python3 \
      python3-pip \
      jq \
 && rm -rf /var/lib/apt/lists/* \
 && locale-gen en_US.UTF-8 || true

# Create a sudoer user: developer (default shell: zsh)
RUN useradd -m -s /usr/bin/zsh developer \
 && usermod -aG sudo developer \
 && echo 'developer ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/developer \
 && chmod 0440 /etc/sudoers.d/developer

USER developer
WORKDIR /home/developer

# Configure Git for non-interactive use inside the container
RUN git config --global user.name "developer" \
 && git config --global user.email "developer@example.com" \
 && git config --global init.defaultBranch main \
 && git config --global --add safe.directory '*'

# Install Homebrew (Linuxbrew) in the supported default prefix: /home/linuxbrew/.linuxbrew
# Official docs: prepend NONINTERACTIVE=1 for unattended installation.
RUN NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
 && echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/developer/.profile \
 && echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/developer/.zprofile \
 && echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/developer/.zshrc

ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"

RUN brew --version

# Node.js 24.x (via Homebrew)
RUN brew install node@24 \
 && brew link --overwrite --force node@24 \
 && npm install -g npm

# Playwright
RUN npx playwright install-deps

EXPOSE 3000

# Keep the container running for interactive use (docker exec).
CMD ["sleep", "infinity"]

