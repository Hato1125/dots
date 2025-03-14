FROM archlinux:latest

RUN sed -i '/\[options\]/a ParallelDownloads = 15' /etc/pacman.conf

RUN pacman --noconfirm -Syu && \
  pacman --noconfirm -S base-devel && \
  pacman --noconfirm -S git && \
  pacman --noconfirm -S python

RUN useradd -m builder && \
  echo "builder ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/builder

USER builder
WORKDIR /home/builder

RUN git clone https://aur.archlinux.org/paru.git && \
  cd paru && \
  makepkg -si --noconfirm

USER root
WORKDIR /root/

CMD ["/bin/bash"]
