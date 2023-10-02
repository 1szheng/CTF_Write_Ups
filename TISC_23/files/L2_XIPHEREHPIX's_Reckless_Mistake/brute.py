#!/usr/bin/python3
from pwn import *
import itertools
import time

with open("hash_out", "rb") as f:
    init = f.read()

pre = [init[i:i+32] for i in range(0, len(init), 32)]
bucket = list(itertools.chain(*[list(itertools.combinations(pre, i)) for i in range(1,21)]))
bucket_len = len(bucket)
num = 0

while num < bucket_len:
    payload = bucket[num][0]
    for i in range(1, len(bucket[num])):
        # payload XOR hash
        payload = bytes([_a ^ _b for _a, _b in zip(payload, bucket[num][i])])
    try:
        p = process("./direct.out")
        time.sleep(0.1)
        p.sendline(payload)
        p.recvuntil(b'Your secret message ')
        flag = p.recv()
        with open('message.txt', 'ab') as f:
            f.write(flag)
        num = num + 1
        if b'TISC' in flag:
            print(flag)
    except Exception as e:
        print(f"{e}")
    finally:
        time.sleep(0.1)
        p.kill()