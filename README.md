# docker-rpi-relay-trigger

## Build on x86

> Register Qemu for supported processors

```
docker run --rm --privileged multiarch/qemu-user-static:register --reset
docker build -t zadki3l/rpi-relay-trigger .
```

## Run

```
docker run -d -v /sys:/sys -p 3000:3000 zadki3l/rpi-relay-trigger
```
